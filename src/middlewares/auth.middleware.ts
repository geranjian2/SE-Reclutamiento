import {Response, Request} from 'express';
import  JWT from 'jsonwebtoken';
import { StatusHelper } from '../helpers/status.helper';
import configServer from '../config/index';
import { IUser } from '../interfaces/user.interface';
import { HandlerHelper } from '../helpers';




declare module 'express-serve-static-core' {
    interface Request {
      user?: IUser | null
    }
  }
 

const SECRET_KEY = configServer.JWT_SECRET;
function authValidate(req: Request, res: Response, next: () => any):void {   
    if (req.headers.authorization === undefined || req.headers.authorization.split(' ')[0] !== 'Bearer') {
        HandlerHelper.error(req,res,"Unauthorized",{},StatusHelper.error401Unauthorized);
        return;
    }
    let  token = req.headers['authorization'];
    token = token.replace('Bearer ', '');
    JWT.verify(token, SECRET_KEY, function(err, decodedToken) {
        if (err) {
            HandlerHelper.error(req,res,"Unauthorized",{},StatusHelper.error401Unauthorized);
        } else {
            if(decodedToken){
                req.user = decodedToken.user;
            }
            next();
        }
    });
}
export  {authValidate};
