import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  transaction_data: {
    type: Object,
    required: true,
  },
},
{
  timestamps: true,
  toObject: {
    virtuals: true,
  },
  toJSON: {
    virtuals: true,
  },
},
);

const Transaction = mongoose.model('Transaction', TransactionSchema);

export default Transaction;
