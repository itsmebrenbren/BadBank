import mongoose, { Schema, ObjectId } from 'mongoose';

export interface IUser {
  name: { lastName: string; firstName: string; };
  userName: string;
  email: string;
  password: string;
  createdAt: Date;
  id?: ObjectId;
  accounts: { chequing: number; savings: number; };
}

const userSchema: Schema = new Schema({
  name: {
    lastName: { type: String, required: true },
    firstName: { type: String, required: true }
  },
  userName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  accounts: {
    chequing: { type: Number, required: true },
    savings: { type: Number, requuired: true}
  }
});

const User = mongoose.model<IUser>('User', userSchema);
export default User;



