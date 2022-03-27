import { Injectable } from '@nestjs/common';
import * as fs from "fs"
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';
import { InMemoryPostsRepository } from './mock/InMemoryPostsRepository';

@Injectable()
export class PostsService {
  constructor(private readonly postsRepository: InMemoryPostsRepository) {}

  create(createPostDto: CreatePostDto) {
    this.postsRepository.savePost(createPostDto);
  }

  findAll(): Post[] {
    return this.postsRepository.getAllPosts();
  }

  findOne(postId: string): Post {
    return this.postsRepository.getById(postId);
  }

  update(postId: string, updatePostDto: UpdatePostDto) {
    this.postsRepository.update(postId, updatePostDto)
  }

  delete(postId: string) {
    const post = this.postsRepository.getById(postId)
    if (post.imageUrl) {
      const fileName = post.imageUrl.split("/images/")[1]
      fs.unlink(`./images/${fileName}`, error => {
        if (error) {
          throw new Error(`${error}`)
        }
      })
    }
    this.postsRepository.delete(postId)
  }
}
