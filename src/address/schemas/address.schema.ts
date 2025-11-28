import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

/**
 * Address Schema cho Mongoose
 * Định nghĩa cấu trúc document trong MongoDB
 */
export type AddressDocument = Address & Document;

@Schema({
  timestamps: true, // Tự động thêm createdAt và updatedAt
})
export class Address {
  @Prop({ required: true, trim: true })
  userId: string;

  @Prop({ required: true, trim: true })
  fullName: string;

  @Prop({ required: true, trim: true })
  phone: string;

  @Prop({ required: true, trim: true })
  province: string;

  @Prop({ required: true, trim: true })
  district: string;

  @Prop({ required: true, trim: true })
  ward: string;

  @Prop({ required: true, trim: true })
  detail: string;

  @Prop({ default: false })
  isDefault?: boolean;
}

export const AddressSchema = SchemaFactory.createForClass(Address);
