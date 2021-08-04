import { UserRepository } from "../repositorys/user.repository";
import { IUser } from '../interfaces/user.interface';
import { LoginResult } from './token/token';
import { compareSync } from 'bcryptjs';
import { LoginRequestDto } from '../../../tsexpress-master/src/dtos/auth/login.request.dto';
import { generateToken } from "../helpers/jwt.helper";
import { RegisterUserDto } from '../dtos/auth/register.request.dto';

export enum RegisterResult {
    Success = 'Success',
    EmailTaken = 'Email ya existe',
}

export class AuthService{
    constructor(private readonly _userRepository: UserRepository){}

    public async  register(dto:RegisterUserDto): Promise<RegisterResult>  {
        try {

            const model = this.dtoToModel(dto);

            // eslint-disable-next-line prefer-const
            let userEmail = await this._userRepository.findOne({email:dto.email});
            if(!userEmail){
                await this._userRepository.create(model);
                return RegisterResult.Success;
            }
            return RegisterResult.EmailTaken;
        } catch (error) {
            throw new Error(`Error register. ${error}`);
        }
    }
    public async login(dto:LoginRequestDto): Promise<LoginResult | null>{
        try {
            
            const user = await this._userRepository.findOne({ email: dto.email });
            if(user){
                const isPasswordMatch = await compareSync(dto.password, user.password);
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

    protected dtoToModel(dto: RegisterUserDto): IUser {

        return new IUser({
            name: dto.name,
            password: dto.password,
            username: dto.username,
            email: dto.email
        });
    }
}