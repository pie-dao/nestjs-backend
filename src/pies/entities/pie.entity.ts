import { ApiProperty } from "@nestjs/swagger";
import { IsHexadecimal } from "class-validator";
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PieDocument = PieEntity & Document;

@Schema()
export class PieEntity {
  @Prop()
  @ApiProperty()
  name: string;

  @Prop()
  @ApiProperty()
  @IsHexadecimal()  
  address: string;
}

export const PieSchema = SchemaFactory.createForClass(PieEntity);