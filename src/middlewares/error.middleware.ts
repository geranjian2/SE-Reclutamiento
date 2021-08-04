import {Response, Request} from 'express';
import { HandlerHelper } from '../helpers';
function errorException(err:any,req: Request, res: Response, next: () => any):any {   
    const httpStatus = err.status || 500;
    const message  =  (err.errors)?`${err.errors}`:err.message;
    HandlerHelper.error(req, res, message ,httpStatus );
}
export  {errorException};
