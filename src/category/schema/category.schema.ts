import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from '../../users/schemas/user.schema';

export type CategoryDocument = Category & Document;

@Schema({
  timestamps: true,
})
export class Category {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop()
  thumbnail?: string;
}
export const CategorySchema = SchemaFactory.createForClass(Category);
