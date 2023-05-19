import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import kpiroutes from './routes/kpi.js';
import productroutes from './routes/product.js';
import KPI from './models/KPI.js';
import Products from './models/Product.js';
import { kpis,products } from './data.js';
import Product from './models/Product.js';

/**CONFIGURATIONS */
dotenv.config();
const app = express();

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/**ROUTES */
app.use('/kpi', kpiroutes)
app.use('/product', productroutes)


/**MONGOOSE SETUP */
const PORT = process.env.PORT || 9000;
mongoose
	.connect(process.env.MONGODB_URL, {
		useUnifiedTopology: true,
		useNewUrlParser: true,
	})
	.then(async () => {
		console.log('Connected to MongoDB');
		app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
		await mongoose.connection.db.dropDatabase();
		KPI.insertMany(kpis);
		Product.insertMany(products);
	})
	.catch((error) => console.log(`${error} did not connect`))
