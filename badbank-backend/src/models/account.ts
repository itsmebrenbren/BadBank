import mongoose from 'mongoose';

const AccountSchema = new mongoose.Schema({
  uid: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['chequing', 'savings'], required: true },
  balance: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

const Account = mongoose.model('Account', AccountSchema);

export default Account;
