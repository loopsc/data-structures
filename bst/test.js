import BST from "./bst.js";

const arr = [];
while (arr.length <= 100) {
    arr.push(Math.floor(Math.random() * 100));
}

const bst = new BST(arr);
bst.prettyPrint();

// console.log("Is tree balanced? ", bst.isBalanced());
// bst.levelOrder(logNumber);
// bst.preOrder(logNumber);
// bst.inOrder(logNumber);
// bst.postOrder(logNumber);

for (let i = 101; i <= 110; i++) {
    bst.insert(i);
}
console.log("Is tree balanced? ", bst.isBalanced());
console.log("Balancing tree...");
bst.rebalance();
console.log("Is tree balanced? ", bst.isBalanced());
// bst.levelOrder(logNumber);
// bst.preOrder(logNumber);
bst.inOrder(logNumber);
// bst.postOrder(logNumber);

function logNumber(num) {
    console.log(num);
}
