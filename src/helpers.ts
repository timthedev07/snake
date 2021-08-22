import { Cell } from "./ui/App";

export class ListNode {
  value: Cell;
  next: ListNode | undefined;
  constructor(value: Cell, next?: ListNode) {
    this.value = value;
    this.next = next;
  }
}

export class LinkedList {
  head: ListNode;
  tail: ListNode;

  constructor(value: Cell) {
    const node = new ListNode(value);
    this.head = node;
    this.tail = node;
  }
}
