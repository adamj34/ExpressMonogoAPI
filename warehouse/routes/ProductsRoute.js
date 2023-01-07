import express from 'express';
import Product from '../schemas/productSchema.js';

const router = express.Router(); 

router.post('/', async (req, res) => {

    const { name, price, description, quantity, unit } = req.body;

    await Product.create({ 
        name: name,
        price: price,
        description: description,
        quantity: quantity,
        unit: unit
     })
        .then((data) => res.status(201).json(data))
        .catch((error) => res.status(400).json(error));

})

router.get('/name', async (req, res) => {  
    
    await Product.find({}).sort({name: 1})
        .then((data) => res.status(200).json(data))
        .catch((error) => res.status(400).json(error));
})

router.get('/price', async (req, res) => {  
    
    await Product.find({}).sort({price: 1})
        .then((data) => res.status(200).json(data))
        .catch((error) => res.status(400).json(error));
})

router.get('/quantity', async (req, res) => {  
    
    await Product.find({}).sort({quantity: 1})
        .then((data) => res.status(200).json(data))
        .catch((error) => res.status(400).json(error));
})

router.get('/:id', async (req, res) => {
    console.log(req.params);
    const { id } = req.params;

    await Product.findOne({ _id: id })
        .then((data) => res.status(200).json(data))
        .catch((error) => res.status(400).json(error));
})

router.put('/:id', async (req, res) => {
    console.log(req.body);

    const { id } = req.params;

    await Product.updateOne(
        {
            _id: id
        },
        {
            $set: {
                name: req.body.name,
                price: req.body.price,
                description: req.body.description,
                quantity: req.body.quantity,
                unit: req.body.unit
            }
        })
        .then((data) => res.status(204).json(data))
        .catch((error) => res.status(400).json(error));
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    await Product.deleteOne({ _id: id })
        .then((data) => res.status(204).json(data))
        .catch((error) => res.status(400).json(error));
})


export default router;
