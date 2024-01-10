import MealList from './mealList';
import BillList from './billList';
import Bill from './bill';
import Person from './person';
import Shared from './shared';
import Item  from './item';

export default class Storage {
  static saveMealList(data) {
    localStorage.setItem('mealList', JSON.stringify(data));
  }

  static saveBillList(data) {
    localStorage.setItem('billList', JSON.stringify(data));
  }

  static getBillList() {
    const billList = Object.assign(
      new BillList(),
      JSON.parse(localStorage.getItem('billList')));
    
      billList.setBills(
        billList.getBills().map((bill) => Object.assign(new Bill(), bill))
      );

      billList.getBills().forEach((bill) => {
        // bill.peopleWithTotal.map((person[0]) => Object.assign(new Person(), person[0]))

        for (let personWithTotal of bill.peopleWithTotal) {
          personWithTotal[0] = Object.assign(new Person(), personWithTotal[0]);

          personWithTotal[0].getItems().map((item) => Object.assign(new Item(), item));
        }
        
        if (bill.sharedWithTotal !== null) {
          bill.sharedWithTotal[0].map((item) => Object.assign(new Item(), item));
        }
        
      });

    return billList;
  }

  static getMealList() {
    const mealList = Object.assign(
      new MealList(), 
      JSON.parse(localStorage.getItem('mealList')));
    
      mealList.setPeople(
        mealList
          .getPeople()
          .map((person) => Object.assign(new Person(), person))
      );

      mealList.setShared(
        Object.assign(new Shared(), mealList.getShared())
      );

      mealList.getPeople().forEach((person) => {
        person.setItems(
          person.getItems().map((item) => Object.assign(new Item(), item))
        );
      });

      if (mealList.getShared().getItems() !== undefined) {
            mealList.getShared().setItems(
              mealList.getShared()
              .getItems()
              .map((item) => Object.assign(new Item(), item))
            );
      }
    
    return mealList;
  }

  static addPerson(person) {
    const mealList = Storage.getMealList();
    mealList.addPerson(person);
    Storage.saveMealList(mealList);
  }

  static deletePerson(personName) {
    const mealList = Storage.getMealList();
    mealList.deletePerson(personName);
    Storage.saveMealList(mealList);
  }

  static addShared(shared) {
    const mealList = Storage.getMealList();
    mealList.setShared(shared);
    Storage.saveMealList(mealList);
  }

  static deleteShared() {
    const mealList = Storage.getMealList();
    mealList.deleteShared();
    Storage.saveMealList(mealList);
  }

  static addBill(bill) {
    const billList = Storage.getBillList();
    billList.addBill(bill);
    Storage.saveBillList(billList);
  }

  static deleteBill(billDate) {
    const billList = Storage.getBillList();
    billList.deleteBill(billDate);
    Storage.saveBillList(billList);
  }

}