import { Request, Response } from 'express';
import {  POST, route, before } from 'awilix-express';
import { AuthService, RegisterResult } from "../services";
import { StatusHelper } from '../helpers/status.helper';
import { ValidationError, ValidationErrorPlace } from '../errors/validation.error';
import { LoginRequestDto,RegisterUserDto } from '../dtos/';
import { dtoValidationMiddleware } from '../middlewares';
import { HandlerHelper } from '../helpers';
import { plainToClass } from "class-transformer";




@route('/auth')
export class AuthController{
    constructor(private readonly _authService: AuthService){}
  
    @route('/register')
    @POST()
    @before([
      dtoValidationMiddleware(RegisterUserDto)
    ])
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    public async register(req:Request,res:Response){
        const reqUser = plainToClass(RegisterUserDto, req.body);
        const result = await this._authService.register(reqUser); 
        if (result === RegisterResult.Success){
          HandlerHelper.success(req,res,"Register success",RegisterResult.Success,StatusHelper.status204NoContent);
          return;
        } 
        console.log(StatusHelper.error400BadRequest);
        HandlerHelper.error(req,res,"Error de registro",result,StatusHelper.error400BadRequest);
    }

    @route('/login')
    @POST()
    @before([
      dtoValidationMiddleware(LoginRequestDto)
    ])
    public async login(req:Request,res:Response){
        // const reqUser = req.body as LoginRequestDto;
        const reqUser = plainToClass(LoginRequestDto, req.body);
        const result = await this._authService.login(reqUser); 
        if (result){
          HandlerHelper.success(req,res,"Login success",result,StatusHelper.status200OK);
          return;
        } 
        throw new ValidationError(ValidationErrorPlace.Body, 'User or Password Incorrect'); 
    }
}