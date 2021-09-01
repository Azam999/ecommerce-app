import mongoose, { Schema } from 'mongoose';

const OrderSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item'
  },
  status: {
    type: String,
    enum: ['ordered', 'shipped', 'arrived']
  }
}, {
  timestamps: true,
  versionKey: false
});

export default mongoose.model('Order', OrderSchema);