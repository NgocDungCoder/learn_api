import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User, UserSchema } from './schemas/user.schema';

/**
 * UsersModule
 * Đăng ký UsersController và UsersService
 * Import MongooseModule để sử dụng User schema
 */
@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService], // Export để có thể sử dụng ở module khác nếu cần
})
export class UsersModule {}
