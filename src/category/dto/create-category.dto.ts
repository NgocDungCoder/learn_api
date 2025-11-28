import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    description: 'Tên của categoryđiiididid',
    example: 'Thể loại 1',
  })
  @IsNotEmpty({ message: 'Tên không được để trống' })
  @IsString({ message: 'Tên phải là chuỗi ký tự' })
  name: string;

  @ApiProperty({
    description: 'Thumbnail of product (URL)',
    example: 'https://abcde.jpg',
  })
  @IsOptional()
  @IsString({ message: 'hình ảnh nên là đường link' })
  thumbnail?: string = 'https://via.placeholder.com/150';
}
