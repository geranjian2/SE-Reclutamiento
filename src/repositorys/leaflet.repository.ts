import { BaseRepository } from "./base.repository";
import { ILeaflet } from '../interfaces';
import { Model } from 'mongoose';
import { Leaflet } from '../models';


// now, we have all code implementation from BaseRepository
export class LeafletRepository extends BaseRepository<ILeaflet>{
    constructor(private readonly modelMongoose: Model<ILeaflet>){
        super(Leaflet);
    }     
}