import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  name: { lastName: string; firstName: string; };
  userName: string;
  email: string;
  password: string;
  createdAt: Date;
}

export interface IUserCreate extends IUser { };


const userSchema: Schema = new Schema({
  name: {
    lastName: { type: String, required: true },
    firstName: { type: String, required: true }
  },
  userName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model<IUser>('User', userSchema);
export default User;


