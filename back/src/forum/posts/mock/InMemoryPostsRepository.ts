import { Injectable, NotFoundException } from '@nestjs/common';
import { PostsData } from '../data/Posts';
import { UpdatePostDto } from '../dto/update-post.dto';
import { Post } from '../interfaces/postInterface';

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

    getById(postId: number): Post {
        const post = this.data.find( post => post.id === postId)
        if (!post) {
            throw new NotFoundException("Ce post n'existe pas !")
        }
        return this.data.find( post => post.id === postId)
    }

    update(postId: number, updatePostDto: UpdatePostDto) {
        const post = this.getById(postId)
        this.delete(postId)
        const updatedPost = {
            ...post,
            ...updatePostDto
        }
        this.savePost(updatedPost)
    }

    delete(postId: number) {
        this.data = this.data.filter( post => post.id !== postId )
    }
}
