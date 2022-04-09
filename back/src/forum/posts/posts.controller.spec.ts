import { Test, TestingModule } from '@nestjs/testing';
import { InMemoryPostsRepository } from './repositories/InMemoryPostsRepository';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { PostsRepository } from './repositories/PostsRepository';

describe('PostsController', () => {
  let controller: PostsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostsController],
      providers: [PostsService,
        { provide: PostsRepository, useClass: InMemoryPostsRepository }
      ]
    }).compile();

    controller = module.get<PostsController>(PostsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
