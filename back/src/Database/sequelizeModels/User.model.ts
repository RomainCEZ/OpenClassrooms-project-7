import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { CommentModel } from './Comment.model';
import { PostModel } from './Post.model';

@Table
export class UserModel extends Model {

    @Column({ unique: true })
    userId: string;

    @Column({ unique: true })
    email: string;

    @Column({ unique: true })
    username: string;

    @Column
    password: string;

    @Column
    role: string

    @Column({ type: DataType.STRING })
    profilePicture: string

    @Column({ type: DataType.BIGINT })
    timestamp: number;

    @Column({ type: DataType.BOOLEAN })
    isActive: boolean

    @HasMany(() => CommentModel, { foreignKey: 'authorId', sourceKey: 'userId', as: 'comments' })
    comments: CommentModel[]

    @HasMany(() => PostModel, { foreignKey: 'authorId', sourceKey: 'userId', as: 'posts' })
    posts: PostModel[]
}