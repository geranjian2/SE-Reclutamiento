import {sign} from 'jsonwebtoken';
import { TokenInfo } from '../../../tsexpress-master/src/services/token/token';
import configServer from '../config/index';
import { IUser } from '../interfaces';


function generateToken(user:IUser):TokenInfo{
    const SECONDS = 3600;
    const TIME = 4;
    return {token:sign({user},configServer.JWT_SECRET,{expiresIn:"4h"}),expiresIn:TIME*SECONDS};
}  

export  {generateToken};