import { IRead, IWrite } from "../interfaces";
import { Model } from 'mongoose';

export abstract class BaseRepository<T> implements IRead<T>, IWrite<T> {
   private _model: Model<T>;
   constructor(modelMongoose: Model<T>){
      this._model = modelMongoose;
   }
   async create(item: T): Promise<T> {
       return   await this._model.create(item);
   }
   async update(id: string, item: T): Promise<T | null> {
      return  await this._model.findByIdAndUpdate(id, item,{new:true});
   }
   async delete(id: string): Promise<void> {
        await this._model.findByIdAndUpdate(id );
   }

   async findAll(): Promise<T[]> { 
      return  await this._model.find();
   }
   public async findOne(conditions: Partial<T>): Promise<T | null> {
      const item = await this._model.findOne(conditions as any).exec();
      if (item == null) {
        return null;
      }
      return item;
    }
   public async findById(id: string): Promise<T | null> {
      const item = await this._model.findById(id).exec();
      if (item == null) {
        return null;
      }
      return item;
    }

}