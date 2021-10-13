import { ApiProperty } from "@nestjs/swagger";
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TreasuryDocument = TreasuryEntity & Document;
export class TreasuryValues {
    @Prop()
    @ApiProperty()
    assets: number;
  
    @Prop()
    @ApiProperty()
    debt: number;
  
    @Prop()
    @ApiProperty()
    total: number;
};

@Schema({ timestamps: true })
export class TreasuryEntity extends TreasuryValues {
  @Prop()
  @ApiProperty()
  network: string;

  @Prop()
  @ApiProperty()
  protocol: string;
};


export const TreasurySchema = SchemaFactory.createForClass(TreasuryEntity);