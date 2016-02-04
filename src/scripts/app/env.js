'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

let myEndpoint;

// Set endpoint according development enviroment
switch (process.env.NODE_ENV) {
    case 'development':
        break;

    case 'staging':
        break;

    case 'production':
        break;
}

// Create enviroment properties
const env = {
    debug: process.env.NODE_ENV === 'development',
};

export default env;
