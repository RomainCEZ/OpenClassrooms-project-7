import { JSON } from 'sequelize';
import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class PostModel extends Model {
    @Column
    postId: string;

    @Column
    title: string;

    @Column({ type: JSON })
    content: string;

    @Column
    imageName: string;

    @Column
    author: string;

    @Column
    authorId: string;

    @Column
    timestamp: number;
}