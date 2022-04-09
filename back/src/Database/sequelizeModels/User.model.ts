import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table
export class UserModel extends Model {

    @Column
    userId: string;

    @Column
    email: string;

    @Column
    username: string;

    @Column
    password: string;

    @Column
    role: string

    @Column({ type: DataType.BIGINT })
    timestamp: number;
}