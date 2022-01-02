// @ts-nocheck
const fs = require('fs');
const package = require('../build/package.json');

package['main'] = 'electron/main.js';

fs.writeFileSync('./build/package.json', JSON.stringify(package,  null, '\t'));