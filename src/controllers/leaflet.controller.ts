import { Request, Response } from 'express';
import { before, GET, POST, route } from 'awilix-express';
import { authValidate, dtoValidationMiddleware} from '../middlewares';
import { LeafletRequestDto } from '../dtos/leaflet/leaflet.request.dto';
import { LeafLetService,LeafLetRegisterResult } from '../services/leaflet.service';
import { plainToClass } from 'class-transformer';
import { HandlerHelper } from '../helpers';
import { StatusHelper } from '../helpers/status.helper';
import { IUser } from '../interfaces';

@route('/leaflet')
/**
 * @before
 * Injecto el middleware authValidate para que valide el JWT para todo el recurso de leaflet (Prospecto)
 */
@before([
    authValidate
])
export class LeafletController {

    constructor(private readonly _leafLetService:LeafLetService){}
    
    @GET()
    public async getAll(req:Request,res:Response){
        
        const user = req.user  as IUser;
        const response = await this._leafLetService.getAll();
        HandlerHelper.success(req,res,"get all leaflet",response,StatusHelper.status200OK);
        
    }

    @route('/:id')
    @GET()
    public async getById(req:Request,res:Response){
        const id = req.params.id;
        const user = req.user  as IUser;
        const response = await this._leafLetService.findById(id);
        HandlerHelper.success(req,res,"get id leaflet",response,StatusHelper.status200OK);
    }
    
    @POST()
    @before([
        dtoValidationMiddleware(LeafletRequestDto)
    ])
    public async create(req:Request,res:Response){
        const reqLeaflet = plainToClass(LeafletRequestDto, req.body);
        const user = req.user  as IUser;
        const response = await this._leafLetService.create(reqLeaflet,user);
        if(response == LeafLetRegisterResult.Success){
            HandlerHelper.success(req,res,"Register success",response,StatusHelper.status200OK);
        }else{
            HandlerHelper.error(req,res,"Error Register",response,StatusHelper.error400BadRequest);
        }
    }

}