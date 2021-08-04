import { BaseRepository } from "./base.repository";
import { IUser } from '../interfaces';
import { Model } from 'mongoose';
import { User } from '../models/';


// now, we have all code implementation from BaseRepository
export class UserRepository extends BaseRepository<IUser>{
    constructor(private readonly modelMongoose: Model<IUser>){
        super(User);
    }     
}