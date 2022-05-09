import { Column, Model, Table, DataType, HasMany, ForeignKey, HasOne } from 'sequelize-typescript';
import { CommentModel } from './Comment.model';
import { UserModel } from './User.model';

@Table
export class PostModel extends Model {
    @Column({ type: DataType.STRING, unique: true })
    postId: string;

    @Column({ type: DataType.STRING })
    title: string;

    @Column({ type: DataType.JSON })
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

    @HasOne(() => UserModel, { foreignKey: 'userId', sourceKey: 'authorId', as: 'postAuthor' })
    user: UserModel

    @HasMany(() => CommentModel, { foreignKey: 'postId', sourceKey: 'postId', as: 'comments' })
    comments: CommentModel[]

}