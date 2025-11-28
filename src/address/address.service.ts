import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetUsersDto } from './dto/get-users.dto';

/**
 * UsersService
 * Chứa business logic cho việc quản lý users
 * Sử dụng Mongoose để tương tác với MongoDB
 */
@Injectable()
export class AddressService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  /**
   * Lấy danh sách users với pagination và search
   */
  async findAll(
    query: GetUsersDto,
  ): Promise<{ data: UserDocument[]; meta: any }> {
    const { page = 1, limit = 10, search } = query;

    // Build query
    const queryBuilder: any = {};

    if (search) {
      queryBuilder.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }

    // Count total documents
    const total = await this.userModel.countDocuments(queryBuilder);

    // Fetch paginated data
    const users = await this.userModel
      .find(queryBuilder)
      .sort({ createdAt: -1 }) // Sort by newest first
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    return {
      data: users,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Lấy user theo ID
   */
  async findOne(id: string): Promise<UserDocument> {
    const user = await this.userModel.findById(id).exec();

    if (!user) {
      throw new NotFoundException(`Không tìm thấy user với ID: ${id}`);
    }

    return user;
  }

  /**
   * Tạo user mới
   */
  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    // Kiểm tra email đã tồn tại chưa
    const existingUser = await this.userModel
      .findOne({ email: createUserDto.email })
      .exec();

    if (existingUser) {
      throw new ConflictException(
        `Email ${createUserDto.email} đã được sử dụng`,
      );
    }
    // Tạo user mới
    const newUser = new this.userModel(createUserDto);
    return newUser.save();
  }

  /**
   * Cập nhật user
   */
  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserDocument> {
    // Kiểm tra email mới có trùng với user khác không
    if (updateUserDto.email) {
      const existingUser = await this.userModel
        .findOne({ email: updateUserDto.email, _id: { $ne: id } })
        .exec();

      if (existingUser) {
        throw new ConflictException(
          `Email ${updateUserDto.email} đã được sử dụng`,
        );
      }
    }

    // Cập nhật user
    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true, runValidators: true })
      .exec();

    if (!updatedUser) {
      throw new NotFoundException(`Không tìm thấy user với ID: ${id}`);
    }

    return updatedUser;
  }

  /**
   * Xóa user
   */
  async remove(id: string): Promise<void> {
    const result = await this.userModel.findByIdAndDelete(id).exec();

    if (!result) {
      throw new NotFoundException(`Không tìm thấy user với ID: ${id}`);
    }
  }
}

