'use strict';

const PROCESS = process;

let myDebug = PROCESS.env.NODE_ENV === 'development',
    myBaseUrl;

switch (PROCESS.env.NODE_ENV) {
    case 'production':
        myBaseUrl = 'http:/www.hedgeformac.com';
        break;

    case 'staging':
        myBaseUrl = 'http://staging.hedgeformac.com';
        break;

    default:
    case 'development':
        myBaseUrl = 'http://hedgeformac.dev';
        break;
}

const ENV = {
    debug: myDebug,
    baseUrl: myBaseUrl,
};

export default ENV;
