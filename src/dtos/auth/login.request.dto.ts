import { IsNotEmpty, IsString, MinLength, IsEmail } from 'class-validator';
import { Expose } from 'class-transformer';
export class LoginRequestDto {
     

     @IsNotEmpty()
     @IsString({message: 'Debe ser un string'})
     @IsEmail()
     @Expose()
     email!: string;

     @IsNotEmpty()
     @IsString({message: 'Debe ser un string'})
     @MinLength(3,{message: 'Contraseña debe ser igual o mayor a 8 caracteres'})
     password!: string;


}

export class LoginResponseDto{
     email!:string;
     passwird!:string;

     constructor(init?: Partial<LoginResponseDto>) {
          Object.assign(this, init);
        }
}
