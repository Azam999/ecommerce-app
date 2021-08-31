import mongoose, { Schema, Document } from 'mongoose';
import validator from 'validator';

interface IUser {
  _id?: mongoose.Types.ObjectId,
  name: string,
  email: string,
  password: string,
  birthDate?: String
}

const UserSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: [true, 'Email address is required'],
    trim: true,
    validate: [validator.isEmail, 'Email is not valid']
  },
  password: {
    type: String,
    required: true
  },
  birthDate: String,
}, {
  versionKey: false,
  timestamps: true
})

const User = mongoose.model<IUser>('User', UserSchema);

export { User, UserSchema, IUser };