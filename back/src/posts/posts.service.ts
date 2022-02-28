import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InMemoryPostsRepository } from './mock/InMemoryPostsRepository';
import { Post } from './interfaces/Post.interface';

@Injectable()
export class PostsService {
  constructor(private readonly postsRepository: InMemoryPostsRepository) {}

  create(createPostDto: CreatePostDto) {
    this.postsRepository.savePost(createPostDto);
  }

  findAll(): Post[] {
    return this.postsRepository.getAllPosts();
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
