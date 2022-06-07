const { Router } = require('express');
const router = Router();

const { createAccount, compareCredentials, checkIfAccountsExists } = require('../model/accounts');

router.post('/signup', async (req, res) => {
    const credentials = req.body;
    const accountExists = await checkIfAccountsExists(credentials);

    const resObj = {
        success: false
    }

    if (accountExists.length > 0) {
        console.log('nope')
    } else {
        const result = await createAccount(credentials);

        if (result) {
            resObj.success = true;
        }
    }

    res.json(resObj);
})

router.post('/login', async (req, res) => {
    const credentials = req.body;
    const result = await compareCredentials(credentials);

    const resObj = {
        success: false
    }

    if (result.length > 0) {
        resObj.success = true;
    }

    res.json(resObj);
})

module.exports = router;