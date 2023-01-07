import express from 'express';
import cors from 'cors';
import db from './db/conn.js';

import ProductsRoute from './routes/ProductsRoute.js';
import insertSampleRoute from './routes/insertSampleRoute.js';
import reportRoute from './routes/reportRoute.js';


const app = express();

app.use(cors());
app.use(express.json( {limit: '1mb'} )); 
app.use(express.static('public'))

app.use('/products', ProductsRoute)
app.use('/insert_sample', insertSampleRoute)
app.use('/report', reportRoute)


app.use('*', (req, res) => {
    res.status(404).json({message: 'Not Found'});
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
