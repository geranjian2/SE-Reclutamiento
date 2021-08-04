import mongoose,{ Schema } from 'mongoose';
import { ILeaflet } from '../interfaces/';
import  autopopulate from 'mongoose-autopopulate';

const LeafletSchema =  new Schema({
    name:{type:String,required:true},
    lastName:{type:String,required:true},
    email: { type:String, required: [true, 'El correo es obligatorio'], unique: [true, 'El correo ya esta registrado'] },
    document:{type:Number,required:true},
    vacancyName:{type:String,required:true},
    customerName:{type:String,required:true},
    phone:{type:Number,required:true},
    experience:{type:String,required:true},
    academicLevel:{type:String,required:true},
    city:{type:String,required:true},
    reasonCancellation:{type:String},
    user: {
        ref: 'User',
        type: Schema.Types.ObjectId,
        required: true,
        autopopulate: true,
      }
},{ timestamps: { createdAt: 'created_at' }});

LeafletSchema.plugin((autopopulate), {
  // Apply this plugin to all functions except for `save()`
  functions: ['find', 'findOne', 'findOneAndUpdate']
});



export const Leaflet = mongoose.model<ILeaflet>('Leafleft', LeafletSchema);