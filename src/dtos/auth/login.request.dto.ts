import { IsNotEmpty, IsString, MinLength, IsEmail } from 'class-validator';
export class LoginRequestDto {
     
     @IsNotEmpty()
     @IsString({message: 'Debe ser un string'})
     @IsEmail()
     email!: string;

     @IsNotEmpty()
     @IsString({message: 'Debe ser un string'})
     @MinLength(3,{message: 'Contraseña debe ser igual o mayor a 8 caracteres'})
     password!: string;
}
