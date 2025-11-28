import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsInt,
  Min,
  Max,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

/**
 * DTO cho việc tạo user mới
 * Validation rules được áp dụng tự động bởi ValidationPipe
 */
export class CreateUserDto {
  @ApiProperty({
    description: 'Tên của user',
    example: 'Nguyễn Văn A',
  })
  @IsNotEmpty({ message: 'Tên không được để trống' })
  @IsString({ message: 'Tên phải là chuỗi ký tự' })
  name: string;

  @ApiProperty({
    description: 'Email của user (phải là unique)',
    example: 'nguyenvana@example.com',
  })
  @IsNotEmpty({ message: 'Email không được để trống' })
  @IsEmail({}, { message: 'Email không hợp lệ' })
  email: string;

  @ApiPropertyOptional({
    description: 'Tuổi của user (0-120)',
    example: 25,
    minimum: 0,
    maximum: 120,
  })
  @IsOptional()
  @IsInt({ message: 'Tuổi phải là số nguyên' })
  @Min(0, { message: 'Tuổi phải lớn hơn hoặc bằng 0' })
  @Max(120, { message: 'Tuổi phải nhỏ hơn hoặc bằng 120' })
  age?: number;
}

