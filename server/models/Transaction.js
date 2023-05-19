import mongoose from "mongoose";
import { loadType } from "mongoose-currency";

const Schema = mongoose.Schema;
loadType(mongoose);

const TransactionSchema = new Schema({
	buyer: {
		type: mongoose.Types.Currency,
		currency: 'KSH'
	},
	amount: {
		type: mongoose.Types.Currency,
		currency: 'KSH'
	},
	productIds: [
		{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Product'
		},
	],
}, { timestamps: true });

const Transaction = mongoose.model('Transaction', TransactionSchema);

export default Transaction;