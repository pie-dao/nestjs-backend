import { ApiProperty } from "@nestjs/swagger";
import { IsHexadecimal } from "class-validator";

export class PieDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  @IsHexadecimal()
  address: string;
}