import { Column, Model, Table, DataType } from 'sequelize-typescript';

@Table
export class PostModel extends Model {
    @Column
    postId: string;

    @Column
    title: string;

    @Column({ type: DataType.JSON })
    content: string;

    @Column
    imageName: string;

    @Column
    author: string;

    @Column
    authorId: string;

    @Column({ type: DataType.BIGINT })
    timestamp: number;
}