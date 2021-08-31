import { ApiProperty } from "@nestjs/swagger";
import { IsHexadecimal } from "class-validator";
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EpochDocument = EpochEntity & Document;

@Schema()
export class EpochEntity {
  @Prop()
  @ApiProperty()
  startDate: number;

  @Prop()
  @ApiProperty()
  endDate: number;

  @Prop()
  @ApiProperty()
  startBlock: number;

  @Prop()
  @ApiProperty()
  endBlock: number;

  @Prop()
  @ApiProperty()
  participants: Array<Object>

  @Prop()
  @ApiProperty()
  proposals: Array<string>

  @Prop({type: Object})
  @ApiProperty()
  merkleTree: Object

  // TODO: to be completed, and transformed into one-to-many relationship...
  @Prop()
  @ApiProperty()
  rewards: string 
}

export const EpochSchema = SchemaFactory.createForClass(EpochEntity);