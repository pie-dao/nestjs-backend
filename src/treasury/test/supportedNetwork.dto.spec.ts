import { Test, TestingModule } from '@nestjs/testing';
import { SupportedNetworksDTO } from '../dto/supportedNetwork.dto';

describe('supportedNetworksDTO', () => {
  let supportedNetworksDTO: SupportedNetworksDTO;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [SupportedNetworksDTO],
    }).compile();

    supportedNetworksDTO = app.get<SupportedNetworksDTO>(SupportedNetworksDTO);
  });

  it('should be defined', () => {
    expect(supportedNetworksDTO).toBeDefined();
  });
});
