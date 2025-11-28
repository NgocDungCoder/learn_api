import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsBoolean,
  IsOptional,
  Matches,
} from 'class-validator';
import { Transform } from 'class-transformer';

/**
 * DTO cho việc tạo address mới
 * Validation rules được áp dụng tự động bởi ValidationPipe
 */
export class CreateAddressDto {
  @ApiProperty({
    description: 'ID của user sở hữu address này',
    example: '507f1f77bcf86cd799439011',
  })
  @IsNotEmpty({ message: 'User ID không được để trống' })
  @IsString({ message: 'User ID phải là chuỗi ký tự' })
  userId: string;

  @ApiProperty({
    description: 'Họ và tên đầy đủ của người nhận',
    example: 'Nguyễn Văn A',
  })
  @IsNotEmpty({ message: 'Họ tên không được để trống' })
  @IsString({ message: 'Họ tên phải là chuỗi ký tự' })
  fullName: string;

  @ApiProperty({
    description: 'Số điện thoại của người nhận',
    example: '0123456789',
  })
  @IsNotEmpty({ message: 'Số điện thoại không được để trống' })
  @IsString({ message: 'Số điện thoại phải là chuỗi ký tự' })
  @Matches(/^[0-9]{10,11}$/, {
    message: 'Số điện thoại phải có 10-11 chữ số',
  })
  phone: string;

  @ApiProperty({
    description: 'Tỉnh/Thành phố',
    example: 'Thành phố Hồ Chí Minh',
  })
  @IsNotEmpty({ message: 'Tỉnh/Thành phố không được để trống' })
  @IsString({ message: 'Tỉnh/Thành phố phải là chuỗi ký tự' })
  province: string;

  @ApiProperty({
    description: 'Quận/Huyện',
    example: 'Quận 12',
  })
  @IsNotEmpty({ message: 'Quận/Huyện không được để trống' })
  @IsString({ message: 'Quận/Huyện phải là chuỗi ký tự' })
  district: string;

  @ApiProperty({
    description: 'Phường/Xã',
    example: 'Thạnh Lộc',
  })
  @IsNotEmpty({ message: 'Phường/Xã không được để trống' })
  @IsString({ message: 'Phường/Xã phải là chuỗi ký tự' })
  ward: string;

  @ApiProperty({
    description: 'Địa chỉ chi tiết (số nhà, tên đường)',
    example: '123/456 Đường ABC',
  })
  @IsNotEmpty({ message: 'Địa chỉ chi tiết không được để trống' })
  @IsString({ message: 'Địa chỉ chi tiết phải là chuỗi ký tự' })
  detail: string;

  @ApiPropertyOptional({
    description: 'Đặt làm địa chỉ mặc định (mặc định: false)',
    example: true,
    default: false,
  })
  @IsOptional()
  @Transform(({ value }): boolean => {
    // Transform string "true"/"false" thành boolean
    if (value === 'true' || value === true) return true;
    if (value === 'false' || value === false) return false;
    // Nếu không match thì return false mặc định (hoặc có thể throw error)
    return false;
  })
  @IsBoolean({ message: 'isDefault phải là giá trị boolean (true/false)' })
  isDefault?: boolean = false;
}
