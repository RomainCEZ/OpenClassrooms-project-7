import { Test, TestingModule } from '@nestjs/testing';
import { InMemoryPostsRepository } from './repositories/InMemoryPostsRepository';
import { PostsService } from './posts.service';
import { PostsRepository } from './repositories/PostsRepository';

describe('PostsService', () => {
  let service: PostsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostsService,
        { provide: PostsRepository, useClass: InMemoryPostsRepository }
      ]
    }).compile();

    service = module.get<PostsService>(PostsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
