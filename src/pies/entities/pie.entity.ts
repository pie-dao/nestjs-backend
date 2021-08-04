import { ApiProperty } from "@nestjs/swagger";
import { IsHexadecimal } from "class-validator";

export class PieEntity {
  @ApiProperty()
  name: string;

  @ApiProperty()
  @IsHexadecimal()
  address: string;
}