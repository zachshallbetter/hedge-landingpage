'use strict';

let myDebug = process.env.NODE_ENV === 'development',
    myBaseUrl;

switch (process.env.NODE_ENV) {
    case 'production':
        myBaseUrl = 'https:/www.hedgeformac.com';
        break;

    case 'staging':
        myBaseUrl = 'https://staging.hedgeformac.com';
        break;

    case 'development':
    default:
        myBaseUrl = 'http://hedgeformac.dev';
        break;
}

const ENV = {
    debug: myDebug,
    baseUrl: myBaseUrl,
};

export default ENV;
