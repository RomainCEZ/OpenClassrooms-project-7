import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { PostModel } from './Post.model';
import { UserModel } from './User.model';

@Table
export class CommentModel extends Model {
    @ForeignKey(() => PostModel)
    @Column({ type: DataType.STRING })
    postId: string;

    @Column
    commentId: string;

    @Column
    content: string;

    @ForeignKey(() => UserModel)
    @Column
    author: string;

    @ForeignKey(() => UserModel)
    @Column
    authorId: string;

    @Column({ type: DataType.BIGINT })
    timestamp: number;

    @BelongsTo(() => PostModel, 'postId')
    post: PostModel

    @BelongsTo(() => UserModel, 'authorId')
    userId: UserModel

    @BelongsTo(() => UserModel, 'author')
    username: UserModel
}