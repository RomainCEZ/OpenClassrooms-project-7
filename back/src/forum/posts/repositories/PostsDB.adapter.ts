import { Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { PostModel } from "../../../Database/sequelizeModels/Post.model";
import { UpdatePostDto } from "../dto/update-post.dto";
import { Post } from "../entities/post.entity";
import { IPostsRepository } from "../interfaces/PostsRepository";

@Injectable()
export class PostsDBAdapter implements IPostsRepository {
    constructor(
        // @Inject('POST_REPOSITORY') private postModel: typeof PostModel,
        @InjectModel(PostModel) private readonly postModel: typeof PostModel,
    ) { }

    async getAllPosts(): Promise<Post[]> {
        const postModels = await this.postModel.findAll<PostModel>()
        return postModels.map(postModels => Post.create({
            id: postModels.postId,
            title: postModels.title,
            content: JSON.parse(postModels.content),
            imageName: postModels.imageName,
            author: postModels.author,
            authorId: postModels.authorId,
            timestamp: +postModels.timestamp
        }))
    }
    async savePost(postData: Post) {
        await this.postModel.create<PostModel>({
            postId: postData.id,
            title: postData.title,
            content: postData.content,
            imageName: postData.imageName,
            author: postData.author,
            authorId: postData.authorId,
            timestamp: postData.timestamp
        })
    }
    async getById(postId: string): Promise<Post> {
        const post = await this.postModel.findOne<PostModel>({ where: { postId } })
        return Post.create({
            id: post.postId,
            title: post.title,
            content: JSON.parse(post.content),
            imageName: post.imageName,
            author: post.author,
            authorId: post.authorId,
            timestamp: +post.timestamp
        })
    }
    async update(postId: string, updatePostDto: UpdatePostDto) {
        const post = await this.postModel.findOne({ where: { postId } })
        post.update({ ...updatePostDto })
        post.save()
    }
    async delete(postId: string) {
        const post = await this.postModel.findOne({ where: { postId } })
        await post.destroy()
    }
}