import { Injectable, NotFoundException } from '@nestjs/common';
import { PostsData } from '../data/Posts';
import { UpdatePostDto } from '../dto/update-post.dto';
import { Post } from '../entities/post.entity';
import { IPostsRepository } from '../interfaces/PostsRepository';

@Injectable()
export class InMemoryPostsRepository implements IPostsRepository {
    data: Post[]
    constructor() {
        this.data = PostsData
    }
    async getByAuthorId(userId: string): Promise<Post[]> {
        return this.data.filter(post => post.authorId === userId)
    }

    async getAllPosts(): Promise<Post[]> {
        return this.data
    }

    async savePost(postData: Post): Promise<void> {
        this.data.unshift(postData)
    }

    async getById(postId: string): Promise<Post> {
        const post = this.data.find(post => post.id === postId)
        if (!post) {
            throw new NotFoundException("Ce post n'existe pas !")
        }
        return this.data.find(post => post.id === postId)
    }

    async update(postId: string, updatePostDto: UpdatePostDto): Promise<void> {
        const post = await this.getById(postId)
        await this.delete(postId)
        const updatedPost = {
            ...post,
            ...updatePostDto
        }
        await this.savePost(updatedPost)
    }

    async delete(postId: string): Promise<void> {
        this.data = this.data.filter(post => post.id !== postId)
    }
}
