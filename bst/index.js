import BST from "./bst.js";

const arr = [1,4,5,3,5,6,46,56,23,423,6,456,23]

const bst = new BST(arr)

bst.prettyPrint(bst.root)
console.log("----------------------------------------")


bst.insert(2)
bst.deleteItem(5)

bst.prettyPrint(bst.root)