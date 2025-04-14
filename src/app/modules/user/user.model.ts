import { model, Schema } from 'mongoose';
import { TUser } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

const userSchema = new Schema<TUser>(
  {
    id: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: true },
    needPasswordChange: { type: Boolean, required: true, default: true },
    role: {
      type: String,
      enum: {
        values: ['student', 'faculty', 'admin'],
        message: '{VALUE} is not a valid role',
      },
    },
    status: {
      type: String,
      enum: {
        values: ['in-progress', 'blocked'],
        message: '{VALUE} is status',
      },
      default: 'in-progress',
    },
    isDeleted: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  },
);
// Password hashing

userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, Number(config.bcrypt_salt));
  next();
});
userSchema.post('save', async function (doc, next) {
  doc.password = '';
  next();
});
userSchema.pre('find', async function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
userSchema.pre('findOne', async function (next) {
  this.findOne({ isDeleted: { $ne: true } });
  next();
});

const User = model<TUser>('User', userSchema);
export default User;
