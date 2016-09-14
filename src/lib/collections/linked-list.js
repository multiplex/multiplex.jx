import Collection from './collection';
import Iterable from '../iteration/Iterable';
import LinkedListNode from './linked-list-node';
import buffer from '../utils/buffer';
import bufferTo from '../utils/buffer-to';
import assertType from '../utils/assert-type';
import {runtimeEquals} from '../runtime/runtime';
import error, {ERROR_EMPTY_COLLECTION} from '../utils/error';

/**
* Represents a doubly linked list.
*/
export default class LinkedList extends Collection {
    /**
    * Initializes a new instance of the LinkedList class that that is empty or contains elements copied from the specified collection.
    * @param {Iterable=} collection The collection to copy elements from.
    */
    constructor(collection = null) {
        super();
        this.size = 0;
        this.head = null;

        if (collection) {
            let arr = buffer(collection);
            for (let i = 0, len = arr.length; i < len; i++) {
                this.addLast(arr[i]);
            }
        }
    }

    /**
    * Adds an item to the LinkedList.
    * @param {Object} item The object to add to the LinkedList.
    */
    add(item) {
        this.addLast(item);
    }

    /**
    * Removes all nodes from the LinkedList.
    */
    clear() {
        while (this.head !== null) {
            let temp = this.head;
            this.head = this.head.next();   // use next() the instead of "_next", otherwise it will loop forever
            temp._list = null;
            temp._next = null;
            temp._prev = null;
        }

        this.head = null;
        this.size = 0;
    }

    /**
    * Gets the number of elements contained in the LinkedList.
    * @returns {Number}
    */
    count() {
        return this.size;
    }

    /**
    * Determines whether a value is in the LinkedList.
    * @param {Object} value The value to locate in the LinkedList.
    * @returns {Boolean}
    */
    contains(item) {
        return this.find(item) !== null;
    }

    /**
    * Copies the entire LinkedList to a compatible one-dimensional Array, starting at the specified index of the target array.
    * @param {Array} array The one-dimensional Array that is the destination of the elements copied from LinkedList.
    * @param {Number} arrayIndex The zero-based index in array at which copying begins.
    */
    copyTo(array, arrayIndex) {
        bufferTo(this, array, arrayIndex);
    }

    /**
    * Gets the first node of the LinkedList.
    * @returns {LinkedListNode}
    */
    getFirst() {
        return this.head;
    }

    /**
    * Gets the last node of the LinkedList.
    * @returns {LinkedListNode}
    */
    getLast() {
        let head = this.head;
        return head === null ? null : head._prev;
    }

    /**
    * Adds the specified new node after the specified existing node in the LinkedList.
    * @param {LinkedListNode} node The LinkedListNode after which to insert newNode.
    * @param {LinkedListNode|Object} value The value or the LinkedListNode to add to the LinkedList.
    * @returns {LinkedListNode}
    */
    addAfter(node, value) {
        assertType(node, LinkedListNode);

        let newNode;

        if (value instanceof LinkedListNode) {
            newNode = value;
            this.insertNodeBefore(node._next, newNode);
        }
        else {
            newNode = new LinkedListNode(value);
            this.addAfter(node, newNode);
        }

        return newNode;
    }

    /**
    * Adds the specified new node before the specified existing node in the LinkedList.
    * @param {LinkedListNode} node The LinkedListNode before which to insert newNode.
    * @param {LinkedListNode|Object} value The value or the LinkedListNode to add to the LinkedList.
    * @returns {LinkedListNode}
    */
    addBefore(node, value) {
        assertType(node, LinkedListNode);

        var newNode;

        if (value instanceof LinkedListNode) {
            newNode = value;
            this.insertNodeBefore(node, newNode);
            if (node === this.head) {
                this.head = newNode;
            }
        }
        else {
            newNode = new LinkedListNode(value);
            this.addBefore(node, newNode);
        }

        return newNode;
    }

    /**
    * Adds the specified new node at the start of the LinkedList.
    * @param {LinkedListNode|Object} value The value or the LinkedListNode to add at the start of the LinkedList.
    * @returns {LinkedListNode}
    */
    addFirst(value) {
        let node;

        if (value instanceof LinkedListNode) {
            node = value;
            validateNode(node);

            if (this.head === null) {
                this.insertNodeToEmptyList(node);
            }
            else {
                this.insertNodeBefore(this.head, node);
                this.head = node;
            }
        }
        else {
            node = new LinkedListNode(value);
            this.addFirst(node);
        }

        return node;
    }

