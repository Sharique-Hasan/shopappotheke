import { Test, TestingModule } from '@nestjs/testing';
import { GithubapiService } from './githubapi.service';

describe('GithubapiService', () => {
  let service: GithubapiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GithubapiService],
    }).compile();

    service = module.get<GithubapiService>(GithubapiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
