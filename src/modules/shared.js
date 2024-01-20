export default class Shared {

  constructor(name, items) {
    this.name = name;
    this.items = items;
  }

  setName(name) {
    this.name = name;
  }

  getName() {
    return this.name;
  }

  setItems(items) {
    this.items = items;
  }

  getItems() {
    return this.items;
  }

  addItem(item) {
    this.items.push(item);
  }

  deleteItem(itemName) {
    this.items = this.items.filter((item) => item.name !== itemName);
  }
}