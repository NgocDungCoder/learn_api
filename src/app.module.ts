import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './category/categories.module.dto';

@Module({
  imports: [
    // ConfigModule để đọc environment variables
    ConfigModule.forRoot({
      isGlobal: true, // Làm cho ConfigModule available globally
      envFilePath: '.env',
    }),
    // MongooseModule để kết nối MongoDB
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri:
          configService.get<string>('MONGODB_URI') ||
          'mongodb://localhost:27017/learnapi',
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    ProductsModule,
    CategoriesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
