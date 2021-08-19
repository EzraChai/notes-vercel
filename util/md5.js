const crypto = require('crypto');
const { secretKey } = require('../config/default.config');


module.exports = str => {
    return crypto.createHash('md5').update(`${secretKey}${str}`).digest('hex')
}
