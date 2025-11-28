import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    description: 'Tên của product',
    example: 'Sản phẩm 1',
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
  thumbnail: string;

  @ApiPropertyOptional({
    description: 'Price of product (mặc định: 0 nếu không truyền)',
    example: 25,
    minimum: 0,
    default: 0,
  })
  @IsOptional()
  @IsInt({ message: 'Price phải là số nguyên' })
  @Min(0, { message: 'Price phải lớn hơn hoặc bằng 0' })
  price?: number = 0; // Default value: 0 nếu không truyền

  @ApiPropertyOptional({
    description: 'Stock of product (mặc định: 0 nếu không truyền)',
    example: 25,
    minimum: 0,
    default: 0,
  })
  @IsOptional()
  @IsInt({ message: 'Stock phải là số nguyên' })
  @Min(0, { message: 'Stock phải lớn hơn hoặc bằng 0' })
  stock?: number = 0; // Default value: 0 nếu không truyền
}
