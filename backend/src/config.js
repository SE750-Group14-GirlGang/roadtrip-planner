const dotenv = require('dotenv');

const result = dotenv.config({ path: '../.env' });

const { parsed: envs } = result;
module.exports = envs;
