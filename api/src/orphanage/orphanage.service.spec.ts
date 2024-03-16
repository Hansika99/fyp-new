import { Test, TestingModule } from '@nestjs/testing';
import { OrphanageService } from './orphanage.service';

describe('OrphanageService', () => {
  let service: OrphanageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrphanageService],
    }).compile();

    service = module.get<OrphanageService>(OrphanageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
