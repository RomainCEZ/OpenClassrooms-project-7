import { Injectable } from '@nestjs/common';
import * as fs from "fs"
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InMemoryPostsRepository } from './mock/InMemoryPostsRepository';
import { Post } from './interfaces/postInterface';

@Injectable()
export class PostsService {
  constructor(private readonly postsRepository: InMemoryPostsRepository) {}

  create(createPostDto: CreatePostDto) {
    this.postsRepository.savePost(createPostDto);
  }

  findAll(): Post[] {
    return this.postsRepository.getAllPosts();
  }

  findOne(postId: number): Post {
    return this.postsRepository.getById(postId);
  }

  update(postId: number, updatePostDto: UpdatePostDto) {
    this.postsRepository.update(postId, updatePostDto)
  }

  delete(postId: number) {
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
