const apikeys = [
    '9374925wofhs945kb',
    '9834thjsh92347jhf',
    '984759kjsdkjhr123t',
    'jksdf2085723lj123',
    '2345sdf234sd53453f'
]

function auth(req, res, next) {
    const apikey = req.headers['api-key'];

    if(apikey && apikeys.includes(apikey)){
        next();
    } else {
        const resObj = {
            error: 'invalid api-key'
        }
        res.json(resObj);
    }
}

module.exports = { auth };