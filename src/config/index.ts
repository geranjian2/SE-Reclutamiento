process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.APP_ENV = process.env.APP_ENV || 'development';

//env files
import dotenv = require('dotenv');

dotenv.config({
    path: `${__dirname}/../../config/${process.env.APP_ENV}.env`
});


export default {
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI as string,
    APPLICATION_NAME: process.env.APPLICATION_NAME as string,
    JWT_SECRET:process.env.JWT_SECRET as string
}; 