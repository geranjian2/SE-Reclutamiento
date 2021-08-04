import { IsDefined, IsString, MinLength, IsEmail, IsNotEmpty } from 'class-validator';
import { Expose } from 'class-transformer';

export class RegisterUserDto {
  
    @IsNotEmpty()
    @IsDefined({message: 'Debe ser un string'})
    name!: string;

    @IsNotEmpty()
    @IsString({message: 'Debe ser un string'})
    @MinLength(3,{message: 'Contraseña debe ser igual o mayor a 8 caracteres'})
    password!: string;
  
    @IsDefined()
    @Expose()
    username!: string;

    @IsNotEmpty()
    @IsDefined()
    @Expose()
    @IsEmail()
    email!: string;
  
  }