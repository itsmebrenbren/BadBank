import mongoose, { Schema, ObjectId } from "mongoose";

export interface IAccount {
  userId: ObjectId;
  type: 'chequing' | 'savings';
  balance: number;
  createdAt: Date;
}

const AccountSchema: Schema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['chequing', 'savings'], required: true },
  balance: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

const Account = mongoose.model<IAccount>('Account', AccountSchema);
export default Account;
