
class Queue {
    constructor() {
      this.items = {};
      this.front = 0;
      this.rear = 0;
    }
    enqueue(item) {
      this.items[this.rear] = item;
      this.rear++;
    }
    dequeue() {
      const item = this.items[this.front];
      delete this.items[this.front];
      this.front++;
      return item;
    }
    peek() {
      return this.items[this.front];
    }
    get size() {
      return this.rear - this.front;
    }
    get list() {
      let l = [];
      for (let i = this.front; i<this.rear; i++) {
        l.push(this.items[String(i)]);
      }
      return l;
    }
}

module.exports = Queue;

