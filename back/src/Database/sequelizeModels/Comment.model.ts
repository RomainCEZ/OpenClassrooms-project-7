import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table
export class CommentModel extends Model {
    @Column
    postId: string;

    @Column
    commentId: string;

    @Column
    content: string;

    @Column
    author: string;

    @Column
    authorId: string;

    @Column({ type: DataType.BIGINT })
    timestamp: number;
}