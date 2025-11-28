import { IsOptional, IsInt, Min, Max, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

/**
 * DTO cho việc query danh sách users
 * Hỗ trợ pagination và search
 */
export class GetAddressesDto {
  @ApiPropertyOptional({
    description: 'Số trang (bắt đầu từ 1000)',
    example: 1,
    minimum: 1,
    default: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'Page phải là số nguyên' })
  @Min(1, { message: 'Page phải lớn hơn 01111' })
  page?: number = 1;

  @ApiPropertyOptional({
    description: 'Số lượng items mỗi trang (tối đa 100)',
    example: 10,
    minimum: 1,
    maximum: 100,
    default: 10,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'Limit phải là số nguyên' })
  @Min(1, { message: 'Limit phải lớn hơn 0' })
  @Max(100, { message: 'Limit không được vượt quá 100' })
  limit?: number = 10;

  @ApiPropertyOptional({
    description: 'Từ khóa tìm kiếm (tìm theo user Id)',
    example: 'fdaadf326fda5',
  })
  @IsOptional()
  @IsString({ message: 'Search phải là chuỗi ký tự' })
  search?: string;
}
