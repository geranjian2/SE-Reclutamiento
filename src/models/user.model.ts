import mongoose from 'mongoose';
const {Schema} = mongoose;
import { hashSync,compareSync, genSaltSync} from 'bcryptjs';
import { IUser } from '../interfaces';
import { Model, Document } from 'mongoose';


export interface IUserDocument extends IUser, Document {
    _id: string;
    isPasswordValid(plainPassword: string): Promise<boolean>;
  }

//   eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IUserModel extends Model<IUserDocument> { }


 const UserSchema =  new Schema<IUserModel>({
    name:{type:String,required:true},
    username:{type:String,required:true},
    password:{type:String,required:true},
    email: { type:String, required: [true, 'El correo es obligatorio'], unique: [true, 'El correo ya esta registrado'] }
},{ timestamps: { createdAt: 'created_at' }});

// Omit the password when returning a user
UserSchema.set('toJSON', {
  transform: function (doc:any, ret:any) {
      delete ret.password;
      delete ret.created_at;
      delete ret.updatedAt;
      return ret;
  }
});

UserSchema.pre('save', function(next) {
    if (!this.isModified("password")) {
       return next();
    }
    const salt = genSaltSync(10);
    const hashedPassword = hashSync(this.password,salt);
    this.password = hashedPassword;
    next();
  });

  UserSchema.methods.isPasswordValid = async function (this: IUserDocument, plainPassword: string) {
    return await compareSync(plainPassword, this.password);
  };
  

  export const User = mongoose.model<IUser>('User', UserSchema);