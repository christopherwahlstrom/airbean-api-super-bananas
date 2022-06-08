const { Router } = require('express'); 
const router = Router();

const { checkIfAccountsExists } = require('../model/accounts');
const { createOrder, getOrder } = require('../model/orders');


function generateNumber() {
    var randomNumber = Math.random().toString(36).slice(-8);
    return randomNumber
}

function calculateTotal(order) {
    let sum = 0;
    for (let i = 0; order.items.length > i; i++) {
        sum += order.items[i].total;
    }
    return sum;
}

router.post('/', async (req, res) => {
    const order = req.body;
    let accountName = '';
    const result = await checkIfAccountsExists(order);
    if (result.length > 0) { 
        accountName = result[0].username;
    } else {
        accountName = "guest"
    }
    const orderNumber = generateNumber();
    const calTotal = calculateTotal(order);
    const timeOfOrder = new Date().toLocaleTimeString();

    order["ETA-tid"] = 'Anländer om 10min';
    order["timeOfOrder"] = timeOfOrder;
    order["username"] = accountName;
    order["ordernumber"] = orderNumber;
    order["total"] = calTotal;

    createOrder(order)

    
    const resObj = {
        success: true
    }

    res.json(resObj);
})

router.get('/:id', async (req, res) => {
    const order = req.params.id;
    const result = await getOrder(order);
    let sum = 0;
    for (let i = 0; result.length > i; i++) {
        sum += result[i].total;
    }
    const resObj = {
        success: false
    }

    if (result.length > 0) {
        resObj.success = true;
        resObj.orders = result;
        resObj.totalSpend = sum;
        resObj.timeNow = new Date().toLocaleTimeString();
    }

    res.json(resObj);
})


module.exports = router;