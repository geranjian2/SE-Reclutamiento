import express from 'express';
import { loadControllers } from 'awilix-express';
import loadContainer from './container';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import { errorException, notFound } from '../middlewares';


 class Server{ 
    private app: express.Application
    constructor(){
        this.app = express();
        this.middlewares();    
    }
    middlewares():void {
        this.app.use(express.json());
        this.app.use(cors());
        this.app.use(helmet());
        this.app.use(compression());
        
        loadContainer(this.app);
        this.app.use(loadControllers(
            '../controllers/*.ts',
            { cwd: __dirname }
            ));
        this.app.use(notFound);
        this.app.use(errorException);
    }
    listen(port:number):void {
        this.app.listen( port, () => {
            console.log(`${port} SERVER START 😀`);
        });
    }
}
export default Server;