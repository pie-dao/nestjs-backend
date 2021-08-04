import { ApiProperty } from "@nestjs/swagger";

export class PieEntity {
  @ApiProperty()
  name: string;

  @ApiProperty()
  address: string;
}