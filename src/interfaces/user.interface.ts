import { BaseModel } from '../models/base.model';
export class IUser extends BaseModel{
    name!: string;
    username!: string;
    password!: string;
    email!:string;
    constructor(init?: Partial<IUser>) {
      super(init);
      Object.assign(this, init);
    }
  }
  