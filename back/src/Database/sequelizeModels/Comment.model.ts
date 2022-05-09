import { Column, DataType, ForeignKey, HasOne, Model, Table } from 'sequelize-typescript';
import { PostModel } from './Post.model';
import { UserModel } from './User.model';

@Table
export class CommentModel extends Model {
    @ForeignKey(() => PostModel)
    @Column({ type: DataType.STRING })
    postId: string;

    @Column({ type: DataType.STRING, unique: true })
    commentId: string;

    @Column({ type: DataType.STRING })
    content: string;

    @ForeignKey(() => UserModel)
    @Column({ type: DataType.STRING })
    author: string;

    @ForeignKey(() => UserModel)
    @Column({ type: DataType.STRING })
    authorId: string;

    @Column({ type: DataType.BIGINT })
    timestamp: number;

    @Column({ type: DataType.BOOLEAN })
    isPublished: boolean

    @Column({ type: DataType.ARRAY(DataType.STRING) })
    likes: string[]

    @Column({ type: DataType.ARRAY(DataType.STRING) })
    dislikes: string[]

    @HasOne(() => PostModel, { foreignKey: 'postId', sourceKey: 'postId', as: 'post' })
    post: PostModel

    @HasOne(() => UserModel, { foreignKey: 'userId', sourceKey: 'authorId', as: 'commentAuthor' })
    user: UserModel
}