const nedb = require('nedb-promise');
const database = new nedb({ filename: 'orders.db', autoload: true });

async function createOrder(order) {
    const result = await database.insert(order);
    return result;
}

async function getOrder(order) {
    const result = await database.find({username: order});
    return result;
}

module.exports = { createOrder, getOrder };