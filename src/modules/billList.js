export default class BillList {
  constructor() {
    this.bills = [];
  }

  setBills(bills) {
    this.bills = bills;
  }

  getBills() {
    return this.bills;
  }

  addBill(newBill) {
    this.bills.push(newBill);
  }

  deleteBill(billDate) {
    this.bills = this.bills.filter((bill) => bill.date !== billDate);
  }
}