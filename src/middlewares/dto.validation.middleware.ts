import { RequestHandler } from "express";
import { plainToClass } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { sanitize} from "class-sanitizer";
import { HandlerHelper } from "../helpers";
import { StatusHelper } from "../helpers/status.helper";


 function  dtoValidationMiddleware(type: any, skipMissingProperties = false): RequestHandler {

  return  (req, res, next) => {
    const dtoObj = plainToClass(type, req.body);
    validate(dtoObj, { skipMissingProperties }).then(
        (errors: ValidationError[]) => {
            if (errors.length > 0) {
                const dtoErrors = errors.map((error: ValidationError) =>
                (Object as any).values(error.constraints)).join(", ");
                
                const erorres =  dtoErrors.split(',');
                HandlerHelper.error(req,res,"Errors Request Validation",erorres,StatusHelper.error400BadRequest);
            } else {
                sanitize(dtoObj);
                req.body = dtoObj;
                next();
            }
        }
        );
  };
}
export {dtoValidationMiddleware};