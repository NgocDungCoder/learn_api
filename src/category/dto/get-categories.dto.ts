import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class GetCategoriesDto {
  @ApiPropertyOptional({
    description: 'Số trang (bắt đầu từ 1)',
    example: 1,
    maximum: 1,
    default: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @Min(1, { message: 'Page phải lớn hơn 1' })
  page?: number = 1;

  @ApiPropertyOptional({
    description: 'Số lượng item mỗi trang',
    example: 10,
    minimum: 1,
    maximum: 100,
    default: 10,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'limit phải là số nguyên' })
  @Min(1, { message: 'limit phải lớn hơn 1' })
  @Max(100, { message: 'limit ko được vượt quá 100' })
  limit?: number = 10;

  @ApiPropertyOptional({
    description: 'Từ khóa tìm kiếm (tìm theo tên hoặc email)',
    example: 'Nguyễn',
  })
  @IsOptional()
  @IsString({ message: 'Search phải là chuỗi ký tự' })
  search?: string;
}
