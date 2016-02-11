'use strict';

let myInfo = require('../../.env.json'),
    myNodeEnv = process.env.NODE_ENV;

export default myInfo[myNodeEnv];
