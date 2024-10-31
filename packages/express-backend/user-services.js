import mongoose from "mongoose";
import userModel from "./user.js";

mongoose.set("debug", true);

mongoose
  .connect("mongodb://localhost:27017/users", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => console.log(error));

function findUserById(id) {
  return userModel.findById(id);
}

function addUser(user) {
  const userToAdd = new userModel(user);
  const promise = userToAdd.save();
  return promise;
}

function getUsers(user) {
  return userModel.find({})
}

function findUserByEmail(email) {
  return userModel.find({ email: email });
}

function deleteUser(id){
  return userModel.findByIdAndDelete(id)
}

export default {
  addUser,
  findUserById,
  deleteUser,
  getUsers
};