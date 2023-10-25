class Node {

    constructor(data) {
        this.data = data;
        this.children = [];
    }

    addChild(data) {
        this.children.push(new Node(data));
        return (this.children.length - 1);
    }

    removeChild(data) {
        this.children = this.children.filter((node) => {
            return node.data !== data;
        });
    }

}


class AST {

    constructor(rootData) {
        this.root = null || new Node(rootData);
    }

}

class Stack {
    constructor() {
        this.items = [];
    }

    push(element) {
        this.items.push(element);
    }

    pop() {
        if (this.isEmpty()) {
            return "Stack is empty";
        }
        return this.items.pop();
    }

    peek() {
        if (this.isEmpty()) {
            return "Stack is empty";
        }
        return this.items[this.items.length - 1];
    }

    isEmpty() {
        return this.items.length === 0;
    }

    size() {
        return this.items.length;
    }

    clear() {
        this.items = [];
    }
}

module.exports = { Node, AST, Stack };