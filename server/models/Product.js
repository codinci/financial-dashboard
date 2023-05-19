import mongoose from "mongoose";
import { loadType } from "mongoose-currency";

const Schema = mongoose.Schema;
loadType(mongoose);

const ProductSchema = new Schema({
	price: {
		type: mongoose.Types.Currency,
		currency: 'KSH',
	},
	expense: {
		type: mongoose.Types.Currency,
		currency: 'KSH',
	},
	transactions: [
		{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Transaction'
		},
	],
}, { timestamps: true });

const Product = mongoose.model('Product', ProductSchema);

export default Product;