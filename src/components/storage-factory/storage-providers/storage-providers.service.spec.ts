import { Test, TestingModule } from '@nestjs/testing';
import { StorageProvidersService } from './storage-providers.service';

describe('StorageProvidersService', () => {
  let service: StorageProvidersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StorageProvidersService],
    }).compile();

    service = module.get<StorageProvidersService>(StorageProvidersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
