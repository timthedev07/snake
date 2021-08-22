export class ListNode {
  value: number;
  next: ListNode | undefined;
  constructor(value: number, next?: ListNode) {
    this.value = value;
    this.next = next;
  }
}

export class LinkedList {
  head: ListNode;
  tail: ListNode;

  constructor(value: number) {
    const node = new ListNode(value);
    this.head = node;
    this.tail = node;
  }
}
