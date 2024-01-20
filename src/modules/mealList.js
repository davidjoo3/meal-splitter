export default class MealList {

  constructor() {
    this.people = []
    this.shared = undefined;
  }

  setPeople(people) {
    this.people = people;
  }

  getPeople() {
    return this.people;
  }

  setShared(shared) {
    this.shared = shared;
  }

  getShared() {
    return this.shared;
  }

  addPerson(newPerson) {
    if(this.people.find((person) => person.name === newPerson)) {
      alert("Choose different name!");
    } else {
      this.people.push(newPerson);
    }
  }

  deletePerson(personName) {
    this.people = this.people.filter((person) => person.name !== personName);
  }

  deleteShared() {
    this.shared = undefined;
  }

  hasPerson(personName) {
    return this.people.some((person) => person.name === personName);
  }
}