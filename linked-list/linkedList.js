import Node from "./node.js";

export default class LinkedList {
    constructor() {
        this._head = null;
        this._tail = null;
    }

    append(value) {
        if (this._head === null) {
            const newNode = new Node(value, null);
            this._head = newNode;
            this._tail = newNode;
        } else {
            const newNode = new Node(value, null);
            this._tail.nextNode = newNode;
            this._tail = newNode;
        }
    }

    prepend(value) {
        if (this._head === null) {
            const newNode = new Node(value, null);
            this._head = newNode;
            this._tail = newNode;
        } else {
            const newNode = new Node(value, this._head);
            this._head = newNode;
        }
    }

    size() {
        if (this._head === null) return 0;
        let counter = 1;
        let temp = this._head;
        while (temp.nextNode !== null) {
            temp = temp.nextNode;
            counter++;
        }
        return counter;
    }

    head() {
        return this._head;
    }

    tail() {
        return this._tail;
    }

    // Return node at given index
    at(index) {
        if (index >= this.size()) return null;
        let curr = this._head;
        for (let i = 0; i < this.size(); i++) {
            if (index === i) return curr;
            else {
                curr = curr.nextNode;
            }
        }
    }

    pop() {
        if (this.size() > 1) {
            this._tail = this.at(this.size() - 2);
            this._tail.nextNode = null;
        } else {
            this._head = null;
            this._tail = null;
        }
    }

    // Returns node which contains a given value
    contains(value) {
        let curr = this._head;
        while (curr !== null) {
            if (curr.value === value) return true;
            else {
                curr = curr.nextNode;
            }
        }
        return false;
    }

    // Returns index of a node with the given value
    find(value) {
        let index = 0;
        let curr = this._head;
        while (curr !== null) {
            if (curr.value === value) return index;
            else {
                curr = curr.nextNode;
                index++;
            }
        }
        return null;
    }

    toString() {
        let str = "";
        let curr = this._head;
        while (curr !== null) {
            str = str.concat(`( ${curr.value} ) -> `);
            curr = curr.nextNode;
        }

        return str.concat("null");
    }

    insertAt(value, index) {
        if (index >= this.size() || index < 0) return null;
        if (index >= 1) {
            const newNode = new Node(value, this.at(index));
            this.at(index - 1).nextNode = newNode;
        } else {
            const newNode = new Node(value, this.at(0));
            this._head = newNode;
        }
    }

    removeAt(index) {
        const len = this.size();
        if (index >= len || index < 0) return null;

        if (index >= 1) {
            const prevNode = this.at(index - 1);
            const toDeleteNode = this.at(index);
            if (index === len - 1) this._tail = prevNode;
            prevNode.nextNode = toDeleteNode.nextNode;
            toDeleteNode.nextNode = null;
        } else {
            const toDeleteNode = this.at(index);
            this._head = toDeleteNode.nextNode;
            if (len === 1) this._tail = null;
            toDeleteNode.nextNode = null;
        }
    }
}
