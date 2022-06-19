const { Router } = require('express');
const router = Router();

const { auth } = require('../routes/apikeys');
const { addProduct, deleteProduct } = require('../model/menu');


router.post('/', auth, async (req, res) => {
    const product = req.body;
    let newProduct = {};
    let result = false;
    if ('price' in product && 'title' in product && 'id' in product && 'desc' in product){
        newProduct = {
            id: product.id,
            title: product.title,
            desc: product.desc,
            price: product.price
        }
        result = await addProduct(newProduct)
    }
    
    const resObj = {
        success: false,
        message: 'Error!'
    }
    if(result) {
        resObj.success = true;
        resObj.message = 'Product added seccessfully!'
    }

    res.json(resObj);
})

router.delete('/', auth, async (req, res) => {
    const product = req.body;
    
    const result = await deleteProduct(product);
    console.log(product)
    const resObj = {
        success: true
    }

    if (result == false) {
        resObj.success = false;
        resObj.message = 'this product does not exist';
    }

    res.json(resObj);
})



module.exports = router;