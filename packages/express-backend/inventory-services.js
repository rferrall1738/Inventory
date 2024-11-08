import mongoose from "mongoose";
import inventoryModel from "./inventory.js";
import dotenv from 'dotenv';
dotenv.config();

mongoose.set("debug",true);

mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log("Connected to MongoDB Atlas"))
.catch((error) => console.log("Connection error",error));

async function findItem(item) {
    return inventoryModel.findItem(item);
}
function addItem(item){
    const itemToAdd = new inventoryModel(item);
    return itemToAdd.save();
}
function getItems(item){
    return inventoryModel.find({});
}
function deleteItem(item){
    return inventoryModel.findOneAndDelete(item)
}
export default {
    findItem,
    addItem,
    deleteItem,
    getItems
};
