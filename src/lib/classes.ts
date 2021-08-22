export interface NodeValue {
  row: number;
  col: number;
  cell: number;
}

export class ListNode {
  value: NodeValue;
  next: ListNode | undefined;
  constructor(value: NodeValue, next?: ListNode) {
    this.value = value;
    this.next = next;
  }
}

export class LinkedList {
  head: ListNode;
  tail: ListNode;

  constructor(value: NodeValue) {
    const node = new ListNode(value);
    this.head = node;
    this.tail = node;
  }
}