    /**
    * Adds the specified new node at the end of the LinkedList.
    * @param {LinkedListNode|Object} value The value or the LinkedListNode to add at the end of the LinkedList.
    * @returns {LinkedListNode}
    */
    addLast(value) {
        let node;

        if (value instanceof LinkedListNode) {
            node = value;
            validateNode(node);

            if (this.head === null) {
                this.insertNodeToEmptyList(node);
            }
            else {
                this.insertNodeBefore(this.head, node);
            }
        }
        else {
            node = new LinkedListNode(value);
            this.addLast(node);
        }

        return node;
    }

    /**
    * Finds the first node that contains the specified value.
    * @param {Object} value The value to locate in the LinkedList.
    * @returns {LinkedListNode}
    */
    find(value) {
        let node = this.head;

        if (node !== null) {
            if (value !== null) {
                do {
                    if (runtimeEquals(node._value, value)) {
                        return node;
                    }
                    node = node._next;
                }
                while (node !== this.head);
            }
            else {
                do {
                    if (node._value === null) {
                        return node;
                    }

                    node = node._next;
                }
                while (node !== this.head);
            }
        }

        return null;
    }

    /**
    * Finds the last node that contains the specified value.
    * @param {Object} value The value to locate in the LinkedList.
    * @returns {LinkedListNode}
    */
    findLast(value) {
        if (this.head === null) {
            return null;
        }

        let last = this.head._prev,
            node = last;

        if (node !== null) {
            if (value !== null) {
                do {
                    if (runtimeEquals(node._value, value)) {
                        return node;
                    }

                    node = node._prev;
                }
                while (node !== last);
            }
            else {
                do {
                    if (node._value === null) {
                        return node;
                    }

                    node = node._prev;
                }
                while (node !== last);
            }
        }

        return null;
    }

    /**
    * Removes Removes the specified node or the first occurrence of the specified value from the LinkedList.
    * @param {LinkedListNode|Object} value The LinkedListNode or the value to remove from the LinkedList.
    * @returns {Boolean}
    */
    remove(value) {
        let node;

        if (value instanceof LinkedListNode) {
            node = value;
            validateNode(node, this);

            if (node._next === node) {
                this.head = null;
            }
            else {
                node._next._prev = node._prev;
                node._prev._next = node._next;

                if (this.head === node) {
                    this.head = node._next;
                }
            }
            node._list = null;
            node._next = null;
            node._prev = null;
            this.size--;

            return true;
        }
        else {
            if ((node = this.find(value)) !== null) {
                this.remove(node);
                return true;
            }
            return false;
        }
    }

    /**
    * Removes the node at the start of the LinkedList.
    */
    removeFirst() {
        if (this.head === null) {
            error(ERROR_EMPTY_COLLECTION);
        }

        this.remove(this.head);
    }

    /**
    * Removes the node at the end of the LinkedList.
    */
    removeLast() {
        if (this.head === null) {
            error(ERROR_EMPTY_COLLECTION);
        }

        this.remove(this.head._prev);
    }

    insertNodeBefore(node, newNode) {
        assertType(node, LinkedListNode);
        assertType(newNode, LinkedListNode);

        validateNode(newNode);
        validateNode(node, this);

        newNode._list = this;
        newNode._next = node;
        newNode._prev = node._prev;

        node._prev._next = newNode;
        node._prev = newNode;
        this.size++;
    }

    insertNodeToEmptyList(newNode) {
        assertType(newNode, LinkedListNode);
        validateNode(newNode);

        newNode._list = this;
        newNode._next = newNode;
        newNode._prev = newNode;

        this.head = newNode;
        this.size++;
    }

    get [Symbol.toStringTag]() {
        return 'LinkedList';
    }

    toString() {
        return '[LinkedList]';
    }

    /**
    * Returns an iterator that iterates through the collection.
    * @returns {Iterator}
    */
    [Symbol.iterator]() {
        let head = this.head,
            node = head;

        return new Iterable(function* () {
            while (node !== null) {
                let current = node._value;

                node = node._next;
                if (node === head) {
                    node = null;
                }

                yield current;
            }
        });
    }
}


function validateNode(node, list) {
    if ((list === null && node._list !== null) || node._list !== list) {
        error('Invalid node list.');
    }
}
