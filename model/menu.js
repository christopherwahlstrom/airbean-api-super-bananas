const nedb = require('nedb-promise');
const database = new nedb({ filename: 'menu.db', autoload: true });

async function getMenu() {
    return await database.find({}); 
}

async function addMenu(menu) {
    const result = await database.insert(menu);
    return result
}

async function addProduct(product) {
    const responce = await database.find({title: product.title});
    console.log(responce)
    if (responce.length > 0) {
        const result = false;
        return result
    } else {
        return await database.insert(product)
    }
}

async function deleteProduct(product) {
    const responce = await database.find(
        { $and: [{ id: product.id }, { title: product.title }] 
    });
    console.log(responce)
    if (responce.length === 1) {
        return await database.remove({id: product.id})
    } else {
        const result = false;
        return result
    }
}

module.exports = { getMenu, addMenu, addProduct, deleteProduct };