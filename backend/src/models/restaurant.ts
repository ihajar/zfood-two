import mongoose, { InferSchemaType } from "mongoose";

const menuSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        default: () => new mongoose.Types.ObjectId(),
    },
    name: { type: String, required: true },
    price: { type: Number, required: true },
}, { timestamps: true });

export type MenuType = InferSchemaType<typeof menuSchema>;


const restaurantSchema = new mongoose.Schema({
    // user
    restaurantName: { type: String, required: true },
    cuisines: [{ type: String, required: true }],
    menuItems: [menuSchema],
    imageUrl: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    deliveryPrice: { type: Number, required: true },
    deliveryTime: { type: Number, required: true },
}, { timestamps: true });

const Restaurant = mongoose.model('Restaurant', restaurantSchema);
export default Restaurant;