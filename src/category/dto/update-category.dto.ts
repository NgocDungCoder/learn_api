import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, ValidateIf } from 'class-validator';

export class UpdateCategoryDto {
  @ApiPropertyOptional({
    description: 'Tên của category (nếu không truyền hoặc rỗng thì giữ nguyên)',
    example: 'Thể loại 1',
  })
  @IsOptional()
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
}
