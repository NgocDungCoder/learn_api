import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetUsersDto } from './dto/get-users.dto';

/**
 * UsersController
 * Xử lý các HTTP requests liên quan đến users
 * Tự động validate DTOs thông qua ValidationPipe
 */
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * GET /users
   * Lấy danh sách users với pagination và search
   */
  @Get()
  @ApiOperation({ summary: 'Lấy danh sách users' })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Số trang (bắt đầu từ 1)',
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Số lượng items mỗi trang (tối đa 100)',
    example: 10,
  })
  @ApiQuery({
    name: 'search',
    required: false,
    type: String,
    description: 'Từ khóa tìm kiếm (tìm theo tên hoặc email)',
    example: 'Nguyễn Văn C',
  })
  @ApiResponse({
    status: 200,
    description: 'Trả về danh sách users với pagination',
  })
  findAll(@Query() query: GetUsersDto) {
    return this.usersService.findAll(query);
  }

  /**
   * GET /users/:id
   * Lấy thông tin một user theo ID
   */
  @Get(':id')
  @ApiOperation({ summary: 'Lấy thông tin user theo ID' })
  @ApiParam({
    name: 'id',
    description: 'ID của user',
    example: '507f1f77bcf86cd799439011',
  })
  @ApiResponse({
    status: 200,
    description: 'Trả về thông tin user',
  })
  @ApiResponse({
    status: 404,
    description: 'Không tìm thấy user',
  })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  /**
   * POST /users
   * Tạo user mới
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Tạo user mới' })
  @ApiResponse({
    status: 201,
    description: 'Tạo user thành công',
  })
  @ApiResponse({
    status: 400,
    description: 'Dữ liệu không hợp lệ',
  })
  @ApiResponse({
    status: 409,
    description: 'Email đã được sử dụng',
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  /**
   * PATCH /users/:id
   * Cập nhật thông tin user (partial update)
   */
  @Patch(':id')
  @ApiOperation({ summary: 'Cập nhật thông tin user' })
  @ApiParam({
    name: 'id',
    description: 'ID của user',
    example: '507f1f77bcf86cd799439011',
  })
  @ApiResponse({
    status: 200,
    description: 'Cập nhật user thành công',
  })
  @ApiResponse({
    status: 404,
    description: 'Không tìm thấy user',
  })
  @ApiResponse({
    status: 409,
    description: 'Email đã được sử dụng',
  })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  /**
   * DELETE /users/:id
   * Xóa user
   */
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Xóa user' })
  @ApiParam({
    name: 'id',
    description: 'ID của user',
    example: '507f1f77bcf86cd799439011',
  })
  @ApiResponse({
    status: 204,
    description: 'Xóa user thành công',
  })
  @ApiResponse({
    status: 404,
    description: 'Không tìm thấy user',
  })
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
