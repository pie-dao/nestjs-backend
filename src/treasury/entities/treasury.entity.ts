import { ApiProperty } from "@nestjs/swagger";
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TreasuryDocument = TreasuryEntity & Document;

@Schema({ timestamps: true })
export class TreasuryEntity {
  @Prop()
  @ApiProperty()
  createdAt: Date;

  @Prop()
  @ApiProperty()
  updatedAt: Date;

  @Prop()
  @ApiProperty()
  assets: number;

  @Prop()
  @ApiProperty()
  debt: number;

  @Prop()
  @ApiProperty()
  total: number;

  @Prop()
  @ApiProperty()
  network: string;

  @Prop()
  @ApiProperty()
  protocol: string;

}

export const TreasurySchema = SchemaFactory.createForClass(TreasuryEntity);