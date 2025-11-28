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
import { GetCategoriesDto } from './dto/get-categories.dto';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách categories' })
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
  findAll(@Query() query: GetCategoriesDto) {
    return this.categoriesService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy thông tin category theo ID' })
  @ApiParam({
    name: 'id',
    description: 'ID của categoryyyy',
    example: '507f1f77bcf86cd799439011',
  })
  @ApiResponse({
    status: 200,
    description: 'Trả về thông tin category',
  })
  @ApiResponse({
    status: 404,
    description: 'Không tìm thấy category',
  })
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Tạo categoryyyy mới' })
  @ApiResponse({
    status: 201,
    description: 'Tạo category thành công',
  })
  @ApiResponse({
    status: 400,
    description: 'Dữ liệu không hợp lệ',
  })
  @ApiResponse({
    status: 409,
    description: 'tên cate đã được sử dụng',
  })
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Cập nhật thông tin categoryyyy' })
  @ApiParam({
    name: 'id',
    description: 'Id categoryyyy',
    example: 'df13ads56fdaf3s45',
  })
  @ApiResponse({
    status: 200,
    description: 'Cập nhật cate thành công',
  })
  @ApiResponse({
    status: 404,
    description: 'Không tìm thấy categoryyyy',
  })
  @ApiResponse({
    status: 409,
    description: 'cate name đã được sử dụng',
  })
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Xóa cate' })
  @ApiParam({
    name: 'id',
    description: 'id cate eheheh' +
      '' +
      '',
    example: 'df13ads56fdaf3s45',
  })
  @ApiResponse({ status: 204, description: 'xóa cate thành công' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy cate' })
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(id);
  }
}
