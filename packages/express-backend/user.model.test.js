import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'
import User from './user.js'

describe('User Model', () => {
 let mongoServer

 beforeAll(async () => {
  // creates test db server
  mongoServer = await MongoMemoryServer.create()
  const uri = mongoServer.getUri()
  await mongoose.connect(uri, {
   useNewUrlParser: true,
   useUnifiedTopology: true,
  })
 })

 afterAll(async () => {
  await mongoose.disconnect()
  await mongoServer.stop()
 })

 afterEach(async () => {
  await User.deleteMany({})
 })

 test('should create a user with valid email and password', async () => {
  const validUser = {
   email: 'test@calpoly.edu',
   password: 'password123',
  }

  const user = new User(validUser)
  const savedUser = await user.save()

  expect(savedUser._id).toBeDefined()
  expect(savedUser.email).toBe(validUser.email)
  expect(savedUser.password).toBe(validUser.password)
 })

 test('should fail for invalid email', async () => {
  const invalidUser = {
   email: 'invalidemail@gmail.com',
   password: 'password123',
  }

  try {
   const user = new User(invalidUser)
   await user.save()
  } catch (error) {
   expect(error).toBeInstanceOf(mongoose.Error.ValidationError)
   expect(error.errors.email.message).toBe('Invalid email address must be a calpoly email')
  }
 })

 test('should fail validation for password shorter than 8 characters', async () => {
  const invalidUser = {
   email: 'test@calpoly.edu',
   password: 'short',
  }

  try {
   const user = new User(invalidUser)
   await user.save()
  } catch (error) {
   expect(error).toBeInstanceOf(mongoose.Error.ValidationError)
   expect(error.errors.password.message).toBe(
    'Invalid password must be at least 8 characters.'
   )
  }
 })
})
