import { Test, TestingModule } from '@nestjs/testing';
import { CommentsService } from './comments.service';
import CommentsRepository from './repositories/CommentsRepository';
import InMemoryCommentsRepository from './repositories/InMemoryCommentsRepository';

describe('CommentsService', () => {
  let service: CommentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommentsService,
        { provide: CommentsRepository, useClass: InMemoryCommentsRepository }
      ],
    }).compile();

    service = module.get<CommentsService>(CommentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
