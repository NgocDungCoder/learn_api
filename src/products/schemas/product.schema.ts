import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ProductDocument = Product & Document;

@Schema({
  timestamps: true,
})
export class Product {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ min: 0, default: 0 })
  price?: number;

  @Prop({ min: 0, default: 0 })
  stock?: number;

  @Prop()
  thumbnail?: string;
  //Nếu không có ?, nó sẽ bắt buộc về mặt TypeScript nhưng Mongoose vẫn cho trống → dễ gây khó hiểu

}

export const ProductSchema = SchemaFactory.createForClass(Product);

