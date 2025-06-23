# Data Structures

## Linked List
### Description
Implementation of a singly linked list. Each node stores a value and a pointer to the next node. The list tracks both the head (first node) and tail (last node).
### Time complexity
- Insertion/Removal at head or tail: O(1)
- Insertion/Removal at arbitrary position or by value: O(n)
- Access by index: O(n)
### Space complexity
- O(n) linear growth as each new data creates an additional node.
### Status
Completed

## HashMap
### Description
Implementation of a basic hash map using an array of buckets and separate chaining to handle collisions. Each key is hashed to an index, and collisions are stored as a linked list at that index. Supports typical map operations like set, get, delete, and has. Hashmap doubles capacity if size exceeds the `capacity * load-factor`.

### Time Complexity
- Average Case:
  - Insertion: O(1)
  - Lookup: O(1)
  - Deletion: O(1)
- Worst Case (many collisions):
  - Insertion: O(n)
  - Lookup: O(n)
  - Deletion: O(n)

### Space Complexity
- O(n + k) — where `n` is number of key-value pairs, and `k` is the size of the bucket array.

### Status
Completed

## Binary Search Tree (BST)
### Description
Implementation of a Binary Search Tree where each node contains a value and pointers to left and right child nodes. The BST maintains the property that left subtree nodes have smaller values and right subtree nodes have larger values, enabling efficient search, insertion, and deletion operations.

### Time Complexity
- Average Case (balanced tree):
  - Search: O(log n)
  - Insertion: O(log n)
  - Deletion: O(log n)
- Worst Case (unbalanced tree):
  - Search: O(n)
  - Insertion: O(n)
  - Deletion: O(n)

### Space Complexity
- O(n) — linear space proportional to the number of nodes stored.

### Status
Completed


