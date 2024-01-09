export default class Item {
  constructor(name, quantity, price) {
    this.name = name;
    this.quantity = quantity;
    this.price = price;
  }

  setName(name) {
    this.name = name;
  }

  getName() {
    return this.name;
  }

  setQuantity(quantity) {
    this.quantity = quantity;
  }

  getQuantity() {
    return this.quantity;
  }

  setPrice(price) {
    this.price = price;
  }

  getPrice() {
    return this.price;
  }
}