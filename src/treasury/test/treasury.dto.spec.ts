import { Test, TestingModule } from '@nestjs/testing';
import { TreasuryDTO } from '../dto/treasury.dto';

describe('TreasuryDTO', () => {
  let treasuryDTO: TreasuryDTO;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [TreasuryDTO],
    }).compile();

    treasuryDTO = app.get<TreasuryDTO>(TreasuryDTO);
  });

  it('should be defined', () => {
    expect(treasuryDTO).toBeDefined();
  });
});
