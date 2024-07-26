const mongoose=require("mongoose");
const validator= require("validator");


const MedicineSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    discountPrice: { type: Number },
    quantity: { type: Number, required: true },
    manufacturer: { type: String, required: true },
    imageUrl: { type: String }
});

//we will create a new collection
module.exports = mongoose.model('Medicines', MedicineSchema);