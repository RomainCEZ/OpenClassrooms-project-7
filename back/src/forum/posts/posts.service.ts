import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';
import { PostsRepository } from './repositories/PostsRepository';

@Injectable()
export class PostsService {
  constructor(private readonly postsRepository: PostsRepository) { }

  async create(createPostDto: CreatePostDto) {
    return this.postsRepository.savePost(Post.create(createPostDto));
  }

  async findAll(): Promise<Post[]> {
    return await this.postsRepository.getAllPosts();
  }

  async findOne(postId: string): Promise<Post> {
    return await this.postsRepository.getById(postId);
  }

  async findByAuthorId(userId: string) {
    return await this.postsRepository.getByAuthorId(userId)
  }

  async getFavorites(postIdsArray: string[]): Promise<Post[]> {
    const posts = await this.postsRepository.getAllPosts()
    const favorites = posts.filter(post => postIdsArray.includes(post.id))
    return favorites
  }

  async update(postId: string, updatePostDto: UpdatePostDto) {
    return this.postsRepository.update(postId, updatePostDto)
  }

  async delete(postId: string) {
    this.postsRepository.delete(postId)
  }

  async like(userId: string, postId: string) {
    const post = await this.postsRepository.getById(postId)
    const likes = post.likes.includes(userId) ? post.likes.filter(id => id !== userId) : [...post.likes, userId]
    const dislikes = post.dislikes.includes(userId) ? post.dislikes.filter(id => id !== userId) : post.dislikes
    this.postsRepository.update(postId, { likes, dislikes })
  }
  async dislike(userId: string, postId: string) {
    const post = await this.postsRepository.getById(postId)
    const dislikes = post.dislikes.includes(userId) ? post.dislikes.filter(id => id !== userId) : [...post.dislikes, userId]
    const likes = post.likes.includes(userId) ? post.likes.filter(id => id !== userId) : post.likes
    this.postsRepository.update(postId, { likes, dislikes })
  }
}
