
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
    deleteItem(index) {
      let cutoff = this.front+index;
      let new_items = {};
      for (const [key, value] of Object.entries(this.items)) {
        if (key < cutoff) {
          new_items[key] = value;
        }
        else if (key > cutoff) {
          new_items[key-1] = value;
        }
      }
      this.items = new_items;
      this.rear--;
    }
    editItem(index, val) {
      this.items[this.front+index] = val;
    }
}

module.exports = Queue;

