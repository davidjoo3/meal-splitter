export default class Bill {

  constructor(restaurant) {
    this.restaurant = restaurant;
    this.date = null;
    this.subtotal = null;
    this.tax = null;
    this.tip = null;
    this.total = null;
    this.sharedWithTotal = null;
    this.peopleWithTotal = null;
  }

  getDate() {
    var today = new Date();
    var date = (today.getMonth() + 1) + '/' + today.getDate() + '/'+today.getFullYear();

    var minute = today.getMinutes();
    minute = minute < 10 ? '0' + minute : minute;

    var second = today.getSeconds();
    second = second < 10 ? '0' + second : second;

    var time = today.getHours() + ":" + minute + ":" + second;
    return date + ' ' + time;
  }

  calculateSubtotal(people, shared) {
    let subtotal = 0.0;
    if (shared.items !== undefined) {
      shared.items.forEach((item) => {
        subtotal += parseFloat(item.price * parseInt(item.quantity));
      });
    }
    
    people.forEach((person) => {
      person.items.forEach((item) => {
        subtotal += parseFloat(item.price * parseInt(item.quantity));
      })
    })
    
    return subtotal.toFixed(2);
  }

  calculateTax(subtotal) {
    return (subtotal * 0.06).toFixed(2);
  }

  calculateTip(subtotal, tip) {
    if (tip <= 0.2) {
      return (subtotal * tip).toFixed(2);
    }
    return tip;
  }

  calculateTotal(subtotal, tax, tip) {
    return (parseFloat(subtotal) + parseFloat(tax) + parseFloat(tip)).toFixed(2);
  }

  calculateSharedWithTotal(shared, subtotal, tax, tip) {
    let itemSubtotal = 0.0;
    if (shared.items !== undefined) {
      shared.items.forEach((item) => {
        itemSubtotal += parseFloat(item.price * parseInt(item.quantity));
      });
      const sharedTotal = itemSubtotal 
                         + ((itemSubtotal / parseFloat(subtotal)) * parseFloat(tax)) 
                          + ((itemSubtotal / parseFloat(subtotal)) * parseFloat(tip));
      return [shared.items, sharedTotal.toFixed(2)];
    }

    return undefined;
  }

  calculatePeopleWithTotal(people, sharedWithTotal, subtotal, tax, tip) {
    const peopleWithTotalArray = [];
    let sharedTotalForEach = 0.0;
    if (sharedWithTotal !== undefined) {
      sharedTotalForEach = parseFloat(sharedWithTotal[1]) / people.length;
      sharedWithTotal[1] = sharedTotalForEach;
    } 

    people.forEach((person) => {
      let itemSubtotal = 0.0;
      person.items.forEach((item) => {
        itemSubtotal += parseFloat(item.price * parseInt(item.quantity));
      })
      const personTotal = itemSubtotal 
                       + ((itemSubtotal / parseFloat(subtotal)) * parseFloat(tax)) 
                        + ((itemSubtotal / parseFloat(subtotal)) * parseFloat(tip)) 
                        + sharedTotalForEach;

      peopleWithTotalArray.push([person, personTotal.toFixed(2)]);
    })

    return peopleWithTotalArray;
  }
}