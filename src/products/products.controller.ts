import {
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { GetUsersDto } from '../users/dto/get-users.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách products' })
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
    description: 'Từ khóa tìm kiếm (tìm theo tên sản phẩm)',
    example: 'Sản phẩm 1',
  })
  @ApiResponse({
    status: 200,
    description: 'Trả về danh sách products với pagination',
  })
  findAll(@Query() query: GetUsersDto) {
    return this.productsService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy thông tin product theo ID' })
  @ApiParam({
    name: 'id',
    description: 'ID của product',
    example: '507f1f77bcf86cd799439011',
  })
  @ApiResponse({
    status: 200,
    description: 'Trả về thông tin product',
  })
  @ApiResponse({
    status: 404,
    description: 'Không tìm thấy product',
  })
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Tạo product mới' })
  @ApiResponse({
    status: 201,
    description: 'Tạo product thành công',
  })
  @ApiResponse({
    status: 400,
    description: 'Dữ liệu không hợp lệ',
  })
  @ApiResponse({
    status: 409,
    description: 'tên product đã được sử dụng',
  })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Cập nhật thông tin sản phẩm' })
  @ApiParam({
    name: 'id',
    description: 'Id product',
    example: 'df13ads56fdaf3s45',
  })
  @ApiResponse({
    status: 200,
    description: 'Cập nhật product thành công',
  })
  @ApiResponse({
    status: 404,
    description: 'Không tìm thấy product',
  })
  @ApiResponse({
    status: 409,
    description: 'Product name đã được sử dụng',
  })
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Xóa user' })
  @ApiParam({
    name: 'id',
    description: 'id product',
    example: 'df13ads56fdaf3s45',
  })
  @ApiResponse({ status: 204, description: 'xóa product thành công' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy product' })
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
