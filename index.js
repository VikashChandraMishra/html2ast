const fs = require('fs');
const { parseWrap } = require('./parse');

fs.readFile('./index.html', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    parseWrap(data, 0);
});