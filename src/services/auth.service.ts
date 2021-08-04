import { UserRepository } from "../repositorys/user.repository";
import { IUser } from '../interfaces/user.interface';
import { LoginResult } from './token/token';
import { compareSync } from 'bcryptjs';
import { LoginRequestDto } from '../../../tsexpress-master/src/dtos/auth/login.request.dto';
import { generateToken } from "../helpers/jwt.helper";

export enum RegisterResult {
    Success = 'Success',
    EmailTaken = 'Email ya existe',
}

export class AuthService{
    constructor(private readonly _userRepository: UserRepository){}

    public async  register(item:IUser): Promise<RegisterResult>  {
        try {
            // eslint-disable-next-line prefer-const
            let userEmail = await this._userRepository.findOne({email:item.email});
            if(!userEmail){
                await this._userRepository.create(item);
                return RegisterResult.Success;
            }
            return RegisterResult.EmailTaken;
        } catch (error) {
            throw new Error(`Error register. ${error}`);
        }
    }
    public async login(item:LoginRequestDto): Promise<LoginResult | null>{
        try {
            
            const user = await this._userRepository.findOne({ email: item.email });
            if(user){
                const isPasswordMatch = await compareSync(item.password, user.password);
                if (isPasswordMatch) {
                    const token = generateToken(user);
                    return {
                      tokenInfo: token,
                      user: user,
                    };
                }
               
            }
            return null;
        } catch (error) {
            throw new Error(`Error Login. ${error}`);
        }
    }
}