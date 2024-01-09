import Person from './person';
import Item from './item';
import Shared from './shared';
import Storage from './storage';


export default class UI {
  

  static loadHome() {
    UI.initButtons();
  }

  

  static initButtons() {
    const addPersonBtn = document.querySelector('.add-person');
    const addPersonForm = document.querySelector('.add-person-form');
    const addSharedBtn = document.querySelector('.add-shared');
    const addSharedForm = document.querySelector('.add-shared-form');
    const closeModalBtns = document.querySelectorAll('.remove-modal');
    const overlay = document.querySelector('.overlay');


    addPersonBtn.addEventListener('click', UI.openAddPersonModal);
    addPersonForm.addEventListener('submit', UI.addPerson);
    addSharedBtn.addEventListener('click', UI.openAddSharedModal);
    addSharedForm.addEventListener('submit', UI.addShared);
    closeModalBtns.forEach((button) => {
      button.addEventListener('click', UI.closeAllModals);
    });
    overlay.addEventListener('click', UI.closeAllModals);
  }

  static openAddPersonModal() {
    const addPersonModal = document.querySelector('.add-person-modal');
    const overlay = document.querySelector('.overlay');

    addPersonModal.classList.add('active');
    overlay.classList.add('active');
  }

  static addPerson(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    let items = Array.from(document.querySelectorAll('.add-item'));
    let convertedItems = [];
    items.forEach((item) => {
      convertedItems.push(UI.getItem(item));
    });

    Storage.addPerson(new Person(name, convertedItems));
    console.log(Storage.getMealList());
    UI.closeAddPersonModal();
  }

  static addShared(e) {
    e.preventDefault();
    
    let items = Array.from(document.querySelectorAll('.add-shared-item'));
    let convertedItems = [];
    items.forEach((item) => {
      convertedItems.push(UI.getItem(item));
    });
    
    Storage.addShared(new Shared("Shared", convertedItems));
    console.log(Storage.getMealList());
    UI.closeAddSharedModal();
  }

  static getItem(item) {
    const itemName = item.children[0].value;
    const quantity = item.children[1].value;
    const price = item.children[2].value;
    return new Item(itemName, quantity, price);
  }

  static openAddSharedModal() {
    const addSharedModal = document.querySelector('.add-shared-modal');
    const overlay = document.querySelector('.overlay');

    addSharedModal.classList.add('active');
    overlay.classList.add('active');
  }

  static closeAddPersonModal() {
    const addPersonModal = document.querySelector('.add-person-modal');
    const addPersonForm = document.querySelector('.add-person-form');
    const overlay = document.querySelector('.overlay');

    addPersonModal.classList.remove('active');
    addPersonForm.reset();
    overlay.classList.remove('active');
  }

  static closeAddSharedModal() {
    const addSharedModal = document.querySelector('.add-shared-modal');
    const addSharedForm = document.querySelector('.add-shared-form');
    const overlay = document.querySelector('.overlay');

    addSharedModal.classList.remove('active');
    addSharedForm.reset();
    overlay.classList.remove('active');
  }

  static closeAllModals() {
    UI.closeAddPersonModal();
    UI.closeAddSharedModal();
  }
}