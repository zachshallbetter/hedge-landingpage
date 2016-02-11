'use strict';

import config from '../../config.yml';
console.log(`Running ${process.env.NODE_ENV} version`);

export default config[process.env.NODE_ENV];
