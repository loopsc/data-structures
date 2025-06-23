import LinkedList from "./linkedList.js";

export default class HashMap {
    constructor() {
        this._loadFactor = 0.75;
        this._capacity = 16;
        this._hashArr = Array(this._capacity).fill(null);
        this._size = 0;
    }

    get capacity() {
        return this._capacity;
    }

    hash(key) {
        let hashCode = 0;

        const primeNumber = 31;

        for (let i = 0; i < key.length; i++) {
            hashCode =
                (primeNumber * hashCode + key.charCodeAt(i)) % this._capacity;
        }
        return hashCode;
    }

    set(key, value) {
        this.#insertToBucket(this._hashArr, key, value);

        // Check if capacity needs to be doubled
        //prettier-ignore
        const capacityNeeded = this._size > this._capacity * this._loadFactor ? true : false;

        if (capacityNeeded) {
            this.#increaseCapacity();
        }
    }

    get(key) {
        const hashCode = this.hash(key);
        const bucket = this._hashArr[hashCode];
        if (bucket !== null) {
            let curr = bucket.head();
            while (curr !== null) {
                if (curr.key === key) return curr.value;
                curr = curr.nextNode;
            }
        }
        return null;
    }

    has(key) {
        if (this.get(key) !== null) return true;
        return false;
    }

    remove(key) {
        const hashCode = this.hash(key);
        const bucket = this._hashArr[hashCode];
        if (bucket !== null) {
            let curr = bucket.head();
            for (let i = 0; i < bucket.size(); i++) {
                if (curr.key === key) {
                    bucket.removeAt(i);
                    this._size--;
                    return true;
                }
                curr = curr.nextNode;
            }
            return false;
        }
    }

    // length() {
    //     let counter = 0;
    //     for (let i = 0; i < this._capacity; i++) {
    //         if (this._hashArr[i] !== null) {
    //             counter += this._hashArr[i].size();
    //         }
    //     }
    //     return counter;
    // }

    length() {
        return this._size;
    }

    clear() {
        for (let i = 0; i < this._capacity; i++) {
            if (this._hashArr[i] !== null) {
                while (this._hashArr[i].head() !== null) {
                    this._hashArr[i].pop();
                }
            }
        }
        this._size = 0
    }

    keys() {
        const keysArr = [];
        for (let i = 0; i < this._capacity; i++) {
            if (this._hashArr[i] !== null) {
                let curr = this._hashArr[i].head();
                while (curr !== null) {
                    keysArr.push(curr.key);
                    curr = curr.nextNode;
                }
            }
        }
        return keysArr;
    }

    values() {
        const valuesArr = [];
        for (let i = 0; i < this._capacity; i++) {
            if (this._hashArr[i] !== null) {
                let curr = this._hashArr[i].head();
                while (curr !== null) {
                    valuesArr.push(curr.value);
                    curr = curr.nextNode;
                }
            }
        }
        return valuesArr;
    }

    entries() {
        const entriesArr = [];
        for (let i = 0; i < this._capacity; i++) {
            if (this._hashArr[i] !== null) {
                // Curr is the first node of the linked list
                let curr = this._hashArr[i].head();
                while (curr !== null) {
                    let pairArr = [];
                    pairArr.push(curr.key, curr.value);
                    entriesArr.push(pairArr);
                    curr = curr.nextNode;
                }
            }
        }
        return entriesArr;
    }

    /**
     * Double the capacity of the array and rehash all values
     */
    #increaseCapacity() {
        // Create a new hash map to hold all variables temporarily
        const tempHashArr = new Array(this._capacity * 2).fill(null);

        // Also increase the capacity of the initialArray
        // hash function hashes against the capacity of the initial array,
        // so it also needs to be doubled.
        this._capacity = this._capacity * 2;

        // Iterating over the first (smaller) array
        for (let i = 0; i < this._hashArr.length; i++) {
            // Bucket found at arr index i
            if (this._hashArr[i] !== null) {
                // iterate through the linked list
                // and rehash each node
                let curr = this._hashArr[i].head(); //curr is the first node in the bucket
                while (curr !== null) {
                    this.#insertToBucket(
                        tempHashArr,
                        curr.key,
                        curr.value,
                        false
                    );
                    curr = curr.nextNode;
                }
            }
        }
        this._hashArr = tempHashArr;
    }

    /**
     *
     * @param {Array} arr Array of Linked Lists
     * @param {Number} key Key of key-value pair
     * @param {String} value Value of key-value pair
     * @param {Boolean} addMode Are we adding a new entry or rehashing?
     */
    #insertToBucket(arr, key, value, addMode = true) {
        let hashCode = this.hash(key);

        // If there is a bucket at the given hashcode
        if (arr[hashCode] !== null) {
            const bucket = arr[hashCode]; //linked-list object
            const nodeIndex = bucket.keyFind(key); //index of node inside linked-list

            // nodeIndex will be null if a key match is not found
            // So entry with identical key is found
            if (nodeIndex !== null) {
                const node = bucket.at(nodeIndex);
                node.value = value;
            } else {
                bucket.append(key, value);
                if (addMode) {
                    this._size++;
                }
            }
        } else {
            //No bucket found
            const bucket = new LinkedList();
            arr[hashCode] = bucket;
            bucket.append(key, value);
            if (addMode) {
                this._size++;
            }
        }
    }

    test() {
        console.log(this._hashArr);
    }
}
