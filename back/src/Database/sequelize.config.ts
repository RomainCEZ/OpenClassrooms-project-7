import { DEVELOPMENT, TEST, PRODUCTION, HEROKU } from '../constants';
import { databaseConfig } from './database.config';


let config;
switch (process.env.NODE_ENV) {
    case DEVELOPMENT:
        config = databaseConfig.development;
        break;
    case TEST:
        config = databaseConfig.test;
        break;
    case PRODUCTION:
        config = databaseConfig.production;
        break;
    case HEROKU:
        config = databaseConfig.heroku;
        break;
    default:
        config = databaseConfig.development;
}

export default config