import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';
import { PostsRepository } from './repositories/PostsRepository';

@Injectable()
export class PostsService {
  constructor(private readonly postsRepository: PostsRepository) { }

  async create(createPostDto: CreatePostDto) {
    return await this.postsRepository.savePost(Post.create(createPostDto));
  }

  async findAll(): Promise<Post[]> {
    return await this.postsRepository.getAllPosts();
  }

  async findOne(postId: string): Promise<Post> {
    return await this.postsRepository.getById(postId);
  }

  async update(postId: string, updatePostDto: UpdatePostDto) {
    return await this.postsRepository.update(postId, updatePostDto)
  }

  async delete(postId: string) {
    await this.postsRepository.delete(postId)
  }
}
