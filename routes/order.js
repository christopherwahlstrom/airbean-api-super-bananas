const { Router } = require('express'); 
const router = Router();

const { checkIfAccountsExists } = require('../model/accounts');
const { createOrder, getOrder } = require('../model/orders');

function compareTime(timeOfFetch, result) {
    let fetchMinutes = Number(timeOfFetch.slice(0, 2)) * 60 + Number(timeOfFetch.slice(3, 5));
    let fetchSeconds = Number(timeOfFetch.slice(6, 8)) + (fetchMinutes * 60);

    for (let i = 0; result.length > i; i++) {
        let minutes = Number(result[i].timeOfOrder.slice(0, 2)) * 60 + Number(result[i].timeOfOrder.slice(3, 5));
        let seconds = Number(result[i].timeOfOrder.slice(6, 8)) + (minutes * 60);
        let etaSeconds = result[i].ETATime * 60;

        let orderTimeDiff = fetchSeconds - seconds;
        console.log(orderTimeDiff, etaSeconds);
        if (orderTimeDiff > 0 && orderTimeDiff < etaSeconds) {
            result[i]["orderStatus"] = true;
        } else {
            result[i]["orderStatus"] = false;
        }
    }
    return result;
}
function generateNumber() {
    let randomNumber = Math.random().toString(36).slice(-8);
    return randomNumber;
}
function generateEtaTime() {
    let randomNumber = Math.floor(Math.random() * (20 - 10 + 1) + 10);
    return randomNumber;
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
    const ETATime = generateEtaTime();
    const orderNumber = generateNumber();
    const calTotal = calculateTotal(order);
    const timeOfOrder = new Date().toLocaleTimeString();

    order["ETATime"] = ETATime;
    order["timeOfOrder"] = timeOfOrder;
    order["username"] = accountName;
    order["ordernumber"] = orderNumber;
    order["total"] = calTotal;

    createOrder(order)

    
    const resObj = {
        success: true,
        ETATIME: order,
        orderNumber: orderNumber
    }

    res.json(resObj);
})

router.get('/:id', async (req, res) => {
    const order = req.params.id;
    const result = await getOrder(order);
    const timeOfFetch = new Date().toLocaleTimeString();
    let checkedtime = compareTime(timeOfFetch, result)
    const finishedOrders = checkedtime.filter((order) => {
        return order.orderStatus == false
    });
    const activeOrders = checkedtime.filter((order) => {
        return order.orderStatus == true
    });
    const allOrders = [];
    let sum = 0;
    for (let i = 0; result.length > i; i++) {
        let current = delete result[i].items;
        allOrders.push(current)
        sum += result[i].total;
    }
    const resObj = {
        success: false
    }

    if (result.length > 0) {
        resObj.success = true;
        resObj.finishedOrders = finishedOrders;
        resObj.activeOrders = activeOrders;
        resObj.totalSpend = sum;
        resObj.timeNow = timeOfFetch;
    }

    res.json(resObj);
})


module.exports = router;