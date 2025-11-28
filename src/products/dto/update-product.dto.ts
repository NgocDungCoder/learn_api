import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
  ValidateIf,
} from 'class-validator';

/**
 * DTO cho việc update product
 * Tất cả fields đều optional - nếu không truyền hoặc truyền rỗng thì giữ nguyên giá trị cũ
 */
export class UpdateProductDto {
  @ApiPropertyOptional({
    description: 'Tên của product (nếu không truyền hoặc rỗng thì giữ nguyên)',
    example: 'Sản phẩm 1',
  })
  @IsOptional()
  // Chỉ validate IsNotEmpty và IsString khi có giá trị (không phải undefined/null)
  // Nếu truyền rỗng "" thì sẽ bỏ qua validation này và giữ nguyên giá trị cũ
  @ValidateIf((o) => o.name !== undefined && o.name !== null && o.name !== '')
  @IsNotEmpty({ message: 'Tên không được để trống' })
  @IsString({ message: 'Tên phải là chuỗi ký tự' })
  name?: string;

  @ApiPropertyOptional({
    description:
      'Thumbnail of product (URL) (nếu không truyền hoặc rỗng thì giữ nguyên)',
    example: 'https://abcde.jpg',
  })
  @IsOptional()
  // Chỉ validate khi có giá trị
  @ValidateIf(
    (o) =>
      o.thumbnail !== undefined && o.thumbnail !== null && o.thumbnail !== '',
  )
  @IsString({ message: 'Thumbnail phải là chuỗi' })
  thumbnail?: string;

  @ApiPropertyOptional({
    description:
      'Price of product (nếu không truyền hoặc rỗng thì giữ nguyên)',
    example: 25,
    minimum: 0,
    default: 0,

  })
  @IsOptional()
  // Chỉ validate khi có giá trị (không phải undefined/null)
  @ValidateIf((o) => o.price !== undefined && o.price !== null)
  @IsInt({ message: 'Price phải là số nguyên' })
  @Min(0, { message: 'Price phải lớn hơn hoặc bằng 0' })
  price?: number = 0;

  @ApiPropertyOptional({
    description:
      'Stock of product (nếu không truyền hoặc rỗng thì giữ nguyên)',
    example: 25,
    minimum: 0,
    default: 0,
  })
  @IsOptional()
  // Chỉ validate khi có giá trị (không phải undefined/null)
  @ValidateIf((o) => o.stock !== undefined && o.stock !== null)
  @IsInt({ message: 'Stock phải là số nguyên' })
  @Min(0, { message: 'Stock phải lớn hơn hoặc bằng 0' })
  stock?: number = 0;
}
