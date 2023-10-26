const { Stack, AST } = require('./DS');
const { extractAttributes } = require('./helpers');

const tagStack = new Stack();
const contentStack = new Stack();

// with attributes
const startTagRegex = /<[^>/]+>/i;

// without attributes
// const startTagRegex = /(<)\w+(>)/i;

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

                const { tag, attributes } = extractAttributes(tagStack.items.join(''));

                childIndex = cur.addChild({
                    tag: tag,
                    content: '',
                    attributes: attributes
                });

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
    return root;
}

module.exports = { parseWrap };