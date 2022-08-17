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
 * insertAt(value, index)
 * removeAt(index)
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
  head: null | NodeElement;
  size: number;
  constructor() {
    this.head = null;
    this.size = 0;
  }
  incrementSize() {
    this.size = this.size + 1;
  }
  decrementSize() {
    this.size = this.size - 1;
  }
  getTail() {
    let tail: any = this.head;
    while (tail!.next) {
      tail = tail?.next;
    }
    return tail;
  }
  append(value: any) {
    const newNode = new NodeElement(value);
    if (this.head === null) {
      this.incrementSize();
      return (this.head = newNode);
    } else {
      this.incrementSize();
      const tail = this.getTail();
      tail.next = newNode;
    }
  }
  prepend(value: any) {
    const copy: any = this.head;
    const newNode = { value, next: copy };
    this.incrementSize();
    return (this.head = newNode);
  }
  getSize() {
    console.log(`size: ${this.size}`);
    return this.size;
  }
  getHead() {
    return this.head;
  }
  at(index: number) {
    if (index >= 0 && index <= this.size && this.size > 0) {
      let copy: any = this.head;
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
    let token: boolean = false;
    let copy = this.head;
    while (copy) {
      if (copy.value === value) {
        token = true;
      }
      copy = copy.next;
    }
    return token;
  }
  find(value: any) {
    let copy = this.head;
    while (copy) {
      if (copy.value === value) {
        return copy;
      }
      copy = copy.next;
    }
    return null;
  }
  pop() {
    if (this.head === null) return null;
    if (this.getSize() === 1) {
      const res = this.head;
      this.head = null;
      this.decrementSize();
      return res;
    }
    let currentNode: any = this.head;
    let secondToLastNode: any = this.head;
    while (currentNode.next) {
      secondToLastNode = currentNode;
      currentNode = currentNode.next;
    }
    secondToLastNode.next = null;
    this.decrementSize();
    return currentNode;
  }
  shift() {
    if (this.head === null) return null;
    if (!this.head === null && this!.head?.next) {
      const popNode = this.head;
      this.head = this.head?.next;
      this.decrementSize();
      return popNode;
    }
  }
  insertAt(value: any, index: number) {
    if (this.head === null) return null;
    const checkLegal = this.size >= index && index >= 0 ? true : false;
    if (checkLegal) {
      let fastPointer: any = this.head;
      let slowPointer: any = this.head;
      let count = 1;
      while (count < index) {
        count = count + 1;
        slowPointer = fastPointer;
        fastPointer = fastPointer.next;
      }
      slowPointer.next = new NodeElement(value, fastPointer);
      return this.incrementSize();
    }
  }
  removeAt(index: number) {
    if (this.head === null) return null;
    const checkLegal = this.size >= index && index >= 0 ? true : false;
    if (checkLegal) {
      let fastPointer: any = this.head;
      let slowPointer: any = this.head;
      let count = 1;
      while (count < index) {
        count = count + 1;
        slowPointer = fastPointer;
        fastPointer = fastPointer.next;
      }
      const postList = fastPointer.next;
      slowPointer.next = postList;
      return this.decrementSize();
    }
  }
  logHead() {
    console.log(this.head);
  }
  stringlog() {
    let str = '';
    let copy = this.head;
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
migsList.append(3);
migsList.append(4);
migsList.append(5);
migsList.insertAt(2, 2);
migsList.removeAt(2);
// migsList.removeAt(3);
migsList.stringlog();

/**
 * Notes:
 *
 * ? npx ts-node script.ts to run in console
 *
 *  *count:
 *
 * most methods that require count can start at count = 1
 * IF i am checking head is NOT NULL.
 * if(this.head === null) return null;
 * if(this.size > 0) count can always start at 1;
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
 */
