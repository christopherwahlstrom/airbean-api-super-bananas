const nedb = require('nedb-promise');
const database = new nedb({ filename: 'menu.db', autoload: true });

async function getMenu() {
    return await database.find({}); 
}

async function addMenu(menu) {
    const result = await database.insert(menu);
    return result
}

module.exports = { getMenu, addMenu };