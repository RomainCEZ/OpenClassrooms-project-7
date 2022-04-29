import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Sequelize } from "sequelize-typescript";
import { CommentModel } from "../../../Database/sequelizeModels/Comment.model";
import { PostModel } from "../../../Database/sequelizeModels/Post.model";
import { UserModel } from "../../../Database/sequelizeModels/User.model";
import { UpdatePostDto } from "../dto/update-post.dto";
import { Post } from "../entities/post.entity";
import { IPostsRepository } from "../interfaces/PostsRepository";

@Injectable()
export class PostsDBAdapter implements IPostsRepository {
    constructor(@InjectModel(PostModel) private readonly postModel: typeof PostModel,
        @InjectModel(CommentModel) private readonly commentModel: typeof CommentModel) { }

    async getAllPosts(): Promise<Post[]> {
        const postModels = await this.postModel.findAll<PostModel>({
            where: { isPublished: true },
            order: [['timestamp', 'DESC']],
            include: [
                { model: CommentModel, attributes: [], where: { isPublished: true }, required: false },
                { model: UserModel, attributes: ['profilePicture'] }
            ],
            attributes: {
                include: ['postAuthor.profilePicture',
                    [Sequelize.fn('COUNT', Sequelize.col('comments')), 'commentsCount'],
                ],
            },
            group: ['PostModel.id', 'postAuthor.id']
        })
        return postModels.map(postModel => {
            return Post.create({
                id: postModel.postId,
                title: postModel.title,
                content: postModel.content,
                imageName: postModel.imageName,
                author: postModel.author,
                authorId: postModel.authorId,
                authorPicture: postModel.getDataValue("postAuthor").profilePicture,
                timestamp: +postModel.timestamp,
                likes: postModel.likes,
                dislikes: postModel.dislikes,
                commentsNumber: +postModel.getDataValue("commentsCount")
            })
        })
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
        const post = await this.postModel.findOne<PostModel>({
            where: { postId, isPublished: true },
            include: [{ model: UserModel, attributes: ['profilePicture'] }],
            attributes: {
                include: ['postAuthor.profilePicture'],
            },
            group: ['PostModel.id', 'postAuthor.id']
        })
        return Post.create({
            id: post.postId,
            title: post.title,
            content: post.content,
            imageName: post.imageName,
            author: post.author,
            authorId: post.authorId,
            authorPicture: post.getDataValue("postAuthor").profilePicture,
            timestamp: +post.timestamp,
            likes: post.likes,
            dislikes: post.dislikes,
            commentsNumber: +post.getDataValue('commentsCount')
        })
    }
    async update(postId: string, updatePostDto: UpdatePostDto) {
        const post = await this.postModel.findOne({ where: { postId } })
        await post.update({ ...updatePostDto })
    }
    async delete(postId: string) {
        const post = await this.postModel.findOne({ where: { postId } })
        await post.update({ isPublished: false })
    }
}