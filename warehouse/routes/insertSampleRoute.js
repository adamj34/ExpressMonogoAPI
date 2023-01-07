import express from 'express';
import Product from '../schemas/productSchema.js';
 
const router = express.Router();

router.post('/', async (req, res) => {

    const product1 = {
        name: 'Apple',
        price: 0.5,
        description: 'A red fruit',
        quantity: 100,
        unit: 'kg'
      };
      
      const product2 = {
        name: 'Banana',
        price: 0.25,
        description: 'A yellow fruit',
        quantity: 50,
        unit: 'kg'
      };
      
      const product3 = {
        name: 'Orange',
        price: 0.6,
        description: 'An orange fruit',
        quantity: 80,
        unit: 'kg'
      };
      
      const product4 = {
        name: 'Pineapple',
        price: 2.0,
        description: 'A tropical fruit',
        quantity: 30,
        unit: 'kg'
      };
      
      const product5 = {
        name: 'Kiwi',
        price: 0.75,
        description: 'A green fruit with brown skin',
        quantity: 40,
        unit: 'lb'
      };
      
    await Product.insertMany([product1, product2, product3, product4, product5])
        .then((data) => res.status(201).json(data))
        .catch((error) => res.status(400).json(error));
})


export default router;
