import { ApiProperty } from '@nestjs/swagger';

export class TreasuryDTO {
  @ApiProperty()
  assets: number;

  @ApiProperty()
  debt: number;

  @ApiProperty()
  total: number;

  @ApiProperty()
  network: string;

  @ApiProperty()
  protocol: string;
}
