import { BaseModel } from "../models/base.model";
import { IUser } from "./user.interface";

export class ILeaflet extends BaseModel{
    name!: string;
    lastName!: string;
    email!: string;
    document!:number;
    vacancyName!: string;
    customerName!:string;
    phone!:number;
    experience!:string;
    academicLevel!:string;
    city!:string;
    reasonCancellation?: string;
    user!:IUser | string;

    constructor(init?: Partial<ILeaflet>) {
        super(init);
        Object.assign(this, init);
      }
}
