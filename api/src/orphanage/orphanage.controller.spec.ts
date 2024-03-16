import { Test, TestingModule } from '@nestjs/testing';
import { OrphanageController } from './orphanage.controller';

describe('OrphanageController', () => {
  let controller: OrphanageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrphanageController],
    }).compile();

    controller = module.get<OrphanageController>(OrphanageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
