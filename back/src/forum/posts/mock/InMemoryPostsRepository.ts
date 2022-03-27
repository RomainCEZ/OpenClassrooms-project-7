import { Injectable, NotFoundException } from '@nestjs/common';
import { PostsData } from '../data/Posts';
import { UpdatePostDto } from '../dto/update-post.dto';
import { Post } from '../entities/post.entity';

@Injectable()
export class InMemoryPostsRepository {
    data: Post[]
    constructor() {
        this.data = PostsData
    }

    getAllPosts(): Post[] {
        return this.data
    }

    savePost(postData: Post) {
        this.data.unshift(postData)
    }

    getById(postId: string): Post {
        const post = this.data.find( post => post.id === postId)
        if (!post) {
            throw new NotFoundException("Ce post n'existe pas !")
        }
        return this.data.find( post => post.id === postId)
    }

    update(postId: string, updatePostDto: UpdatePostDto) {
        const post = this.getById(postId)
        this.delete(postId)
        const updatedPost = {
            ...post,
            ...updatePostDto
        }
        this.savePost(updatedPost)
    }

    delete(postId: string) {
        this.data = this.data.filter( post => post.id !== postId )
    }
}
