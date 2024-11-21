import mongoose from "mongoose";
import axios from "axios"
import inventoryModel from "./inventory.js";
import dotenv from 'dotenv';
dotenv.config();

mongoose.set("debug",true);

mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log("Connected to MongoDB Atlas"))
.catch((error) => console.log("Connection error",error));

const API_KEY = process.env.API_KEY;

async function getCoordinates(location) {
    const enhancedLocation = `${location}, Cal Poly, San Luis Obispo, CA`;
    try {
        const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
            params: {
                address: enhancedLocation,
                key: API_KEY,
            },
        });
        console.log("Geocoding API response:", response.data);

        if (response.data.status === 'OK') {
            const { lat, lng } = response.data.results[0].geometry.location;
            return { lat, lng };
        } else {
            throw new Error('Geocoding API error');
        }
    } catch (error) {
        console.error('Error fetching coordinates:', error);
        throw error;
    }
}

async function findItem(item) {
    return inventoryModel.findOne(item);
}

function findItemByID(item) {
    return inventoryModel.findById(item);
}

async function addItem(item){
    const coordinates = await getCoordinates(item.Location);

    // Add coordinates to the item data
    const itemWithCoordinates = {
        ...item,
        Lat: coordinates.lat,
        Lng: coordinates.lng,
    };
    const itemToAdd = new inventoryModel(itemWithCoordinates);
    return itemToAdd.save();
}
async function getItems(){
    return inventoryModel.find({});
}
async function getItem(id){
    return inventoryModel.findOne({id:id})
}
async function deleteItem(item){
    return inventoryModel.findOneAndDelete({item:item})
}
export default {
    findItem,
    findItemByID,
    addItem,
    deleteItem,
    getItems,
    getItem

};
