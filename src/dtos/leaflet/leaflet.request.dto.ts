import { IsDefined, IsString, MinLength, IsEmail, IsNotEmpty } from 'class-validator';
import { Expose } from 'class-transformer';
import { jsonIgnore } from 'json-ignore';

export class LeafletRequestDto  {
  
    @IsDefined({message: 'No esta definido'})
    @IsString({message: 'Debe ser un string'})
    @MinLength(3,{message: 'El nombre debe tener minimo 3 caracteres'})
    name!: string;
  
    @IsDefined({message: 'No esta definido'})
    @IsString({message: 'Debe ser un string'})
    @MinLength(3,{message: 'El nombre debe tener minimo 3 caracteres',})
    lastName!: string;

    @IsDefined()
    @Expose()
    @IsEmail({}, { message: 'Email invalido' })
    email!: string;
    
    @IsNotEmpty({message:'El documento es requerido'})
    document!:number;

    @MinLength(3,{message: 'La vacante debe tener minimo 3 caracteres',})
    vacancyName!:string;
    
    @IsNotEmpty({message:'El cliente es requerido'})
    @MinLength(3,{message: 'La cliente debe tener minimo 3 caracteres',})
    customerName!:string;

    @IsNotEmpty({message:'El Numero Telefonico es requerido'})
    phone!:number;

    @IsNotEmpty({message:'La experiencia es requerida'})
    @MinLength(3,{message: 'La experiencia debe tener minimo 3 caracteres',})
    experience!:string;

    @IsNotEmpty({message:'El nivel academico es requerido'})
    @MinLength(3,{message: 'El nivel academico debe tener minimo 3 caracteres',})
    academicLevel!:string;

    @IsNotEmpty({message:'El ciudad es requerido'})
    @MinLength(3,{message: 'La ciudad debe tener minimo 3 caracteres',})
    city  !:string;
        
    reasonCancellation!:string

    user!:string
  }

  export class LeafletResponseDto  {
    name!: string;
    lastName!: string;
    email!: string;
    document!:number;
    vacancyName!:string;
    customerName!:string;
    phone!:number;
    experience!:string;
    academicLevel!:string;
    city  !:string;
    reasonCancellation!:string
    user!:string
  
    constructor(init?: Partial<LeafletResponseDto>) {
      Object.assign(this, init);
    }
  }
  
