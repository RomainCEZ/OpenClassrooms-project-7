import { Injectable } from '@nestjs/common';
import { PostsData } from '../data/Posts';
import { Post } from '../interfaces/Post.interface';

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
}
