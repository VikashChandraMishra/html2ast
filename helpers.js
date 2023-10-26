const attributeRegex = /(\S+)="([^"]+)"/g;

const extractAttributes = (htmlTag) => {

    let tag = htmlTag.match(/\w+/)[0];
    const attributes = {};

    let match;

    while ((match = attributeRegex.exec(htmlTag)) !== null) {
        const attributeName = match[1];
        const attributeValue = match[2];
        attributes[attributeName] = attributeValue;
    }

    return { tag, attributes };

}


module.exports = { extractAttributes };