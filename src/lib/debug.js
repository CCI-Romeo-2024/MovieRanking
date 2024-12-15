import env from '@src/env.js';

const debug = (...args) => {
    if (env.DEBUG) {
        console.log(...args);
    }
}

export default debug