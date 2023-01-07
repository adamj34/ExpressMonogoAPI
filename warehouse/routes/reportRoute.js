import express from 'express';
import Product from '../schemas/productSchema.js';
 
const router = express.Router();

router.get('/', async (req, res) => {
    await Product.aggregate([
        {
          $group: {
            _id: '$name',
            quantity: { $sum: '$quantity' },
            totalValue: { $sum: { $multiply: ['$price', '$quantity'] } }
          }
        },
        {
            $sort: { totalValue: -1 }
        },
        {
            $group: {
              _id: null,
              products: { $push: '$$ROOT' },
              totalValue: { $sum: '$totalValue' }
            }
        }
      ])
        .then(queryRes => queryRes[0])
        .then((data) => res.status(200).json(data))
        .catch((error) => res.status(400).json(error));
    
})

export default router;