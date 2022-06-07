const { Router } = require('express'); 
const router = Router();
const { getMenu, addMenu } = require('../model/menu');

let menu = [        
    {"id":1,"title":"Bryggkaffe","desc":"Bryggd på månadens bönor.","price":39},
    {"id":2,"title":"Caffè Doppio","desc":"Bryggd på månadens bönor.","price":49},
    {"id":3,"title":"Cappuccino","desc":"Bryggd på månadens bönor.","price":49},
    {"id":4,"title":"Latte Macchiato","desc":"Bryggd på månadens bönor.","price":49},
    {"id":5,"title":"Kaffe Latte","desc":"Bryggd på månadens bönor.","price":54},
    {"id":6,"title":"Cortado","desc":"Bryggd på månadens bönor.","price":39}
]

router.get('/', async (req, res) => {
    const result = await getMenu();

    const resObj = {success: false}
    console.log(result)
    if (result) {
        resObj.success = true;
        resObj.menu = result
    }
    res.json(resObj);
})

async function checkMenu() {
    const result = await getMenu();

    if (result.length > 0) {
        
    } else {
        addMenu(menu);
    }
}

checkMenu();
module.exports = router;