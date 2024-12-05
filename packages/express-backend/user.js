import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
 {
  email: {
   type: String,
   required: true,
   trim: true,
   default: '',
   validate: {
    validator: (email) => /^[^\s@]+@calpoly\.edu$/.test(email),
    message: 'Invalid Cal Poly Email Address',
   },
  },
  password: {
   type: String,
   required: true,
   trim: true,
   validate(value) {
    if (value.length < 8)
     throw new Error('Invalid password must be at least 8 characters.')
   },
  },
 },
 { collection: 'Login' }
)

const User = mongoose.model('User', UserSchema)

export default User
