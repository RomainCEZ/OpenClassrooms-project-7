export interface IDatabaseConfigAttributes {
    username?: string;
    password?: string;
    database?: string;
    host?: string;
    port?: number | string | any;
    dialect?: any;
    urlDatabase?: string;
    protocol?: string;
    dialectOptions?: any;
}

export interface IDatabaseConfig {
    development: IDatabaseConfigAttributes;
    test: IDatabaseConfigAttributes;
    production: IDatabaseConfigAttributes;
    heroku: IDatabaseConfigAttributes;
}