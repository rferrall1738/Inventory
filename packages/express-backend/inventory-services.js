import mongoose from "mongoose";
import inventoryModel from "./inventory.js";
import dotenv from 'dotenv';
dotenv.config();
mongoose.set("debug",true);

mongoose.connect(MONGODB_URI)
.then(() => console.log("Connected to MongoDB Atlas"))
.catch((error) => console.log("Connection error",error));

function findItem(item) {
    return inventoryModel.findItem(id);
}
function addItem(item){
    const itemToAdd = new inventoryModel(item);
    const promise = itemToAdd.save();
    return promise;
}
function getItems(item){
    return inventoryModel.find({});
}
function deleteItem(item){
    return inventoryModel.findByItemAndDelete(item)
}
export default {
    findItem,
    addItem,
    deleteItem,
    getItems
};
