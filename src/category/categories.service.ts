import { InjectModel } from '@nestjs/mongoose';
import { Category, CategoryDocument } from './schema/category.schema';
import { FilterQuery, Model } from 'mongoose';
import { GetCategoriesDto } from './dto/get-categories.dto';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateUserDto } from '../users/dto/update-user.dto';
import { UserDocument } from '../users/schemas/user.schema';
import { UpdateCategoryDto } from './dto/update-category.dto';

export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
  ) {}

  async findAll(
    query: GetCategoriesDto,
  ): Promise<{ data: CategoryDocument[]; meta: any }> {
    const { page = 1, limit = 10, search } = query;

    const queryBuilder: FilterQuery<CategoryDocument> = {};

    if (search) {
      queryBuilder.name = { $regex: search, $options: 'i' };
    }

    const total = await this.categoryModel.countDocuments(queryBuilder);

    const categories = await this.categoryModel
      .find(queryBuilder)
      .sort({ createdAt: -1 }) // Sort by newest first
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    return {
      data: categories,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string): Promise<CategoryDocument> {
    const category = await this.categoryModel.findById(id).exec();

    if (!category) {
      throw new NotFoundException(`Không tìm thấy category với ID: ${id}`);
    }
    return category;
  }

  async create(
    createCategoryDto: CreateCategoryDto,
  ): Promise<CategoryDocument> {
    const existingCategory = await this.categoryModel
      .findOne({ name: createCategoryDto.name })
      .exec();

    if (existingCategory) {
      throw new ConflictException(
        `Category ${createCategoryDto.name} đã được sử dụng`,
      );
    }

    const newCategory = new this.categoryModel(createCategoryDto);
    return newCategory.save();
  }

  async update(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<CategoryDocument> {
    if (updateCategoryDto.name) {
      const existingCategory = await this.categoryModel
        .findOne({ name: updateCategoryDto.name, _id: { $ne: id } })
        .exec();

      if (existingCategory) {
        throw new ConflictException(
          `Category ${updateCategoryDto.name} đã được sử dụng`,
        );
      }
    }

    // Cập nhật user
    const updateCatrgory = await this.categoryModel
      .findByIdAndUpdate(id, updateCategoryDto, {
        new: true,
        runValidators: true,
      })
      .exec();

    if (!updateCatrgory) {
      throw new NotFoundException(`Không tìm thấy category với ID: ${id}`);
    }

    return updateCatrgory;


  }

  async remove(id: string): Promise<void> {
    const result = await this.categoryModel.findByIdAndDelete(id).exec();

    if (!result) {
      throw new NotFoundException(`Không tìm thấy category với ID: ${id}`);
    }
  }
}
