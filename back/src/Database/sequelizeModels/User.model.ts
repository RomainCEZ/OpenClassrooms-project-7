import { BIGINT } from 'sequelize';
import { Column, Model, Table } from 'sequelize-typescript';

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

    @Column({ type: BIGINT })
    timestamp: number;
}