'use strict';

import Logdown from 'logdown';
import ConfigInfo from '../../config.yml';

const CONFIG = ConfigInfo[process.env.NODE_ENV];

if (CONFIG.debug) {
    let myLogger = new Logdown({ prefix: 'Config' });
    myLogger.info(`Running \`${process.env.NODE_ENV}\` version`);
} else {
    Logdown.disable('*');
}

export default CONFIG;
