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
        } else if (value === root.data) {
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
        return root;
    }

    /**
     *
     * @param {Number} value Data of the node to find
     * @param {Node} [root] Optional. Root node.
     * @returns Node object containing the value passed as argument
     */
    find(value, root = this.root) {
        if (root === null) return;
        if (value === root.data) return root;
        else if (value < root.data) {
            return this.find(value, root.left);
        } else if (value > root.data) {
            return this.find(value, root.right);
        }
    }

    // TODO: Maybe do a recursive version
    levelOrder(callback) {
        if (typeof callback !== "function")
            throw new Error("User must provide a function as an argument");
        const queue = [];
        queue.push(this.root);
        while (queue.length !== 0) {
            // Remove the first element from queue
            let curr = queue.shift();

            // Process the node
            callback(curr.data);

            // Push its children if they exist
            if (curr.left !== null) queue.push(curr.left);
            if (curr.right !== null) queue.push(curr.right);
        }
    }

    preOrder(callback, node = this.root) {
        if (typeof callback !== "function")
            throw new Error("User must provide a function as an argument");

        if (node === null) return;

        callback(node.data);

        this.preOrder(callback, node.left);
        this.preOrder(callback, node.right);
    }

    inOrder(callback, node = this.root) {
        if (typeof callback !== "function")
            throw new Error("User must provide a function as an argument");

        if (node === null) return;

        this.inOrder(callback, node.left);
        callback(node.data);

        this.inOrder(callback, node.right);
    }

    postOrder(callback, node = this.root) {
        if (typeof callback !== "function")
            throw new Error("User must provide a function as an argument");
        if (node === null) return;

        this.postOrder(callback, node.left);
        this.postOrder(callback, node.right);
        callback(node.data);
    }

    #calcHeight(value, height, node = this.root) {
        if (!node) return -1;

        const leftHeight = this.#calcHeight(value, height, node.left);
        const rightHeight = this.#calcHeight(value, height, node.right);

        let nodeHeight = Math.max(leftHeight, rightHeight) + 1;

        if (node.data === value) height.value = nodeHeight;

        return nodeHeight;
    }

    height(value) {
        let height = { value: null };

        this.#calcHeight(value, height, this.root);
        return height.value;
    }

    depth(value, node = this.root) {
        if (!node) return null;

        let counter = null;

        if (node.data === value) {
            return 0;
        }

        counter = this.depth(value, node.left);
        if (counter !== null) {
            return counter + 1;
        }

        counter = this.depth(value, node.right);
        if (counter !== null) {
            return counter + 1;
        }

        return null;
    }

    #calcBalance(node = this.root) {
        if (node === null) return 0;

        let leftHeight = this.#calcBalance(node.left);
        let rightHeight = this.#calcBalance(node.right);

        if (
            leftHeight === -1 ||
            rightHeight === -1 ||
            Math.abs(leftHeight - rightHeight) > 1
        ) {
            return -1;
        }

        return Math.max(leftHeight, rightHeight) + 1;
    }

    isBalanced() {
        return this.#calcBalance() !== -1
    }

    #toArr(node = this.root, arr = []) {
        if (node === null) return arr

        this.#toArr(node.left, arr)
        arr.push(node.data)
        this.#toArr(node.right, arr)

        return arr
    }

    rebalance() {
        const newArr = this.#toArr()
        this.root = this.buildTree(newArr, 0, newArr.length - 1)
    }

    prettyPrint(node = this.root, prefix = "", isLeft = true) {
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

// height(value, node = this.root) {
//     if (node === null) return -1;

//     let leftHeight = this.height(value, node.left);
//     if (typeof leftHeight === "object") return leftHeight;

//     let rightHeight = this.height(value, node.right);
//     if (typeof rightHeight === "object") return rightHeight;

//     let ans = Math.max(leftHeight, rightHeight) + 1;

//     // If we have bubbled back up but the root is not our data value
//     if (node === this.root && node.data !== value) {
//         if (typeof leftHeight !== "object") return rightHeight.height;
//         else if (typeof rightHeight !== "object") return leftHeight.height;
//         // If we have bubbled back up and the root is our data value
//     } else if (node === this.root && node.data === value) {
//         return ans;
//         // If the value does not exist
//     } else {
//         return null;
//     }

//     if (node.data === value) return { height: ans };
//     else {
//         return ans;
//     }
// }
