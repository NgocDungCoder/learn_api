import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable validation pipe để tự động validate DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Loại bỏ các properties không có trong DTO
      forbidNonWhitelisted: true, // Throw error nếu có properties không hợp lệ
      transform: true, // Tự động transform types (string -> number, etc.)
      transformOptions: {
        enableImplicitConversion: true, // Cho phép implicit conversion
      },
    }),
  );

  // Setup Swagger API Documentation
  const config = new DocumentBuilder()
    .setTitle('Users API')
    .setDescription('API documentation cho Users Management System')
    .setVersion('1.0')
    // Thứ tự tags: tag nào được thêm trước sẽ hiển thị trước trên Swagger UI
    // Muốn products trước users? → Thêm 'products' trước 'users'
    // Muốn users trước products? → Thêm 'users' trước 'products'
    .addTag('users', 'Quản lý người dùng')
    .addTag('categories', 'Quản lý thể loại')
    .addTag('products', 'Quản lý sản phẩm')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
  console.log(
    `🚀 Server đang chạy tại http://localhost:${process.env.PORT ?? 3000}`,
  );
  console.log(
    `📚 Swagger API Documentation: http://localhost:${process.env.PORT ?? 3000}/api`,
  );
}
bootstrap();
