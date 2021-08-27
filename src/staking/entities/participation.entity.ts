import { ApiProperty } from "@nestjs/swagger";
import { IsHexadecimal } from "class-validator";
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ParticipationDocument = ParticipationEntity & Document;

@Schema()
export class ParticipationEntity {
  @Prop()
  @ApiProperty()
  address: string;

  @Prop()
  @ApiProperty()
  @IsHexadecimal()
  participation: boolean;
}

export const ParticipationSchema = SchemaFactory.createForClass(ParticipationEntity);