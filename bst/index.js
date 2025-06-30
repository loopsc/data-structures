import BST from "./bst.js";

const arr = [1, 4, 5, 3, 5, 6, 46, 56, 23, 423, 6, 456, 23];

const bst = new BST(arr);
let heightVar = 423;

bst.prettyPrint(bst.root);
console.log("----------------------------------------");

// bst.insert(2)
// bst.deleteItem(56)
// console.log(bst.find(423))
// bst.levelOrder((num) => num+1)
// bst.preOrder((num) => num+1)
// bst.inOrder((num) => num+1)
// bst.postOrder((num) => num+1)
// console.log(`Height of ${heightVar}: `, bst.height(heightVar));

// bst.prettyPrint(bst.root)
