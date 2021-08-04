import Server from './app';
import configServer from '../config/index';
import mongoose from 'mongoose';

const server = new Server();
const port = parseInt(configServer.PORT as string, 10) || 3000;

mongoose.set('useCreateIndex',true);
mongoose.connect(configServer.MONGO_URI,{useNewUrlParser:true, useFindAndModify:false,useUnifiedTopology: true}).then(()=>{
    server.listen(port);
}).catch((err) => console.log(err));

