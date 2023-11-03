const { parseWrap } = require('./parse');

require('fs').readFile('index.html', { encoding: 'utf-8' }, (err, data) => {
    if (err) console.error(error);

    const root = parseWrap(data, 0);
    console.log(root.children[0].children[0].children);

})

module.exports = { parseWrap };