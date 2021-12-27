export default class Product {
  constructor({id, title, description, price, quantity = 1}) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.price = price;
    this.quantity = quantity;
  }
}
