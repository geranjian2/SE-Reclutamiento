import { Response, Request } from "express";
import { StatusHelper } from "./status.helper";


  export abstract class HandlerHelper {
    public static success(req:Request, res:Response, message:string   ,data:any , status:number):void{
      const statusCode = status || StatusHelper.status200OK;
          const statusMessage = message || '';
          res.status(statusCode).send({
              ok: true,
              status: statusCode,
              message: statusMessage,
              data
          });
    }
    public static error(req:Request, res:Response,message:string,errors:any, status:number):void{
          const statusCode = status || 500;
          const statusMessage = message || 'Internal server error';
          res.status(statusCode).send({
              ok: false,
              status: statusCode,
              message: statusMessage,
              errors
          });
        }
  }
  
  

