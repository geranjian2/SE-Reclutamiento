import {Response, Request} from 'express';
import { StatusHelper } from '../helpers/status.helper';
function notFound(req: Request, res: Response, next: () => any):void {   
    res.status(404).send({ message:"Resource not found"});
    next();
}
export  {notFound};
