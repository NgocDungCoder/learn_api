import {
  IsEmail,
  IsOptional,
  IsString,
  IsInt,
  Min,
  Max,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

/**
 * DTO cho việc cập nhật user
 * Tất cả fields đều optional vì chỉ cập nhật những field được gửi lên
 */
export class UpdateUserDto {
  @ApiPropertyOptional({
    description: 'Tên của user',
    example: 'Nguyễn Văn B',
  })
  @IsOptional()
  @IsString({ message: 'Tên phải là chuỗi ký tự' })
  name?: string;

  @ApiPropertyOptional({
    description: 'Email của user (phải là unique)',
    example: 'nguyenvanb@example.com',
  })
  @IsOptional()
  @IsEmail({}, { message: 'Email không hợp lệ' })
  email?: string;

  @ApiPropertyOptional({
    description: 'Tuổi của user (0-120)',
    example: 26,
    minimum: 0,
    maximum: 120,
  })
  @IsOptional()
  @IsInt({ message: 'Tuổi phải là số nguyên' })
  @Min(0, { message: 'Tuổi phải lớn hơn hoặc bằng 0' })
  @Max(120, { message: 'Tuổi phải nhỏ hơn hoặc bằng 120' })
  age?: number;
}
