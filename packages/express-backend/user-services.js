import mongoose from 'mongoose'
import userModel from './user.js'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
dotenv.config()

mongoose.set('debug', true)
if(process.env.NODE_ENV !== 'test'){
mongoose
 .connect(process.env.MONGODB_URI)
 .then(() => console.log('Connected to MongoDB Atlas'))
 .catch((error) => console.log('Connection error', error))
}
async function addUser(user) {
 console.log('OG password', user.password)
 const saltRounds = 10
 user.password = await bcrypt.hash(user.password, saltRounds)
 user.myitems = []
 console.log('Hashed Password', user.password)

 const userToAdd = new userModel(user)
 return userToAdd.save()
}
function getUsers() {
 return userModel.find({})
}

function findUserById(id) {
 return userModel.findById(id)
}

function findUserByEmail(email) {
 return userModel.findOne({ email: email })
}

function deleteUser(id) {
 return userModel.findByIdAndDelete(id)
}

async function addItem(user_id, item_id) {
  const user = await userModel.findById(user_id);
  const itemList = user.myitems;

  if (itemList.includes(item_id))
  {
    return user;
  }
  else
  {
    const updatedItemArray = { $push: { myitems: item_id} };
    const updatedUser = userModel.findByIdAndUpdate(user_id, updatedItemArray, {new: true});
    return updatedUser;
  }

}

export default {
 addUser,
 findUserById,
 getUsers,
 deleteUser,
 findUserByEmail,
 addItem
}
