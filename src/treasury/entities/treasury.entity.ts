import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TreasuryDocument = TreasuryEntity & Document;
export interface TreasuryValues {
  assets: number;
  debt: number;
  total: number;
}

@Schema({ timestamps: true })
export class TreasuryEntity {
  @Prop({ required: true })
  @ApiProperty()
  network: string;

  @Prop({ required: true })
  @ApiProperty()
  protocol: string;

  @Prop({ required: true })
  @ApiProperty()
  assets: number;

  @Prop({ required: true })
  @ApiProperty()
  debt: number;

  @Prop({ required: true })
  @ApiProperty()
  total: number;
}

export const TreasurySchema = SchemaFactory.createForClass(TreasuryEntity);
