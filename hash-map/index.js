import HashMap from "./hashMap.js";

const test = new HashMap();

test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");

test.set("apple", "green");
test.set("grape", "green");
test.set("ice cream", "brown");

test.set('moon', 'silver')

test.set("jacket", "black");
test.set("hat", "white")

console.log("Get hat(white): ",test.get("hat"))
console.log("Has apple(green)", test.has("apple"))
console.log("Length: ", test.length())
console.log("Remove carrot(orange)", test.remove("carrot"))
console.log("Length: ", test.length())
console.log("Clear", test.clear())
console.log("Keys", test.keys())
console.log("Values", test.values())

console.log(test.entries());
console.log("Capacity: ", test.capacity);
console.log("Length: ", test.length());
