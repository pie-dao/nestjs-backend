import { ApiProperty } from "@nestjs/swagger";

export class PieDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  address: string;
}