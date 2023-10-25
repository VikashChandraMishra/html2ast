const { Stack, AST } = require('./DS');

const tagStack = new Stack();
const contentStack = new Stack();

const startTagRegex = /(<)\w+(>)/i;
const endTagRegex = /(<\/)\w+(>)/i;

const root = new AST().root;
var cur = root;
var contentFlag = false;

const parse = (html, currentIndex) => {

    for (let i = currentIndex; i < html.length; i++) {

        // push content
        if (contentFlag && html[i] !== '<') {

            contentStack.push(html[i]);
            if (html[i + 1] === '<') {
                contentFlag = false;
                cur.data.content += contentStack.items.join('');
                contentStack.clear();
            }

        } else {

            tagStack.push(html[i]);

            // deal with start tag encounter
            if (tagStack.items.join('').search(startTagRegex) !== -1) {
                childIndex = cur.addChild({ tag: tagStack.items.join(''), content: '' });
                let temp = cur;
                cur = cur.children[childIndex];
                tagStack.clear();
                contentFlag = true;
                i = parse(html, i + 1);
                cur = temp;

            }

            // deal with end tag encounter
            if (tagStack.items.join('').search(endTagRegex) !== -1) {
                tagStack.clear();
                contentFlag = true;
                return (i + 1);
            }
        }

    }

}

const parseWrap = (data, currentIndex) => {
    parse(data, currentIndex);
    console.log(root.children[0].children)
}

module.exports = { parse, parseWrap };