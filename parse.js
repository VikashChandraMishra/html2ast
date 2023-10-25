const { Stack, AST } = require('./DS');

const tagStack = new Stack();
const contentStack = new Stack();

const startTagRegex = /(<)\w+(>)/i;
const endTagRegex = /(<\/)\w+(>)/i;

const root = new AST().root;
var cur = root;
var temp;
var contentFlag = false;

const parse = (html, currentIndex) => {

    var index = currentIndex;

    for (let i = index; i < html.length; i++) {

        if (contentFlag) {

            if (html[i + 1] === '<') {
                contentFlag = false;
                cur.data.content += contentStack.items.join('');
                contentStack.clear();
            }
            contentStack.push(html[i]);

        } else {

            tagStack.push(html[i]);
            if (tagStack.items.join('').search(startTagRegex) !== -1) {
                childIndex = cur.addChild({ tag: tagStack.items.join(''), content: '' });
                temp = cur;
                cur = cur.children[childIndex];
                tagStack.clear();
                contentFlag = true;
                i = parse(html, i + 1);
                cur = temp;

            }

            if (tagStack.items.join('').search(endTagRegex) !== -1) {
                tagStack.clear();
                contentFlag = true;
                index = i;
                break;
            }
        }

    }

    return (index + 1);
}

const parseWrap = (data, currentIndex) => {
    parse(data, currentIndex);
    console.log(root.children[0].children[0].children)
}

module.exports = { parse, parseWrap };