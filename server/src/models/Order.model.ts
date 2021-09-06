import mongoose, { Schema } from 'mongoose';

const OrderSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item',
    required: true
  },
  status: {
    type: String,
    enum: ['ordered', 'shipped', 'arrived'],
    default: 'ordered'
  }
}, {
  timestamps: true,
  versionKey: false
});

export default mongoose.model('Order', OrderSchema);