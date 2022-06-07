const { Router } = require('express'); 
const router = Router();

const { checkIfAccountsExists } = require('../model/accounts');
const { createOrder } = require('../model/orders');


function generateNumber() {
    var randomNumber = Math.random().toString(36).slice(-8);
    return randomNumber
}

router.post('/', async (req, res) => {
    const order = req.body;
    const result = await checkIfAccountsExists(order);
    if (result.length > 0) { 
    } else {
        accountName = "guest"
    }
    const orderNumber = generateNumber();

    order["username"] = order.username;
    order["ordernumber"] = orderNumber;


    createOrder(order)

    
    const resObj = {
        success: true
    }

    res.json(resObj);
})


module.exports = router;