const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: 'default.jpg',
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'first_login', 'suspended', 'deleted'],
      default: 'first_login',
    },
    role: {
      type: String,
      enum: ['user', 'admin', 'guest'],
      default: 'user',
    }
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        // Remove the fields you don't want to return
        delete ret.__v;
        delete ret.password; // Don't return the password field
        // rename the _id field to id
        ret.id = ret._id;
        delete ret._id;
        return ret;
      },
    },
  }
);
const User = mongoose.model('User', userSchema);
module.exports = User;
