import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './schemas/product.schema';
import { FilterQuery, Model } from 'mongoose';
import { GetProductDto } from './dto/get-product.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable() //cho phép tiêm vào constructor của các class khác
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async findAll(
    query: GetProductDto,
  ): Promise<{ data: ProductDocument[]; meta: any }> {
    const { page = 1, limit = 10, search } = query;

    // Build query
    const queryBuilder: FilterQuery<ProductDocument> = {};

    if (search) {
      queryBuilder.name = { $regex: search, $options: 'i' };
    }

    // Count total documents
    const total = await this.productModel.countDocuments(queryBuilder);

    // Fetch paginated data
    const products = await this.productModel
      .find(queryBuilder)
      .sort({ createdAt: -1 }) // Sort by newest first
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    return {
      data: products,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string): Promise<ProductDocument> {
    const product = await this.productModel.findById(id).exec();

    if (!product) {
      throw new NotFoundException(`Không tìm thấy product với ID: ${id}`);
    }

    return product;
  }

  async create(createProductDto: CreateProductDto): Promise<ProductDocument> {
    const existingProduct = await this.productModel
      .findOne({ name: createProductDto.name })
      .exec();

    if (existingProduct) {
      throw new ConflictException(
        `Email ${createProductDto.name} đã được sử dụng`,
      );
    }

    // Đảm bảo price và stock có giá trị mặc định là 0 nếu không được truyền
    const productData = {
      ...createProductDto,
      price: createProductDto.price ?? 0, // Nếu undefined/null thì gán 0
      stock: createProductDto.stock ?? 0, // Nếu undefined/null thì gán 0
    };

    const newProduct = new this.productModel(productData);
    return newProduct.save();
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<ProductDocument> {
    // Lọc bỏ các field rỗng hoặc undefined - chỉ giữ lại các field có giá trị
    // Điều này đảm bảo nếu truyền rỗng thì sẽ giữ nguyên giá trị cũ
    const updateData: Partial<UpdateProductDto> = {};

    // Chỉ thêm field name nếu có giá trị (không rỗng)
    if (
      updateProductDto.name !== undefined &&
      updateProductDto.name !== null &&
      updateProductDto.name.trim() !== ''
    ) {
      // Kiểm tra trùng tên nếu có update name
      const existingProduct = await this.productModel
        .findOne({ name: updateProductDto.name, _id: { $ne: id } })
        .exec();

      if (existingProduct) {
        throw new ConflictException(
          `Name ${updateProductDto.name} đã được sử dụng`,
        );
      }

      updateData.name = updateProductDto.name.trim();
    }

    // Chỉ thêm field thumbnail nếu có giá trị (không rỗng)
    if (
      updateProductDto.thumbnail !== undefined &&
      updateProductDto.thumbnail !== null &&
      updateProductDto.thumbnail.trim() !== ''
    ) {
      updateData.thumbnail = updateProductDto.thumbnail.trim();
    }

    // Chỉ thêm field price nếu có giá trị (không phải undefined/null)
    if (
      updateProductDto.price !== undefined &&
      updateProductDto.price !== null
    ) {
      updateData.price = updateProductDto.price;
    }

    // Chỉ thêm field stock nếu có giá trị (không phải undefined/null)
    if (
      updateProductDto.stock !== undefined &&
      updateProductDto.stock !== null
    ) {
      updateData.stock = updateProductDto.stock;
    }

    // Nếu không có field nào để update thì trả về product hiện tại
    if (Object.keys(updateData).length === 0) {
      return this.findOne(id);
    }

    // Update chỉ các field có giá trị
    const updatedProduct = await this.productModel
      .findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
      })
      .exec();

    if (!updatedProduct) {
      throw new NotFoundException(`Không tìm thấy product với ID: ${id}`);
    }

    return updatedProduct;
  }

  async remove(id: string): Promise<void> {
    const result = await this.productModel.findByIdAndDelete(id).exec();

    if (!result) {
      throw new NotFoundException(`Không tìm thấy product với ID: ${id}`);
    }
  }
}
