import { Column, Model, Table, DataType, HasMany, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { CommentModel } from './Comment.model';
import { UserModel } from './User.model';

@Table
export class PostModel extends Model {
    @Column({ type: DataType.STRING })
    postId: string;

    @Column
    title: string;

    @Column({ type: DataType.JSON })
    content: string;

    @Column
    imageName: string;

    @ForeignKey(() => UserModel)
    @Column
    author: string;

    @ForeignKey(() => UserModel)
    @Column
    authorId: string;

    @Column({ type: DataType.BIGINT })
    timestamp: number;

    @HasMany(() => CommentModel, { sourceKey: 'postId' })
    comments: CommentModel[]

    @BelongsTo(() => UserModel, 'authorId')
    userId: UserModel

    @BelongsTo(() => UserModel, 'author')
    username: UserModel

}