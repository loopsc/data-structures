import Node from "./node.js";

export default class BST {
    constructor(arr) {
        const sortedArr = [...new Set(arr)].sort((a, b) => a - b);
        this.root = this.buildTree(sortedArr, 0, sortedArr.length - 1);
    }

    buildTree(arr, start, end) {
        if (start > end) return null;

        let mid = Math.floor((start + end) / 2);
        let root = new Node(arr[mid]);

        root.left = this.buildTree(arr, start, mid - 1);
        root.right = this.buildTree(arr, mid + 1, end);

        return root;
    }

    // Returns the inserted node
    insert(value, root = this.root) {
        if (root === null) {
            return new Node(value);
        }

        // Check for duplication
        if (root.data === value) {
            return root;
        }

        if (value < root.data) {
            root.left = this.insert(value, root.left);
        } else if (value > root.data) {
            root.right = this.insert(value, root.right);
        }

        return root;
    }

    deleteItem(value, root = this.root) {
        if (root === null) return root;

        if (value < root.data) {
            root.left = this.deleteItem(value, root.left);
        } else if (value > root.data) {
            root.right = this.deleteItem(value, root.right);
        } else {
            if (value === root.data) {
                // Case 1: Removing leaf node
                if (root.left === null && root.right === null) {
                    console.log("Case 1");
                    return null;
                }
                // Case 2: Removing parent with 1 child
                else if ((root.left === null) !== (root.right === null)) {
                    console.log("Case 2");
                    if (root.left === null) {
                        return root.right;
                    } else if (root.right === null) {
                        return root.left;
                    }
                }
                // Case 3: Removing parent with 2 children
                else if (root.left !== null && root.right !== null) {
                    console.log("Case 3");
                    // Replace root with left-most leaf of the right subtree.
                    let temp = root.right;
                    while (temp.left !== null) temp = temp.left;
                    root.data = temp.data;
                    root.right = this.deleteItem(temp.data, root.right);
                }
            }
        }
    }

    prettyPrint(node, prefix = "", isLeft = true) {
        if (node === null) {
            return;
        }
        if (node.right !== null) {
            this.prettyPrint(
                node.right,
                `${prefix}${isLeft ? "│   " : "    "}`,
                false
            );
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
        if (node.left !== null) {
            this.prettyPrint(
                node.left,
                `${prefix}${isLeft ? "    " : "│   "}`,
                true
            );
        }
    }
}
