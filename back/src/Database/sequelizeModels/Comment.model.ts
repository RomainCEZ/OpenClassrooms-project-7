import { Column, Model, Table } from 'sequelize-typescript';

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

    @Column
    timestamp: number;
}