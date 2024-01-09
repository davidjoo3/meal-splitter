export default class Bill {
  constructor(restaurant, date, subtotal, tax, tip, total, people, shared) {
    this.restaurant = restaurant;
    this.date = date;
    this.subtotal = subtotal;
    this.tax = tax;
    this.tip = tip;
    this.total = total;
    this.peopleWithTotal = calculatePeopleWithTotal(people);
    this.sharedWithTotal = calculateSharedWithTotal(shared);
  }
}