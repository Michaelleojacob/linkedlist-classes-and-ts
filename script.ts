/**
 * ?create two classes
 *
 * LinkedList which will represent the full list
 *
 * Node:
 * contains a value
 * link to next node
 * Both are null by default
 *
 * -append(value) add a new node to the end of the list
 * -prepend(value) add a new node to start of list
 * -size returns total number of nodes in the list
 * -head returns the first node in the list
 * -tail returns the tail
 * -at(index) returns the node index
 * -pop removes the last element from the list
 * -contains(value) returns true if the element exists in the list
 * -find(value) returns index of the node containing value/null if not found
 * -toString prints linkedlist as strings
 * -example: (value) -> (value) -> (value) -> null
 *
 * ?extra credit:
 * -insertAt(value, index)
 * -removeAt(index)
 *
 * #extra credit tip:
 * # when you insert or remove a node consider how it will
 * # affect the existing nodes.
 * # some of the nodes will need their nextNode link updated
 */

/**
 *
 */

interface Nodes {
  value: any;
  next: Nodes;
}

class NodeElement {
  value: any;
  next: null | Nodes;
  constructor(v = null, n = null) {
    this.value = v;
    this.next = n;
  }
}

class LinkedList {
  #_head: null | NodeElement;
  #_size: number;
  constructor() {
    this.#_head = null;
    this.#_size = 0;
  }
  private _incrementSize() {
    this.#_size = this.#_size + 1;
  }
  private _decrementSize() {
    this.#_size = this.#_size - 1;
  }
  getTail() {
    let tail: any = this.#_head;
    while (tail!.next) {
      tail = tail?.next;
    }
    return tail;
  }
  append(value: any) {
    const newNode = new NodeElement(value);
    if (this.#_head === null) {
      this._incrementSize();
      return (this.#_head = newNode);
    } else {
      this._incrementSize();
      const tail = this.getTail();
      tail.next = newNode;
    }
  }
  prepend(value: any) {
    const copy: any = this.#_head;
    const newNode = { value, next: copy };
    this._incrementSize();
    return (this.#_head = newNode);
  }
  getSize() {
    return this.#_size;
  }
  getHead() {
    return this.#_head;
  }
  at(index: number) {
    if (index >= 0 && index <= this.#_size && this.#_size > 0) {
      let copy: any = this.#_head;
      let count: number = 1;
      while (count < index) {
        count = count + 1;
        copy = copy.next;
      }
      return copy;
    }
    return console.log(`${index} does not exist in the list`);
  }
  contains(value: any) {
    let copy = this.#_head;
    while (copy) {
      if (copy.value === value) {
        return true;
      }
      copy = copy.next;
    }
    return false;
  }
  find(value: any) {
    let copy = this.#_head;
    while (copy) {
      if (copy.value === value) {
        return copy;
      }
      copy = copy.next;
    }
    return null;
  }
  pop() {
    if (this.#_head === null) return null;
    if (this.getSize() === 1) {
      const res = this.#_head;
      this.#_head = null;
      this._decrementSize();
      return res;
    }
    let currentNode: any = this.#_head;
    let secondToLastNode: any = this.#_head;
    while (currentNode.next) {
      secondToLastNode = currentNode;
      currentNode = currentNode.next;
    }
    secondToLastNode.next = null;
    this._decrementSize();
    return currentNode;
  }
  shift() {
    if (this.#_head === null) return null;
    if (!this.#_head === null && this!.#_head?.next) {
      const popNode = this.#_head;
      this.#_head = this.#_head?.next;
      this._decrementSize();
      return popNode;
    }
  }
  insertAt(value: any, index: number) {
    if (this.#_head === null) return null;
    const checkLegal = this.#_size >= index && index >= 0 ? true : false;
    if (checkLegal) {
      let fastPointer: any = this.#_head;
      let slowPointer: any = this.#_head;
      let count = 1;
      while (count < index) {
        count = count + 1;
        slowPointer = fastPointer;
        fastPointer = fastPointer.next;
      }
      slowPointer.next = new NodeElement(value, fastPointer);
      return this._incrementSize();
    }
  }
  removeAt(index: number) {
    if (this.#_head === null) return null;
    const checkLegal = this.#_size >= index && index >= 0 ? true : false;
    if (checkLegal) {
      let fastPointer: any = this.#_head;
      let slowPointer: any = this.#_head;
      let count = 1;
      while (count < index) {
        count = count + 1;
        slowPointer = fastPointer;
        fastPointer = fastPointer.next;
      }
      const postList = fastPointer.next;
      slowPointer.next = postList;
      return this._decrementSize();
    }
  }
  stringlog() {
    let str = '';
    let copy = this.#_head;
    while (copy) {
      str += copy.value;
      str += ' > ';
      copy = copy.next;
    }
    str += 'null';
    console.log(str);
    return str;
  }
}

const migsList = new LinkedList();
migsList.append(1);
migsList.prepend(75);
migsList.append(3);
migsList.append(4);
migsList.append(5);
migsList.append('hi');
migsList.insertAt(2, 2);
migsList.removeAt(2);
// migsList.removeAt(3);
migsList.stringlog();
// console.log(migsList.contains(1)); // true
// console.log(migsList.contains('hi')); // true
// console.log(migsList.contains('nope')); // false
const checkPop = migsList.pop(); // should be 'hi'
console.log(checkPop); // is 'hi'
migsList.stringlog(); // should no longer include 'hi

/**
 * Notes:
 *
 * ? npx ts-node script.ts to run in console
 *
 *  *count:
 *
 * most methods that require count can start at count = 1
 * IF i am checking head is NOT NULL.
 * if(this.#_head === null) return null;
 * if(this.#_size > 0) count can always start at 1;
 *
 * *pop/insertAt/removeAt:
 *
 * requires slow and fast pointer
 * slow stays a level behind all the time (2-pointer solution)
 * slow = current
 * current = current.next
 *
 * *increment decrement size
 *
 * any method that changes the list should also update size
 *
 * * Should index start at 0?
 *
 * still unsure, in my case index does not. Most time index starts at the first item as 1;
 * linkedlist[0] means it is null
 * linkedlist[1] means it has one item
 * so using index, we start at 1 as well.
 *
 *
 * *copy pointers points to the same place in memory
 *
 * let `copy = this.#_head()` mutating copy will change head.
 * so we can traverse copy, `copy = copy.next`
 * this.#_head still points to the first node
 * and removing from copy also updates the entire list.
 * logging/stringlog will reflect the changes made to the list.
 * Even if I only change copy and not this.#_head.
 */
