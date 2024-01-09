import MealList from './mealList';
import Person from './person';
import Shared from './shared';
import Item  from './item';

export default class Storage {
  static saveMealList(data) {
    localStorage.setItem('mealList', JSON.stringify(data));
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

      
      if (mealList.getShared().getItems() !== null) {
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

}