import Mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const { Schema, model } = Mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
          throw new Error('Email is invalid')
      }
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 7,
    validate(value) {
      if (value.toLowerCase().includes('password')) {
          throw new Error('Password cannot contain "password"')
      }
    }
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }],
  address: { type: String },
  marital_status: { type: String },
  phone_number: { type: String },
  thumbnail: { data: Buffer, contentType: String },
  posted_room_ids: [ { type: String } ],
  room_applicant_ids: [ { type: String } ],
  interested_room_ids: [ { type: String } ],
})

userSchema.methods.generateAuthToken = async function() {
  const user = this
  const token = jwt.sign({ _id:user._id.toString() }, 'mynameisashishsingh')

  user.tokens = user.tokens.concat({ token })
  await user.save()

  return token
}

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({email})
  
  if(!user) {
    throw new Error ('Unable to login')
  }

  const isMatch = await bcrypt.compare(password, user.password)

  if(!isMatch) {
    throw new Error('Unable to login')
  }

  return user
}

userSchema.pre('save', async function (next) {
  const user = this 
  if(user.isModified('password')) {
    user.password = await bcrypt.hash(user.password,8)
  }

  next()
})

const User = model('user', userSchema);

export default User;