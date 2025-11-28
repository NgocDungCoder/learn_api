import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

/**
 * User Schema cho Mongoose
 * Định nghĩa cấu trúc document trong MongoDB
 */
export type UserDocument = User & Document;

@Schema({
  timestamps: true, // Tự động thêm createdAt và updatedAt
})
export class User {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  email: string;

  @Prop({ min: 0, max: 120 })
  age?: number;
}

export const UserSchema = SchemaFactory.createForClass(User);

