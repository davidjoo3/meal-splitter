/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/modules/UI.js":
/*!***************************!*\
  !*** ./src/modules/UI.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UI)
/* harmony export */ });
/* harmony import */ var _person__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./person */ "./src/modules/person.js");
/* harmony import */ var _item__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./item */ "./src/modules/item.js");
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./shared */ "./src/modules/shared.js");
/* harmony import */ var _bill__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./bill */ "./src/modules/bill.js");
/* harmony import */ var _storage__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./storage */ "./src/modules/storage.js");







class UI {
  

  static loadHome() {
    UI.initButtons();
    UI.displayMealList();
    
  }

  static initHomeButtons() {
    const addPersonBtn = document.querySelector('.add-person');
    const addSharedBtn = document.querySelector('.add-shared');
    const removePersonCardBtns = document.querySelectorAll('.remove');
    const removeSharedCardBtn = document.querySelector('.remove-shared');
    const splitBtn = document.querySelector('.split');

    addPersonBtn.addEventListener('click', UI.openAddPersonModal);
    addSharedBtn.addEventListener('click', UI.openAddSharedModal);
    removePersonCardBtns.forEach((button) => {
      const name = button.nextSibling.nextSibling;
      
      button.addEventListener('click', () => {
        UI.deletePersonCard(name.textContent);
      });
    })
    if (_storage__WEBPACK_IMPORTED_MODULE_4__["default"].getMealList().getShared().getItems() !== undefined) {
      removeSharedCardBtn.addEventListener('click', UI.deleteSharedCard);
      addSharedBtn.classList.add('hidden');
    }
    splitBtn.addEventListener('click', UI.openSplitModal);
  }

  static openSplitModal(e) {
    e.preventDefault();
    const splitModal = document.querySelector('.split-modal');
    const overlay = document.querySelector('.overlay');

    splitModal.classList.add('active');
    overlay.classList.add('active');
    
    UI.initButtons();
  }

  static closeSplitModal() {
    const splitModal = document.querySelector('.split-modal');
    const splitForm = document.querySelector('.split-form');
    const overlay = document.querySelector('.overlay');

    splitModal.classList.remove('active');
    splitForm.reset();
    overlay.classList.remove('active');
  }

  static initButtons() {
    const addPersonBtn = document.querySelector('.add-person');
    const addPersonFrom = document.querySelector('.add-person-form');
    const addSharedBtn = document.querySelector('.add-shared');
    const addSharedForm = document.querySelector('.add-shared-form');
    const closeModalBtns = document.querySelectorAll('.remove-modal');
    const overlay = document.querySelector('.overlay');
    
    const addPersonItemBtn = document.querySelector('.add-item-person');
    const removePersonItemBtn = document.querySelector('.remove-item-person');

    const addSharedItemBtn = document.querySelector('.add-item-shared');
    const removeSharedItemBtn = document.querySelector('.remove-item-shared');

    const calculateBtn = document.querySelector('.calculate');
    

    

    addPersonBtn.addEventListener('click', UI.openAddPersonModal);
    addPersonFrom.addEventListener('submit', UI.addPerson);
    addSharedBtn.addEventListener('click', UI.openAddSharedModal);
    addSharedForm.addEventListener('submit', UI.addShared);
    closeModalBtns.forEach((button) => {
      button.addEventListener('click', UI.closeAllModals);
    });
    overlay.addEventListener('click', UI.closeAllModals);

    addPersonItemBtn.addEventListener('click', UI.addItem);
    removePersonItemBtn.addEventListener('click', UI.removeItem);
    addSharedItemBtn.addEventListener('click', UI.addItem);
    removeSharedItemBtn.addEventListener('click', UI.removeItem);

    calculateBtn.addEventListener('click', UI.openBillModal);
  }

  static openBillModal() {
    const billModal = document.querySelector('.bill-modal');
    const overlay = document.querySelector('.overlay');
    
    const restaurant = document.getElementById('restaurant-name').value;
    if (restaurant === "") {
      alert("Enter restaurant name!");
      return;
    }
    const tipBtns = document.querySelectorAll('.radio-btn');
    const customAmt = document.getElementById('custom').value;
    let tipAmount = 0.0;
    tipBtns.forEach((tipBtn) => {
      if (tipBtn.checked) {
        tipAmount = tipBtn.value;
      }
    });
    if (customAmt !== "") {
      tipAmount = customAmt;
    }
    UI.closeAllModals();
    

    
    const bill = UI.billify(restaurant, tipAmount);
    console.log(bill);
    billModal.innerHTML = `
      <button class="remove-modal">
      <i class="fa-solid fa-xmark"></i>
      </button>
      <p class="name">${bill.restaurant}</p>
      <p class="date">Date: ${bill.date}</p>
    `;
    
    const mealTotalList = UI.makeBill(bill);
    for (let mealTotal of mealTotalList) {
      billModal.appendChild(mealTotal);
    }
    billModal.innerHTML += `
      <div class="summary">
        <div class="titles">
          <p>SUBTOTAL: </p>
          <p>TAX: </p>
          <p>TIP: </p>
          <p>TOTAL: </p>
        </div>
        <div class="numbers">
          <p class="subtotal">$ ${bill.subtotal}</p>
          <p class="tax">$ ${bill.tax}</p>
          <p class="tip">$ ${bill.tip}</p>
          <p class="total">$ ${bill.total}</p>
        </div>
      </div>
      <button type="button" class="save-bill">SAVE</button>
    `;
    billModal.classList.add('active');
    overlay.classList.add('active');
    UI.initButtons();
   
  }

  static makeBill(bill) {
    const mealTotalList = [];
    
    bill.peopleWithTotal.forEach((person) => {
      const mealTotal = document.createElement('div');
      mealTotal.classList.add('meal-total');

      const personTotal = document.createElement('p');
      personTotal.classList.add('person-total');
      personTotal.textContent = person[0].name + ': $ ' + person[1];

      const itemHeader = document.createElement('div');
      itemHeader.classList.add('item-header');
      itemHeader.innerHTML = `
        <div class="item-name">ITEM</div>
        <div class="quantity">QTY</div>
        <div class="price">PRICE</div>
      `;

      mealTotal.appendChild(personTotal);
      mealTotal.appendChild(itemHeader);
      mealTotal.appendChild(UI.makeItemList(person[0].items));
      
      mealTotalList.push(mealTotal);
    })

    if (bill.sharedWithTotal !== undefined) {
      
      const mealTotal = document.createElement('div');
      mealTotal.classList.add('meal-total');

      const personTotal = document.createElement('p');
      personTotal.classList.add('person-total');
      personTotal.textContent = "Shared";
      // + ': $ ' + bill.sharedWithTotal[1] + " Each"

      const itemHeader = document.createElement('div');
      itemHeader.classList.add('item-header');
      itemHeader.innerHTML = `
        <div class="item-name">ITEM</div>
        <div class="quantity">QTY</div>
        <div class="price">PRICE</div>
      `;

      mealTotal.appendChild(personTotal);
      mealTotal.appendChild(itemHeader);
      mealTotal.appendChild(UI.makeItemList(bill.sharedWithTotal[0]));
      mealTotalList.push(mealTotal);
    }
    return mealTotalList;
  }

  static closeBillModal() {
    const billModal = document.querySelector('.bill-modal');
    const overlay = document.querySelector('.overlay');
    
    billModal.classList.remove('active');
    overlay.classList.remove('active');
  }

  static billify(restaurant, tipAmount) {
    
    console.log(tipAmount);
    
    const mealList = _storage__WEBPACK_IMPORTED_MODULE_4__["default"].getMealList();
    const newBill = new _bill__WEBPACK_IMPORTED_MODULE_3__["default"](restaurant);
    newBill.date = newBill.getDate();
    newBill.subtotal = newBill.calculateSubtotal(mealList.people, mealList.shared);
    newBill.tax = newBill.calculateTax(newBill.subtotal);
    newBill.tip = newBill.calculateTip(newBill.subtotal, tipAmount);
    newBill.total = newBill.calculateTotal(newBill.subtotal, newBill.tax, newBill.tip);
    newBill.sharedWithTotal = newBill.calculateSharedWithTotal(mealList.shared, 
                                                                newBill.subtotal, 
                                                                newBill.tax, 
                                                                newBill.tip);
    newBill.peopleWithTotal = newBill.calculatePeopleWithTotal(mealList.people,
                                                                newBill.sharedWithTotal,
                                                                newBill.subtotal,
                                                                newBill.tax,
                                                                newBill.tip);
    return newBill;
  }

  static deletePersonCard(name) {
    _storage__WEBPACK_IMPORTED_MODULE_4__["default"].deletePerson(name);
    UI.displayMealList();
  }

  static deleteSharedCard() {
    _storage__WEBPACK_IMPORTED_MODULE_4__["default"].deleteShared();
    const addSharedBtn = document.querySelector('.add-shared');
    addSharedBtn.classList.remove('hidden');
    UI.displayMealList();
  }

  static displayMealList() {
    const mealList = _storage__WEBPACK_IMPORTED_MODULE_4__["default"].getMealList();
    console.log(mealList);
    const mealGrid = document.querySelector('.meal-grid');
    mealGrid.innerHTML = '';
    const addCardBtns = document.createElement('div');
    addCardBtns.classList.add('add-card');
    addCardBtns.innerHTML = `
          <button class="add-person">ADD PERSON</button>
          <button class="add-shared">ADD SHARED</button>`
    mealGrid.appendChild(addCardBtns)
    
    const addCardBtn = mealGrid.querySelector('.add-card');

    if (mealList.getShared().getItems() !== undefined) {
      mealGrid.insertBefore(UI.makeMealCard(mealList.shared), addCardBtn);
    }
    
    for (const person of mealList.people) {
      mealGrid.insertBefore(UI.makeMealCard(person), addCardBtn);
    }
    
    UI.initHomeButtons();
  }

  static makeMealCard(person) {
    const name = person.name;

    const mealCard = document.createElement('div');
    mealCard.classList.add('meal-card');

    if (name === "Shared") {
      mealCard.innerHTML = `
        <button class="remove-shared">
          <i class="fa-solid fa-xmark"></i>
        </button>
        <p class="name">${name}</p>

        <div class="item-header">
          <div class="item-name">ITEM</div>
          <div class="quantity">QTY</div>
          <div class="price">PRICE</div>
        </div>
    `;
    } else {
      mealCard.innerHTML = `
        <button class="remove">
          <i class="fa-solid fa-xmark"></i>
        </button>
        <p class="name">${name}</p>

        <div class="item-header">
          <div class="item-name">ITEM</div>
          <div class="quantity">QTY</div>
          <div class="price">PRICE</div>
        </div>
    `;
    }
    
    mealCard.appendChild(UI.makeItemList(person.items));
    
    // const editBtn = document.createElement('button');
    // editBtn.classList.add('edit');
    // editBtn.textContent = 'EDIT';

    // mealCard.appendChild(editBtn);

    return mealCard;
  }

  static makeItemList(items) {
    const itemList = document.createElement('div');
    itemList.classList.add('item-list');
    for (const item of items) {
      const newItem = document.createElement('div');
      newItem.classList.add('item');
      newItem.innerHTML = `
        <div class="item-name">${item.name}</div>
        <div class="quantity">${item.quantity}</div>
        <div class="price">$ ${item.price}</div>
      `;
      itemList.appendChild(newItem)
    }
    return itemList;
  }

  static openAddPersonModal(e) {
    e.preventDefault();
    const addPersonModal = document.querySelector('.add-person-modal');
    const overlay = document.querySelector('.overlay');
    const addItemList = document.querySelector('.add-person-item-list');

    addItemList.innerHTML = `
          <div class="add-item person">

          <input 
            type="text"
            class="input"
            id="itemName"
            placeholder="Item"
            maxlength="16"
            required
          >
          <input 
            type="number"
            class="input"
            id="quantity"
            placeholder="#"
            onchange="(function(el){el.value=parseFloat(el.value).toFixed(0);})(this)"
            step="1"
            required
            min="1"
            max="999"
          >
          <input 
            type="number"
            class="input"
            id="price"
            placeholder="$"
            step="0.01"
            onchange="(function(el){el.value=parseFloat(el.value).toFixed(2);})(this)"
            required
            min="0.01"
            max="9999.99"
          >
        </div>
        
        <div class="item-btns">
            <button class="add-item-btn add-item-person">+</button>
            <button class="remove-item-btn remove-item-person">-</button>
        </div>
        <div class="add-btn-margin"></div>
    `;
    addPersonModal.classList.add('active');
    overlay.classList.add('active');

    UI.initButtons();
  }

  static addPerson(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    if (_storage__WEBPACK_IMPORTED_MODULE_4__["default"].getMealList().hasPerson(name)) {
      alert("This name already exist!");
      return;
    }
    let items = Array.from(document.querySelectorAll('.add-item.person'));
    console.log(items);
    let convertedItems = [];
    items.forEach((item) => {
      convertedItems.push(UI.getItem(item));
    });

    _storage__WEBPACK_IMPORTED_MODULE_4__["default"].addPerson(new _person__WEBPACK_IMPORTED_MODULE_0__["default"](name, convertedItems));
    console.log(_storage__WEBPACK_IMPORTED_MODULE_4__["default"].getMealList());
    UI.displayMealList();
    UI.closeAddPersonModal();
    
  }

  static addShared(e) {
    e.preventDefault();
    
    let items = Array.from(document.querySelectorAll('.add-item.shared'));
    let convertedItems = [];
    items.forEach((item) => {
      convertedItems.push(UI.getItem(item));
    });
   
    _storage__WEBPACK_IMPORTED_MODULE_4__["default"].addShared(new _shared__WEBPACK_IMPORTED_MODULE_2__["default"]("Shared", convertedItems));
    UI.displayMealList();
    UI.closeAddSharedModal();
  }

  static getItem(item) {
    const itemName = item.children[0].value;
    const quantity = item.children[1].value;
    const price = item.children[2].value;
    return new _item__WEBPACK_IMPORTED_MODULE_1__["default"](itemName, quantity, price);
  }

  static openAddSharedModal() {
    const addSharedModal = document.querySelector('.add-shared-modal');
    const overlay = document.querySelector('.overlay');
    const addItemList = document.querySelector('.add-shared-item-list');

    addItemList.innerHTML = `

    <div class="add-item shared">
            <input 
              type="text"
              class="input"
              id="itemName"
              placeholder="Item"
              maxlength="16"
              required
            >
            <input 
              type="number"
              class="input"
              id="quantity"
              placeholder="#"
              onchange="(function(el){el.value=parseFloat(el.value).toFixed(0);})(this)"
              step="1"
              required
              min="1"
              max="999"
            >
            <input 
              type="number"
              class="input"
              id="price"
              placeholder="$"
              step="0.01"
              onchange="(function(el){el.value=parseFloat(el.value).toFixed(2);})(this)"
              required
              min="0.01"
              max="9999.99"
            >
          </div>
          

          <div class="item-btns">
            <button class="add-item-btn add-item-shared">+</button>
            <button class="remove-item-btn remove-item-shared">-</button>
          </div>
          <div class="add-btn-margin"></div>

    `;

    addSharedModal.classList.add('active');
    overlay.classList.add('active');

    UI.initButtons();
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
    UI.closeSplitModal();
    UI.closeBillModal();
  }

  static addItem(e) {
    e.preventDefault();
    
    const addItemList = e.target.parentNode.parentNode;
    const itemBtnsDiv = e.target.parentNode;
    const addItemDiv = document.createElement('div');
    console.log(addItemList);
    
    addItemDiv.classList.add('add-item');

    if (addItemList.classList.contains('add-shared-item-list')) {
      addItemDiv.classList.add('shared');
    } else {
      addItemDiv.classList.add('person');
    }

    addItemDiv.innerHTML += `
        <input 
          type="text"
          class="input"
          id="itemName"
          placeholder="Item"
          maxlength="16"
          required
        >
        <input 
          type="number"
          class="input"
          id="quantity"
          placeholder="#"
          onchange="(function(el){el.value=parseFloat(el.value).toFixed(0);})(this)"
          step="1"
          required
          min="1"
          max="999"
        >
        <input 
          type="number"
          class="input"
          id="price"
          placeholder="$"
          step="0.01"
          onchange="(function(el){el.value=parseFloat(el.value).toFixed(2);})(this)"
          required
          min="0.01"
          max="9999.99"
        >
    `;
    addItemList.insertBefore(addItemDiv, itemBtnsDiv);

    UI.initButtons();
  }

  static removeItem(e) {
    e.preventDefault();
    
    const addItemList = e.target.parentNode.parentNode;
    const itemBtnsDiv = e.target.parentNode;
    
    if (addItemList.childElementCount <= 3) {
      alert("You need at least one item!");
    } else {
      addItemList.removeChild(itemBtnsDiv.previousSibling);
    }

    console.log(addItemList.childElementCount)
    
    
    
    UI.initButtons();
  }
}

/***/ }),

/***/ "./src/modules/bill.js":
/*!*****************************!*\
  !*** ./src/modules/bill.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Bill)
/* harmony export */ });
class Bill {


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
    if (minute < 10) {
      minute = '0' + minute;
    }
    var time = today.getHours() + ":" + minute + ":" + today.getSeconds();
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

/***/ }),

/***/ "./src/modules/item.js":
/*!*****************************!*\
  !*** ./src/modules/item.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Item)
/* harmony export */ });
class Item {
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

/***/ }),

/***/ "./src/modules/mealList.js":
/*!*********************************!*\
  !*** ./src/modules/mealList.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MealList)
/* harmony export */ });
class MealList {
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

/***/ }),

/***/ "./src/modules/person.js":
/*!*******************************!*\
  !*** ./src/modules/person.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Person)
/* harmony export */ });
class Person {
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

/***/ }),

/***/ "./src/modules/shared.js":
/*!*******************************!*\
  !*** ./src/modules/shared.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Shared)
/* harmony export */ });
class Shared {

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

/***/ }),

/***/ "./src/modules/storage.js":
/*!********************************!*\
  !*** ./src/modules/storage.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Storage)
/* harmony export */ });
/* harmony import */ var _mealList__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mealList */ "./src/modules/mealList.js");
/* harmony import */ var _person__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./person */ "./src/modules/person.js");
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./shared */ "./src/modules/shared.js");
/* harmony import */ var _item__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./item */ "./src/modules/item.js");





class Storage {
  static saveMealList(data) {
    localStorage.setItem('mealList', JSON.stringify(data));
  }

  static getMealList() {
    const mealList = Object.assign(
      new _mealList__WEBPACK_IMPORTED_MODULE_0__["default"](), 
      JSON.parse(localStorage.getItem('mealList')));
    
      mealList.setPeople(
        mealList
          .getPeople()
          .map((person) => Object.assign(new _person__WEBPACK_IMPORTED_MODULE_1__["default"](), person))
      );

      mealList.setShared(
        Object.assign(new _shared__WEBPACK_IMPORTED_MODULE_2__["default"](), mealList.getShared())
      );

      mealList.getPeople().forEach((person) => {
        person.setItems(
          person.getItems().map((item) => Object.assign(new _item__WEBPACK_IMPORTED_MODULE_3__["default"](), item))
        );
      });

      if (mealList.getShared().getItems() !== undefined) {
            mealList.getShared().setItems(
              mealList.getShared()
              .getItems()
              .map((item) => Object.assign(new _item__WEBPACK_IMPORTED_MODULE_3__["default"](), item))
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

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_UI__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/UI */ "./src/modules/UI.js");


document.addEventListener('DOMContentLoaded', _modules_UI__WEBPACK_IMPORTED_MODULE_0__["default"].loadHome)
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDLDBDQUEwQztBQUM1RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDLDBDQUEwQztBQUM1RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDL2tCZTs7O0FBR2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQzdGZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUM5QmU7QUFDZjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDMUNlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7O0FDOUJlOztBQUVmO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDaENrQztBQUNKO0FBQ0E7QUFDSDs7QUFFWjtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsVUFBVSxpREFBUTtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkNBQTZDLCtDQUFNO0FBQ25EOztBQUVBO0FBQ0EsMEJBQTBCLCtDQUFNO0FBQ2hDOztBQUVBO0FBQ0E7QUFDQSw0REFBNEQsNkNBQUk7QUFDaEU7QUFDQSxPQUFPOztBQUVQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0NBQStDLDZDQUFJO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7O1VDbEVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOOEI7O0FBRTlCLDhDQUE4QyxtREFBRSxVIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbWVhbC1zcGxpdHRlci8uL3NyYy9tb2R1bGVzL1VJLmpzIiwid2VicGFjazovL21lYWwtc3BsaXR0ZXIvLi9zcmMvbW9kdWxlcy9iaWxsLmpzIiwid2VicGFjazovL21lYWwtc3BsaXR0ZXIvLi9zcmMvbW9kdWxlcy9pdGVtLmpzIiwid2VicGFjazovL21lYWwtc3BsaXR0ZXIvLi9zcmMvbW9kdWxlcy9tZWFsTGlzdC5qcyIsIndlYnBhY2s6Ly9tZWFsLXNwbGl0dGVyLy4vc3JjL21vZHVsZXMvcGVyc29uLmpzIiwid2VicGFjazovL21lYWwtc3BsaXR0ZXIvLi9zcmMvbW9kdWxlcy9zaGFyZWQuanMiLCJ3ZWJwYWNrOi8vbWVhbC1zcGxpdHRlci8uL3NyYy9tb2R1bGVzL3N0b3JhZ2UuanMiLCJ3ZWJwYWNrOi8vbWVhbC1zcGxpdHRlci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9tZWFsLXNwbGl0dGVyL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9tZWFsLXNwbGl0dGVyL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vbWVhbC1zcGxpdHRlci93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL21lYWwtc3BsaXR0ZXIvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFBlcnNvbiBmcm9tICcuL3BlcnNvbic7XG5pbXBvcnQgSXRlbSBmcm9tICcuL2l0ZW0nO1xuaW1wb3J0IFNoYXJlZCBmcm9tICcuL3NoYXJlZCc7XG5pbXBvcnQgQmlsbCBmcm9tICcuL2JpbGwnO1xuaW1wb3J0IFN0b3JhZ2UgZnJvbSAnLi9zdG9yYWdlJztcblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSSB7XG4gIFxuXG4gIHN0YXRpYyBsb2FkSG9tZSgpIHtcbiAgICBVSS5pbml0QnV0dG9ucygpO1xuICAgIFVJLmRpc3BsYXlNZWFsTGlzdCgpO1xuICAgIFxuICB9XG5cbiAgc3RhdGljIGluaXRIb21lQnV0dG9ucygpIHtcbiAgICBjb25zdCBhZGRQZXJzb25CdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRkLXBlcnNvbicpO1xuICAgIGNvbnN0IGFkZFNoYXJlZEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hZGQtc2hhcmVkJyk7XG4gICAgY29uc3QgcmVtb3ZlUGVyc29uQ2FyZEJ0bnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucmVtb3ZlJyk7XG4gICAgY29uc3QgcmVtb3ZlU2hhcmVkQ2FyZEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yZW1vdmUtc2hhcmVkJyk7XG4gICAgY29uc3Qgc3BsaXRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3BsaXQnKTtcblxuICAgIGFkZFBlcnNvbkJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIFVJLm9wZW5BZGRQZXJzb25Nb2RhbCk7XG4gICAgYWRkU2hhcmVkQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgVUkub3BlbkFkZFNoYXJlZE1vZGFsKTtcbiAgICByZW1vdmVQZXJzb25DYXJkQnRucy5mb3JFYWNoKChidXR0b24pID0+IHtcbiAgICAgIGNvbnN0IG5hbWUgPSBidXR0b24ubmV4dFNpYmxpbmcubmV4dFNpYmxpbmc7XG4gICAgICBcbiAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgVUkuZGVsZXRlUGVyc29uQ2FyZChuYW1lLnRleHRDb250ZW50KTtcbiAgICAgIH0pO1xuICAgIH0pXG4gICAgaWYgKFN0b3JhZ2UuZ2V0TWVhbExpc3QoKS5nZXRTaGFyZWQoKS5nZXRJdGVtcygpICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJlbW92ZVNoYXJlZENhcmRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBVSS5kZWxldGVTaGFyZWRDYXJkKTtcbiAgICAgIGFkZFNoYXJlZEJ0bi5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbiAgICB9XG4gICAgc3BsaXRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBVSS5vcGVuU3BsaXRNb2RhbCk7XG4gIH1cblxuICBzdGF0aWMgb3BlblNwbGl0TW9kYWwoZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBjb25zdCBzcGxpdE1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNwbGl0LW1vZGFsJyk7XG4gICAgY29uc3Qgb3ZlcmxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5vdmVybGF5Jyk7XG5cbiAgICBzcGxpdE1vZGFsLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgIG92ZXJsYXkuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgXG4gICAgVUkuaW5pdEJ1dHRvbnMoKTtcbiAgfVxuXG4gIHN0YXRpYyBjbG9zZVNwbGl0TW9kYWwoKSB7XG4gICAgY29uc3Qgc3BsaXRNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zcGxpdC1tb2RhbCcpO1xuICAgIGNvbnN0IHNwbGl0Rm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zcGxpdC1mb3JtJyk7XG4gICAgY29uc3Qgb3ZlcmxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5vdmVybGF5Jyk7XG5cbiAgICBzcGxpdE1vZGFsLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuICAgIHNwbGl0Rm9ybS5yZXNldCgpO1xuICAgIG92ZXJsYXkuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG4gIH1cblxuICBzdGF0aWMgaW5pdEJ1dHRvbnMoKSB7XG4gICAgY29uc3QgYWRkUGVyc29uQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFkZC1wZXJzb24nKTtcbiAgICBjb25zdCBhZGRQZXJzb25Gcm9tID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFkZC1wZXJzb24tZm9ybScpO1xuICAgIGNvbnN0IGFkZFNoYXJlZEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hZGQtc2hhcmVkJyk7XG4gICAgY29uc3QgYWRkU2hhcmVkRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hZGQtc2hhcmVkLWZvcm0nKTtcbiAgICBjb25zdCBjbG9zZU1vZGFsQnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5yZW1vdmUtbW9kYWwnKTtcbiAgICBjb25zdCBvdmVybGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm92ZXJsYXknKTtcbiAgICBcbiAgICBjb25zdCBhZGRQZXJzb25JdGVtQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFkZC1pdGVtLXBlcnNvbicpO1xuICAgIGNvbnN0IHJlbW92ZVBlcnNvbkl0ZW1CdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmVtb3ZlLWl0ZW0tcGVyc29uJyk7XG5cbiAgICBjb25zdCBhZGRTaGFyZWRJdGVtQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFkZC1pdGVtLXNoYXJlZCcpO1xuICAgIGNvbnN0IHJlbW92ZVNoYXJlZEl0ZW1CdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmVtb3ZlLWl0ZW0tc2hhcmVkJyk7XG5cbiAgICBjb25zdCBjYWxjdWxhdGVCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2FsY3VsYXRlJyk7XG4gICAgXG5cbiAgICBcblxuICAgIGFkZFBlcnNvbkJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIFVJLm9wZW5BZGRQZXJzb25Nb2RhbCk7XG4gICAgYWRkUGVyc29uRnJvbS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBVSS5hZGRQZXJzb24pO1xuICAgIGFkZFNoYXJlZEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIFVJLm9wZW5BZGRTaGFyZWRNb2RhbCk7XG4gICAgYWRkU2hhcmVkRm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBVSS5hZGRTaGFyZWQpO1xuICAgIGNsb3NlTW9kYWxCdG5zLmZvckVhY2goKGJ1dHRvbikgPT4ge1xuICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgVUkuY2xvc2VBbGxNb2RhbHMpO1xuICAgIH0pO1xuICAgIG92ZXJsYXkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBVSS5jbG9zZUFsbE1vZGFscyk7XG5cbiAgICBhZGRQZXJzb25JdGVtQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgVUkuYWRkSXRlbSk7XG4gICAgcmVtb3ZlUGVyc29uSXRlbUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIFVJLnJlbW92ZUl0ZW0pO1xuICAgIGFkZFNoYXJlZEl0ZW1CdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBVSS5hZGRJdGVtKTtcbiAgICByZW1vdmVTaGFyZWRJdGVtQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgVUkucmVtb3ZlSXRlbSk7XG5cbiAgICBjYWxjdWxhdGVCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBVSS5vcGVuQmlsbE1vZGFsKTtcbiAgfVxuXG4gIHN0YXRpYyBvcGVuQmlsbE1vZGFsKCkge1xuICAgIGNvbnN0IGJpbGxNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5iaWxsLW1vZGFsJyk7XG4gICAgY29uc3Qgb3ZlcmxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5vdmVybGF5Jyk7XG4gICAgXG4gICAgY29uc3QgcmVzdGF1cmFudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXN0YXVyYW50LW5hbWUnKS52YWx1ZTtcbiAgICBpZiAocmVzdGF1cmFudCA9PT0gXCJcIikge1xuICAgICAgYWxlcnQoXCJFbnRlciByZXN0YXVyYW50IG5hbWUhXCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCB0aXBCdG5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnJhZGlvLWJ0bicpO1xuICAgIGNvbnN0IGN1c3RvbUFtdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjdXN0b20nKS52YWx1ZTtcbiAgICBsZXQgdGlwQW1vdW50ID0gMC4wO1xuICAgIHRpcEJ0bnMuZm9yRWFjaCgodGlwQnRuKSA9PiB7XG4gICAgICBpZiAodGlwQnRuLmNoZWNrZWQpIHtcbiAgICAgICAgdGlwQW1vdW50ID0gdGlwQnRuLnZhbHVlO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGlmIChjdXN0b21BbXQgIT09IFwiXCIpIHtcbiAgICAgIHRpcEFtb3VudCA9IGN1c3RvbUFtdDtcbiAgICB9XG4gICAgVUkuY2xvc2VBbGxNb2RhbHMoKTtcbiAgICBcblxuICAgIFxuICAgIGNvbnN0IGJpbGwgPSBVSS5iaWxsaWZ5KHJlc3RhdXJhbnQsIHRpcEFtb3VudCk7XG4gICAgY29uc29sZS5sb2coYmlsbCk7XG4gICAgYmlsbE1vZGFsLmlubmVySFRNTCA9IGBcbiAgICAgIDxidXR0b24gY2xhc3M9XCJyZW1vdmUtbW9kYWxcIj5cbiAgICAgIDxpIGNsYXNzPVwiZmEtc29saWQgZmEteG1hcmtcIj48L2k+XG4gICAgICA8L2J1dHRvbj5cbiAgICAgIDxwIGNsYXNzPVwibmFtZVwiPiR7YmlsbC5yZXN0YXVyYW50fTwvcD5cbiAgICAgIDxwIGNsYXNzPVwiZGF0ZVwiPkRhdGU6ICR7YmlsbC5kYXRlfTwvcD5cbiAgICBgO1xuICAgIFxuICAgIGNvbnN0IG1lYWxUb3RhbExpc3QgPSBVSS5tYWtlQmlsbChiaWxsKTtcbiAgICBmb3IgKGxldCBtZWFsVG90YWwgb2YgbWVhbFRvdGFsTGlzdCkge1xuICAgICAgYmlsbE1vZGFsLmFwcGVuZENoaWxkKG1lYWxUb3RhbCk7XG4gICAgfVxuICAgIGJpbGxNb2RhbC5pbm5lckhUTUwgKz0gYFxuICAgICAgPGRpdiBjbGFzcz1cInN1bW1hcnlcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInRpdGxlc1wiPlxuICAgICAgICAgIDxwPlNVQlRPVEFMOiA8L3A+XG4gICAgICAgICAgPHA+VEFYOiA8L3A+XG4gICAgICAgICAgPHA+VElQOiA8L3A+XG4gICAgICAgICAgPHA+VE9UQUw6IDwvcD5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJudW1iZXJzXCI+XG4gICAgICAgICAgPHAgY2xhc3M9XCJzdWJ0b3RhbFwiPiQgJHtiaWxsLnN1YnRvdGFsfTwvcD5cbiAgICAgICAgICA8cCBjbGFzcz1cInRheFwiPiQgJHtiaWxsLnRheH08L3A+XG4gICAgICAgICAgPHAgY2xhc3M9XCJ0aXBcIj4kICR7YmlsbC50aXB9PC9wPlxuICAgICAgICAgIDxwIGNsYXNzPVwidG90YWxcIj4kICR7YmlsbC50b3RhbH08L3A+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cInNhdmUtYmlsbFwiPlNBVkU8L2J1dHRvbj5cbiAgICBgO1xuICAgIGJpbGxNb2RhbC5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICBvdmVybGF5LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgIFVJLmluaXRCdXR0b25zKCk7XG4gICBcbiAgfVxuXG4gIHN0YXRpYyBtYWtlQmlsbChiaWxsKSB7XG4gICAgY29uc3QgbWVhbFRvdGFsTGlzdCA9IFtdO1xuICAgIFxuICAgIGJpbGwucGVvcGxlV2l0aFRvdGFsLmZvckVhY2goKHBlcnNvbikgPT4ge1xuICAgICAgY29uc3QgbWVhbFRvdGFsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBtZWFsVG90YWwuY2xhc3NMaXN0LmFkZCgnbWVhbC10b3RhbCcpO1xuXG4gICAgICBjb25zdCBwZXJzb25Ub3RhbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICAgIHBlcnNvblRvdGFsLmNsYXNzTGlzdC5hZGQoJ3BlcnNvbi10b3RhbCcpO1xuICAgICAgcGVyc29uVG90YWwudGV4dENvbnRlbnQgPSBwZXJzb25bMF0ubmFtZSArICc6ICQgJyArIHBlcnNvblsxXTtcblxuICAgICAgY29uc3QgaXRlbUhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgaXRlbUhlYWRlci5jbGFzc0xpc3QuYWRkKCdpdGVtLWhlYWRlcicpO1xuICAgICAgaXRlbUhlYWRlci5pbm5lckhUTUwgPSBgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJpdGVtLW5hbWVcIj5JVEVNPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJxdWFudGl0eVwiPlFUWTwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwicHJpY2VcIj5QUklDRTwvZGl2PlxuICAgICAgYDtcblxuICAgICAgbWVhbFRvdGFsLmFwcGVuZENoaWxkKHBlcnNvblRvdGFsKTtcbiAgICAgIG1lYWxUb3RhbC5hcHBlbmRDaGlsZChpdGVtSGVhZGVyKTtcbiAgICAgIG1lYWxUb3RhbC5hcHBlbmRDaGlsZChVSS5tYWtlSXRlbUxpc3QocGVyc29uWzBdLml0ZW1zKSk7XG4gICAgICBcbiAgICAgIG1lYWxUb3RhbExpc3QucHVzaChtZWFsVG90YWwpO1xuICAgIH0pXG5cbiAgICBpZiAoYmlsbC5zaGFyZWRXaXRoVG90YWwgIT09IHVuZGVmaW5lZCkge1xuICAgICAgXG4gICAgICBjb25zdCBtZWFsVG90YWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIG1lYWxUb3RhbC5jbGFzc0xpc3QuYWRkKCdtZWFsLXRvdGFsJyk7XG5cbiAgICAgIGNvbnN0IHBlcnNvblRvdGFsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgcGVyc29uVG90YWwuY2xhc3NMaXN0LmFkZCgncGVyc29uLXRvdGFsJyk7XG4gICAgICBwZXJzb25Ub3RhbC50ZXh0Q29udGVudCA9IFwiU2hhcmVkXCI7XG4gICAgICAvLyArICc6ICQgJyArIGJpbGwuc2hhcmVkV2l0aFRvdGFsWzFdICsgXCIgRWFjaFwiXG5cbiAgICAgIGNvbnN0IGl0ZW1IZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIGl0ZW1IZWFkZXIuY2xhc3NMaXN0LmFkZCgnaXRlbS1oZWFkZXInKTtcbiAgICAgIGl0ZW1IZWFkZXIuaW5uZXJIVE1MID0gYFxuICAgICAgICA8ZGl2IGNsYXNzPVwiaXRlbS1uYW1lXCI+SVRFTTwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwicXVhbnRpdHlcIj5RVFk8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInByaWNlXCI+UFJJQ0U8L2Rpdj5cbiAgICAgIGA7XG5cbiAgICAgIG1lYWxUb3RhbC5hcHBlbmRDaGlsZChwZXJzb25Ub3RhbCk7XG4gICAgICBtZWFsVG90YWwuYXBwZW5kQ2hpbGQoaXRlbUhlYWRlcik7XG4gICAgICBtZWFsVG90YWwuYXBwZW5kQ2hpbGQoVUkubWFrZUl0ZW1MaXN0KGJpbGwuc2hhcmVkV2l0aFRvdGFsWzBdKSk7XG4gICAgICBtZWFsVG90YWxMaXN0LnB1c2gobWVhbFRvdGFsKTtcbiAgICB9XG4gICAgcmV0dXJuIG1lYWxUb3RhbExpc3Q7XG4gIH1cblxuICBzdGF0aWMgY2xvc2VCaWxsTW9kYWwoKSB7XG4gICAgY29uc3QgYmlsbE1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJpbGwtbW9kYWwnKTtcbiAgICBjb25zdCBvdmVybGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm92ZXJsYXknKTtcbiAgICBcbiAgICBiaWxsTW9kYWwuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG4gICAgb3ZlcmxheS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcbiAgfVxuXG4gIHN0YXRpYyBiaWxsaWZ5KHJlc3RhdXJhbnQsIHRpcEFtb3VudCkge1xuICAgIFxuICAgIGNvbnNvbGUubG9nKHRpcEFtb3VudCk7XG4gICAgXG4gICAgY29uc3QgbWVhbExpc3QgPSBTdG9yYWdlLmdldE1lYWxMaXN0KCk7XG4gICAgY29uc3QgbmV3QmlsbCA9IG5ldyBCaWxsKHJlc3RhdXJhbnQpO1xuICAgIG5ld0JpbGwuZGF0ZSA9IG5ld0JpbGwuZ2V0RGF0ZSgpO1xuICAgIG5ld0JpbGwuc3VidG90YWwgPSBuZXdCaWxsLmNhbGN1bGF0ZVN1YnRvdGFsKG1lYWxMaXN0LnBlb3BsZSwgbWVhbExpc3Quc2hhcmVkKTtcbiAgICBuZXdCaWxsLnRheCA9IG5ld0JpbGwuY2FsY3VsYXRlVGF4KG5ld0JpbGwuc3VidG90YWwpO1xuICAgIG5ld0JpbGwudGlwID0gbmV3QmlsbC5jYWxjdWxhdGVUaXAobmV3QmlsbC5zdWJ0b3RhbCwgdGlwQW1vdW50KTtcbiAgICBuZXdCaWxsLnRvdGFsID0gbmV3QmlsbC5jYWxjdWxhdGVUb3RhbChuZXdCaWxsLnN1YnRvdGFsLCBuZXdCaWxsLnRheCwgbmV3QmlsbC50aXApO1xuICAgIG5ld0JpbGwuc2hhcmVkV2l0aFRvdGFsID0gbmV3QmlsbC5jYWxjdWxhdGVTaGFyZWRXaXRoVG90YWwobWVhbExpc3Quc2hhcmVkLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdCaWxsLnN1YnRvdGFsLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdCaWxsLnRheCwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3QmlsbC50aXApO1xuICAgIG5ld0JpbGwucGVvcGxlV2l0aFRvdGFsID0gbmV3QmlsbC5jYWxjdWxhdGVQZW9wbGVXaXRoVG90YWwobWVhbExpc3QucGVvcGxlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld0JpbGwuc2hhcmVkV2l0aFRvdGFsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld0JpbGwuc3VidG90YWwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3QmlsbC50YXgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3QmlsbC50aXApO1xuICAgIHJldHVybiBuZXdCaWxsO1xuICB9XG5cbiAgc3RhdGljIGRlbGV0ZVBlcnNvbkNhcmQobmFtZSkge1xuICAgIFN0b3JhZ2UuZGVsZXRlUGVyc29uKG5hbWUpO1xuICAgIFVJLmRpc3BsYXlNZWFsTGlzdCgpO1xuICB9XG5cbiAgc3RhdGljIGRlbGV0ZVNoYXJlZENhcmQoKSB7XG4gICAgU3RvcmFnZS5kZWxldGVTaGFyZWQoKTtcbiAgICBjb25zdCBhZGRTaGFyZWRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRkLXNoYXJlZCcpO1xuICAgIGFkZFNoYXJlZEJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcbiAgICBVSS5kaXNwbGF5TWVhbExpc3QoKTtcbiAgfVxuXG4gIHN0YXRpYyBkaXNwbGF5TWVhbExpc3QoKSB7XG4gICAgY29uc3QgbWVhbExpc3QgPSBTdG9yYWdlLmdldE1lYWxMaXN0KCk7XG4gICAgY29uc29sZS5sb2cobWVhbExpc3QpO1xuICAgIGNvbnN0IG1lYWxHcmlkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1lYWwtZ3JpZCcpO1xuICAgIG1lYWxHcmlkLmlubmVySFRNTCA9ICcnO1xuICAgIGNvbnN0IGFkZENhcmRCdG5zID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgYWRkQ2FyZEJ0bnMuY2xhc3NMaXN0LmFkZCgnYWRkLWNhcmQnKTtcbiAgICBhZGRDYXJkQnRucy5pbm5lckhUTUwgPSBgXG4gICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImFkZC1wZXJzb25cIj5BREQgUEVSU09OPC9idXR0b24+XG4gICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImFkZC1zaGFyZWRcIj5BREQgU0hBUkVEPC9idXR0b24+YFxuICAgIG1lYWxHcmlkLmFwcGVuZENoaWxkKGFkZENhcmRCdG5zKVxuICAgIFxuICAgIGNvbnN0IGFkZENhcmRCdG4gPSBtZWFsR3JpZC5xdWVyeVNlbGVjdG9yKCcuYWRkLWNhcmQnKTtcblxuICAgIGlmIChtZWFsTGlzdC5nZXRTaGFyZWQoKS5nZXRJdGVtcygpICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIG1lYWxHcmlkLmluc2VydEJlZm9yZShVSS5tYWtlTWVhbENhcmQobWVhbExpc3Quc2hhcmVkKSwgYWRkQ2FyZEJ0bik7XG4gICAgfVxuICAgIFxuICAgIGZvciAoY29uc3QgcGVyc29uIG9mIG1lYWxMaXN0LnBlb3BsZSkge1xuICAgICAgbWVhbEdyaWQuaW5zZXJ0QmVmb3JlKFVJLm1ha2VNZWFsQ2FyZChwZXJzb24pLCBhZGRDYXJkQnRuKTtcbiAgICB9XG4gICAgXG4gICAgVUkuaW5pdEhvbWVCdXR0b25zKCk7XG4gIH1cblxuICBzdGF0aWMgbWFrZU1lYWxDYXJkKHBlcnNvbikge1xuICAgIGNvbnN0IG5hbWUgPSBwZXJzb24ubmFtZTtcblxuICAgIGNvbnN0IG1lYWxDYXJkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgbWVhbENhcmQuY2xhc3NMaXN0LmFkZCgnbWVhbC1jYXJkJyk7XG5cbiAgICBpZiAobmFtZSA9PT0gXCJTaGFyZWRcIikge1xuICAgICAgbWVhbENhcmQuaW5uZXJIVE1MID0gYFxuICAgICAgICA8YnV0dG9uIGNsYXNzPVwicmVtb3ZlLXNoYXJlZFwiPlxuICAgICAgICAgIDxpIGNsYXNzPVwiZmEtc29saWQgZmEteG1hcmtcIj48L2k+XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8cCBjbGFzcz1cIm5hbWVcIj4ke25hbWV9PC9wPlxuXG4gICAgICAgIDxkaXYgY2xhc3M9XCJpdGVtLWhlYWRlclwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJpdGVtLW5hbWVcIj5JVEVNPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInF1YW50aXR5XCI+UVRZPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInByaWNlXCI+UFJJQ0U8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgYDtcbiAgICB9IGVsc2Uge1xuICAgICAgbWVhbENhcmQuaW5uZXJIVE1MID0gYFxuICAgICAgICA8YnV0dG9uIGNsYXNzPVwicmVtb3ZlXCI+XG4gICAgICAgICAgPGkgY2xhc3M9XCJmYS1zb2xpZCBmYS14bWFya1wiPjwvaT5cbiAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDxwIGNsYXNzPVwibmFtZVwiPiR7bmFtZX08L3A+XG5cbiAgICAgICAgPGRpdiBjbGFzcz1cIml0ZW0taGVhZGVyXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cIml0ZW0tbmFtZVwiPklURU08L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicXVhbnRpdHlcIj5RVFk8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJpY2VcIj5QUklDRTwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICBgO1xuICAgIH1cbiAgICBcbiAgICBtZWFsQ2FyZC5hcHBlbmRDaGlsZChVSS5tYWtlSXRlbUxpc3QocGVyc29uLml0ZW1zKSk7XG4gICAgXG4gICAgLy8gY29uc3QgZWRpdEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIC8vIGVkaXRCdG4uY2xhc3NMaXN0LmFkZCgnZWRpdCcpO1xuICAgIC8vIGVkaXRCdG4udGV4dENvbnRlbnQgPSAnRURJVCc7XG5cbiAgICAvLyBtZWFsQ2FyZC5hcHBlbmRDaGlsZChlZGl0QnRuKTtcblxuICAgIHJldHVybiBtZWFsQ2FyZDtcbiAgfVxuXG4gIHN0YXRpYyBtYWtlSXRlbUxpc3QoaXRlbXMpIHtcbiAgICBjb25zdCBpdGVtTGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGl0ZW1MaXN0LmNsYXNzTGlzdC5hZGQoJ2l0ZW0tbGlzdCcpO1xuICAgIGZvciAoY29uc3QgaXRlbSBvZiBpdGVtcykge1xuICAgICAgY29uc3QgbmV3SXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgbmV3SXRlbS5jbGFzc0xpc3QuYWRkKCdpdGVtJyk7XG4gICAgICBuZXdJdGVtLmlubmVySFRNTCA9IGBcbiAgICAgICAgPGRpdiBjbGFzcz1cIml0ZW0tbmFtZVwiPiR7aXRlbS5uYW1lfTwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwicXVhbnRpdHlcIj4ke2l0ZW0ucXVhbnRpdHl9PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJwcmljZVwiPiQgJHtpdGVtLnByaWNlfTwvZGl2PlxuICAgICAgYDtcbiAgICAgIGl0ZW1MaXN0LmFwcGVuZENoaWxkKG5ld0l0ZW0pXG4gICAgfVxuICAgIHJldHVybiBpdGVtTGlzdDtcbiAgfVxuXG4gIHN0YXRpYyBvcGVuQWRkUGVyc29uTW9kYWwoZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBjb25zdCBhZGRQZXJzb25Nb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hZGQtcGVyc29uLW1vZGFsJyk7XG4gICAgY29uc3Qgb3ZlcmxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5vdmVybGF5Jyk7XG4gICAgY29uc3QgYWRkSXRlbUxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRkLXBlcnNvbi1pdGVtLWxpc3QnKTtcblxuICAgIGFkZEl0ZW1MaXN0LmlubmVySFRNTCA9IGBcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWRkLWl0ZW0gcGVyc29uXCI+XG5cbiAgICAgICAgICA8aW5wdXQgXG4gICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICBjbGFzcz1cImlucHV0XCJcbiAgICAgICAgICAgIGlkPVwiaXRlbU5hbWVcIlxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJJdGVtXCJcbiAgICAgICAgICAgIG1heGxlbmd0aD1cIjE2XCJcbiAgICAgICAgICAgIHJlcXVpcmVkXG4gICAgICAgICAgPlxuICAgICAgICAgIDxpbnB1dCBcbiAgICAgICAgICAgIHR5cGU9XCJudW1iZXJcIlxuICAgICAgICAgICAgY2xhc3M9XCJpbnB1dFwiXG4gICAgICAgICAgICBpZD1cInF1YW50aXR5XCJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiI1wiXG4gICAgICAgICAgICBvbmNoYW5nZT1cIihmdW5jdGlvbihlbCl7ZWwudmFsdWU9cGFyc2VGbG9hdChlbC52YWx1ZSkudG9GaXhlZCgwKTt9KSh0aGlzKVwiXG4gICAgICAgICAgICBzdGVwPVwiMVwiXG4gICAgICAgICAgICByZXF1aXJlZFxuICAgICAgICAgICAgbWluPVwiMVwiXG4gICAgICAgICAgICBtYXg9XCI5OTlcIlxuICAgICAgICAgID5cbiAgICAgICAgICA8aW5wdXQgXG4gICAgICAgICAgICB0eXBlPVwibnVtYmVyXCJcbiAgICAgICAgICAgIGNsYXNzPVwiaW5wdXRcIlxuICAgICAgICAgICAgaWQ9XCJwcmljZVwiXG4gICAgICAgICAgICBwbGFjZWhvbGRlcj1cIiRcIlxuICAgICAgICAgICAgc3RlcD1cIjAuMDFcIlxuICAgICAgICAgICAgb25jaGFuZ2U9XCIoZnVuY3Rpb24oZWwpe2VsLnZhbHVlPXBhcnNlRmxvYXQoZWwudmFsdWUpLnRvRml4ZWQoMik7fSkodGhpcylcIlxuICAgICAgICAgICAgcmVxdWlyZWRcbiAgICAgICAgICAgIG1pbj1cIjAuMDFcIlxuICAgICAgICAgICAgbWF4PVwiOTk5OS45OVwiXG4gICAgICAgICAgPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJpdGVtLWJ0bnNcIj5cbiAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJhZGQtaXRlbS1idG4gYWRkLWl0ZW0tcGVyc29uXCI+KzwvYnV0dG9uPlxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cInJlbW92ZS1pdGVtLWJ0biByZW1vdmUtaXRlbS1wZXJzb25cIj4tPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiYWRkLWJ0bi1tYXJnaW5cIj48L2Rpdj5cbiAgICBgO1xuICAgIGFkZFBlcnNvbk1vZGFsLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgIG92ZXJsYXkuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG5cbiAgICBVSS5pbml0QnV0dG9ucygpO1xuICB9XG5cbiAgc3RhdGljIGFkZFBlcnNvbihlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgY29uc3QgbmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduYW1lJykudmFsdWU7XG4gICAgaWYgKFN0b3JhZ2UuZ2V0TWVhbExpc3QoKS5oYXNQZXJzb24obmFtZSkpIHtcbiAgICAgIGFsZXJ0KFwiVGhpcyBuYW1lIGFscmVhZHkgZXhpc3QhXCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBsZXQgaXRlbXMgPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5hZGQtaXRlbS5wZXJzb24nKSk7XG4gICAgY29uc29sZS5sb2coaXRlbXMpO1xuICAgIGxldCBjb252ZXJ0ZWRJdGVtcyA9IFtdO1xuICAgIGl0ZW1zLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgIGNvbnZlcnRlZEl0ZW1zLnB1c2goVUkuZ2V0SXRlbShpdGVtKSk7XG4gICAgfSk7XG5cbiAgICBTdG9yYWdlLmFkZFBlcnNvbihuZXcgUGVyc29uKG5hbWUsIGNvbnZlcnRlZEl0ZW1zKSk7XG4gICAgY29uc29sZS5sb2coU3RvcmFnZS5nZXRNZWFsTGlzdCgpKTtcbiAgICBVSS5kaXNwbGF5TWVhbExpc3QoKTtcbiAgICBVSS5jbG9zZUFkZFBlcnNvbk1vZGFsKCk7XG4gICAgXG4gIH1cblxuICBzdGF0aWMgYWRkU2hhcmVkKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgXG4gICAgbGV0IGl0ZW1zID0gQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYWRkLWl0ZW0uc2hhcmVkJykpO1xuICAgIGxldCBjb252ZXJ0ZWRJdGVtcyA9IFtdO1xuICAgIGl0ZW1zLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgIGNvbnZlcnRlZEl0ZW1zLnB1c2goVUkuZ2V0SXRlbShpdGVtKSk7XG4gICAgfSk7XG4gICBcbiAgICBTdG9yYWdlLmFkZFNoYXJlZChuZXcgU2hhcmVkKFwiU2hhcmVkXCIsIGNvbnZlcnRlZEl0ZW1zKSk7XG4gICAgVUkuZGlzcGxheU1lYWxMaXN0KCk7XG4gICAgVUkuY2xvc2VBZGRTaGFyZWRNb2RhbCgpO1xuICB9XG5cbiAgc3RhdGljIGdldEl0ZW0oaXRlbSkge1xuICAgIGNvbnN0IGl0ZW1OYW1lID0gaXRlbS5jaGlsZHJlblswXS52YWx1ZTtcbiAgICBjb25zdCBxdWFudGl0eSA9IGl0ZW0uY2hpbGRyZW5bMV0udmFsdWU7XG4gICAgY29uc3QgcHJpY2UgPSBpdGVtLmNoaWxkcmVuWzJdLnZhbHVlO1xuICAgIHJldHVybiBuZXcgSXRlbShpdGVtTmFtZSwgcXVhbnRpdHksIHByaWNlKTtcbiAgfVxuXG4gIHN0YXRpYyBvcGVuQWRkU2hhcmVkTW9kYWwoKSB7XG4gICAgY29uc3QgYWRkU2hhcmVkTW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRkLXNoYXJlZC1tb2RhbCcpO1xuICAgIGNvbnN0IG92ZXJsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcub3ZlcmxheScpO1xuICAgIGNvbnN0IGFkZEl0ZW1MaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFkZC1zaGFyZWQtaXRlbS1saXN0Jyk7XG5cbiAgICBhZGRJdGVtTGlzdC5pbm5lckhUTUwgPSBgXG5cbiAgICA8ZGl2IGNsYXNzPVwiYWRkLWl0ZW0gc2hhcmVkXCI+XG4gICAgICAgICAgICA8aW5wdXQgXG4gICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgY2xhc3M9XCJpbnB1dFwiXG4gICAgICAgICAgICAgIGlkPVwiaXRlbU5hbWVcIlxuICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIkl0ZW1cIlxuICAgICAgICAgICAgICBtYXhsZW5ndGg9XCIxNlwiXG4gICAgICAgICAgICAgIHJlcXVpcmVkXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICA8aW5wdXQgXG4gICAgICAgICAgICAgIHR5cGU9XCJudW1iZXJcIlxuICAgICAgICAgICAgICBjbGFzcz1cImlucHV0XCJcbiAgICAgICAgICAgICAgaWQ9XCJxdWFudGl0eVwiXG4gICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiI1wiXG4gICAgICAgICAgICAgIG9uY2hhbmdlPVwiKGZ1bmN0aW9uKGVsKXtlbC52YWx1ZT1wYXJzZUZsb2F0KGVsLnZhbHVlKS50b0ZpeGVkKDApO30pKHRoaXMpXCJcbiAgICAgICAgICAgICAgc3RlcD1cIjFcIlxuICAgICAgICAgICAgICByZXF1aXJlZFxuICAgICAgICAgICAgICBtaW49XCIxXCJcbiAgICAgICAgICAgICAgbWF4PVwiOTk5XCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgIDxpbnB1dCBcbiAgICAgICAgICAgICAgdHlwZT1cIm51bWJlclwiXG4gICAgICAgICAgICAgIGNsYXNzPVwiaW5wdXRcIlxuICAgICAgICAgICAgICBpZD1cInByaWNlXCJcbiAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCIkXCJcbiAgICAgICAgICAgICAgc3RlcD1cIjAuMDFcIlxuICAgICAgICAgICAgICBvbmNoYW5nZT1cIihmdW5jdGlvbihlbCl7ZWwudmFsdWU9cGFyc2VGbG9hdChlbC52YWx1ZSkudG9GaXhlZCgyKTt9KSh0aGlzKVwiXG4gICAgICAgICAgICAgIHJlcXVpcmVkXG4gICAgICAgICAgICAgIG1pbj1cIjAuMDFcIlxuICAgICAgICAgICAgICBtYXg9XCI5OTk5Ljk5XCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICBcblxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJpdGVtLWJ0bnNcIj5cbiAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJhZGQtaXRlbS1idG4gYWRkLWl0ZW0tc2hhcmVkXCI+KzwvYnV0dG9uPlxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cInJlbW92ZS1pdGVtLWJ0biByZW1vdmUtaXRlbS1zaGFyZWRcIj4tPC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImFkZC1idG4tbWFyZ2luXCI+PC9kaXY+XG5cbiAgICBgO1xuXG4gICAgYWRkU2hhcmVkTW9kYWwuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgb3ZlcmxheS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcblxuICAgIFVJLmluaXRCdXR0b25zKCk7XG4gIH1cblxuICBzdGF0aWMgY2xvc2VBZGRQZXJzb25Nb2RhbCgpIHtcbiAgICBcbiAgICBjb25zdCBhZGRQZXJzb25Nb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hZGQtcGVyc29uLW1vZGFsJyk7XG4gICAgY29uc3QgYWRkUGVyc29uRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hZGQtcGVyc29uLWZvcm0nKTtcbiAgICBjb25zdCBvdmVybGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm92ZXJsYXknKTtcblxuICAgIGFkZFBlcnNvbk1vZGFsLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuICAgIGFkZFBlcnNvbkZvcm0ucmVzZXQoKTtcbiAgICBvdmVybGF5LmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuXG4gIH1cblxuICBzdGF0aWMgY2xvc2VBZGRTaGFyZWRNb2RhbCgpIHtcbiAgICBjb25zdCBhZGRTaGFyZWRNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hZGQtc2hhcmVkLW1vZGFsJyk7XG4gICAgY29uc3QgYWRkU2hhcmVkRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hZGQtc2hhcmVkLWZvcm0nKTtcbiAgICBjb25zdCBvdmVybGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm92ZXJsYXknKTtcblxuICAgIGFkZFNoYXJlZE1vZGFsLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuICAgIGFkZFNoYXJlZEZvcm0ucmVzZXQoKTtcbiAgICBvdmVybGF5LmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuXG5cbiAgfVxuXG4gIHN0YXRpYyBjbG9zZUFsbE1vZGFscygpIHtcbiAgICBVSS5jbG9zZUFkZFBlcnNvbk1vZGFsKCk7XG4gICAgVUkuY2xvc2VBZGRTaGFyZWRNb2RhbCgpO1xuICAgIFVJLmNsb3NlU3BsaXRNb2RhbCgpO1xuICAgIFVJLmNsb3NlQmlsbE1vZGFsKCk7XG4gIH1cblxuICBzdGF0aWMgYWRkSXRlbShlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIFxuICAgIGNvbnN0IGFkZEl0ZW1MaXN0ID0gZS50YXJnZXQucGFyZW50Tm9kZS5wYXJlbnROb2RlO1xuICAgIGNvbnN0IGl0ZW1CdG5zRGl2ID0gZS50YXJnZXQucGFyZW50Tm9kZTtcbiAgICBjb25zdCBhZGRJdGVtRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgY29uc29sZS5sb2coYWRkSXRlbUxpc3QpO1xuICAgIFxuICAgIGFkZEl0ZW1EaXYuY2xhc3NMaXN0LmFkZCgnYWRkLWl0ZW0nKTtcblxuICAgIGlmIChhZGRJdGVtTGlzdC5jbGFzc0xpc3QuY29udGFpbnMoJ2FkZC1zaGFyZWQtaXRlbS1saXN0JykpIHtcbiAgICAgIGFkZEl0ZW1EaXYuY2xhc3NMaXN0LmFkZCgnc2hhcmVkJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFkZEl0ZW1EaXYuY2xhc3NMaXN0LmFkZCgncGVyc29uJyk7XG4gICAgfVxuXG4gICAgYWRkSXRlbURpdi5pbm5lckhUTUwgKz0gYFxuICAgICAgICA8aW5wdXQgXG4gICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgIGNsYXNzPVwiaW5wdXRcIlxuICAgICAgICAgIGlkPVwiaXRlbU5hbWVcIlxuICAgICAgICAgIHBsYWNlaG9sZGVyPVwiSXRlbVwiXG4gICAgICAgICAgbWF4bGVuZ3RoPVwiMTZcIlxuICAgICAgICAgIHJlcXVpcmVkXG4gICAgICAgID5cbiAgICAgICAgPGlucHV0IFxuICAgICAgICAgIHR5cGU9XCJudW1iZXJcIlxuICAgICAgICAgIGNsYXNzPVwiaW5wdXRcIlxuICAgICAgICAgIGlkPVwicXVhbnRpdHlcIlxuICAgICAgICAgIHBsYWNlaG9sZGVyPVwiI1wiXG4gICAgICAgICAgb25jaGFuZ2U9XCIoZnVuY3Rpb24oZWwpe2VsLnZhbHVlPXBhcnNlRmxvYXQoZWwudmFsdWUpLnRvRml4ZWQoMCk7fSkodGhpcylcIlxuICAgICAgICAgIHN0ZXA9XCIxXCJcbiAgICAgICAgICByZXF1aXJlZFxuICAgICAgICAgIG1pbj1cIjFcIlxuICAgICAgICAgIG1heD1cIjk5OVwiXG4gICAgICAgID5cbiAgICAgICAgPGlucHV0IFxuICAgICAgICAgIHR5cGU9XCJudW1iZXJcIlxuICAgICAgICAgIGNsYXNzPVwiaW5wdXRcIlxuICAgICAgICAgIGlkPVwicHJpY2VcIlxuICAgICAgICAgIHBsYWNlaG9sZGVyPVwiJFwiXG4gICAgICAgICAgc3RlcD1cIjAuMDFcIlxuICAgICAgICAgIG9uY2hhbmdlPVwiKGZ1bmN0aW9uKGVsKXtlbC52YWx1ZT1wYXJzZUZsb2F0KGVsLnZhbHVlKS50b0ZpeGVkKDIpO30pKHRoaXMpXCJcbiAgICAgICAgICByZXF1aXJlZFxuICAgICAgICAgIG1pbj1cIjAuMDFcIlxuICAgICAgICAgIG1heD1cIjk5OTkuOTlcIlxuICAgICAgICA+XG4gICAgYDtcbiAgICBhZGRJdGVtTGlzdC5pbnNlcnRCZWZvcmUoYWRkSXRlbURpdiwgaXRlbUJ0bnNEaXYpO1xuXG4gICAgVUkuaW5pdEJ1dHRvbnMoKTtcbiAgfVxuXG4gIHN0YXRpYyByZW1vdmVJdGVtKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgXG4gICAgY29uc3QgYWRkSXRlbUxpc3QgPSBlLnRhcmdldC5wYXJlbnROb2RlLnBhcmVudE5vZGU7XG4gICAgY29uc3QgaXRlbUJ0bnNEaXYgPSBlLnRhcmdldC5wYXJlbnROb2RlO1xuICAgIFxuICAgIGlmIChhZGRJdGVtTGlzdC5jaGlsZEVsZW1lbnRDb3VudCA8PSAzKSB7XG4gICAgICBhbGVydChcIllvdSBuZWVkIGF0IGxlYXN0IG9uZSBpdGVtIVwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYWRkSXRlbUxpc3QucmVtb3ZlQ2hpbGQoaXRlbUJ0bnNEaXYucHJldmlvdXNTaWJsaW5nKTtcbiAgICB9XG5cbiAgICBjb25zb2xlLmxvZyhhZGRJdGVtTGlzdC5jaGlsZEVsZW1lbnRDb3VudClcbiAgICBcbiAgICBcbiAgICBcbiAgICBVSS5pbml0QnV0dG9ucygpO1xuICB9XG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmlsbCB7XG5cblxuICBjb25zdHJ1Y3RvcihyZXN0YXVyYW50KSB7XG4gICAgdGhpcy5yZXN0YXVyYW50ID0gcmVzdGF1cmFudDtcbiAgICB0aGlzLmRhdGUgPSBudWxsO1xuICAgIHRoaXMuc3VidG90YWwgPSBudWxsO1xuICAgIHRoaXMudGF4ID0gbnVsbDtcbiAgICB0aGlzLnRpcCA9IG51bGw7XG4gICAgdGhpcy50b3RhbCA9IG51bGw7XG4gICAgdGhpcy5zaGFyZWRXaXRoVG90YWwgPSBudWxsO1xuICAgIHRoaXMucGVvcGxlV2l0aFRvdGFsID0gbnVsbDtcbiAgfVxuXG4gIGdldERhdGUoKSB7XG4gICAgdmFyIHRvZGF5ID0gbmV3IERhdGUoKTtcbiAgICB2YXIgZGF0ZSA9ICh0b2RheS5nZXRNb250aCgpICsgMSkgKyAnLycgKyB0b2RheS5nZXREYXRlKCkgKyAnLycrdG9kYXkuZ2V0RnVsbFllYXIoKTtcbiAgICB2YXIgbWludXRlID0gdG9kYXkuZ2V0TWludXRlcygpO1xuICAgIGlmIChtaW51dGUgPCAxMCkge1xuICAgICAgbWludXRlID0gJzAnICsgbWludXRlO1xuICAgIH1cbiAgICB2YXIgdGltZSA9IHRvZGF5LmdldEhvdXJzKCkgKyBcIjpcIiArIG1pbnV0ZSArIFwiOlwiICsgdG9kYXkuZ2V0U2Vjb25kcygpO1xuICAgIHJldHVybiBkYXRlICsgJyAnICsgdGltZTtcbiAgfVxuXG4gIGNhbGN1bGF0ZVN1YnRvdGFsKHBlb3BsZSwgc2hhcmVkKSB7XG4gICAgbGV0IHN1YnRvdGFsID0gMC4wO1xuICAgIGlmIChzaGFyZWQuaXRlbXMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgc2hhcmVkLml0ZW1zLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgc3VidG90YWwgKz0gcGFyc2VGbG9hdChpdGVtLnByaWNlICogcGFyc2VJbnQoaXRlbS5xdWFudGl0eSkpO1xuICAgICAgfSk7XG4gICAgfVxuICAgIFxuICAgIHBlb3BsZS5mb3JFYWNoKChwZXJzb24pID0+IHtcbiAgICAgIHBlcnNvbi5pdGVtcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgIHN1YnRvdGFsICs9IHBhcnNlRmxvYXQoaXRlbS5wcmljZSAqIHBhcnNlSW50KGl0ZW0ucXVhbnRpdHkpKTtcbiAgICAgIH0pXG4gICAgfSlcbiAgICBcbiAgICBcbiAgICByZXR1cm4gc3VidG90YWwudG9GaXhlZCgyKTtcbiAgfVxuXG4gIGNhbGN1bGF0ZVRheChzdWJ0b3RhbCkge1xuICAgIHJldHVybiAoc3VidG90YWwgKiAwLjA2KS50b0ZpeGVkKDIpO1xuICB9XG5cbiAgY2FsY3VsYXRlVGlwKHN1YnRvdGFsLCB0aXApIHtcbiAgICBpZiAodGlwIDw9IDAuMikge1xuICAgICAgcmV0dXJuIChzdWJ0b3RhbCAqIHRpcCkudG9GaXhlZCgyKTtcbiAgICB9XG4gICAgcmV0dXJuIHRpcDtcbiAgfVxuXG4gIGNhbGN1bGF0ZVRvdGFsKHN1YnRvdGFsLCB0YXgsIHRpcCkge1xuICAgIHJldHVybiAocGFyc2VGbG9hdChzdWJ0b3RhbCkgKyBwYXJzZUZsb2F0KHRheCkgKyBwYXJzZUZsb2F0KHRpcCkpLnRvRml4ZWQoMik7XG4gIH1cblxuICBjYWxjdWxhdGVTaGFyZWRXaXRoVG90YWwoc2hhcmVkLCBzdWJ0b3RhbCwgdGF4LCB0aXApIHtcbiAgICBsZXQgaXRlbVN1YnRvdGFsID0gMC4wO1xuICAgIGlmIChzaGFyZWQuaXRlbXMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgc2hhcmVkLml0ZW1zLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgaXRlbVN1YnRvdGFsICs9IHBhcnNlRmxvYXQoaXRlbS5wcmljZSAqIHBhcnNlSW50KGl0ZW0ucXVhbnRpdHkpKTtcbiAgICAgIH0pO1xuICAgICAgY29uc3Qgc2hhcmVkVG90YWwgPSBpdGVtU3VidG90YWwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgKyAoKGl0ZW1TdWJ0b3RhbCAvIHBhcnNlRmxvYXQoc3VidG90YWwpKSAqIHBhcnNlRmxvYXQodGF4KSkgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICsgKChpdGVtU3VidG90YWwgLyBwYXJzZUZsb2F0KHN1YnRvdGFsKSkgKiBwYXJzZUZsb2F0KHRpcCkpO1xuICAgICAgcmV0dXJuIFtzaGFyZWQuaXRlbXMsIHNoYXJlZFRvdGFsLnRvRml4ZWQoMildO1xuICAgIH1cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG5cbiAgY2FsY3VsYXRlUGVvcGxlV2l0aFRvdGFsKHBlb3BsZSwgc2hhcmVkV2l0aFRvdGFsLCBzdWJ0b3RhbCwgdGF4LCB0aXApIHtcbiAgICBjb25zdCBwZW9wbGVXaXRoVG90YWxBcnJheSA9IFtdO1xuICAgIGxldCBzaGFyZWRUb3RhbEZvckVhY2ggPSAwLjA7XG4gICAgaWYgKHNoYXJlZFdpdGhUb3RhbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBzaGFyZWRUb3RhbEZvckVhY2ggPSBwYXJzZUZsb2F0KHNoYXJlZFdpdGhUb3RhbFsxXSkgLyBwZW9wbGUubGVuZ3RoO1xuICAgICAgc2hhcmVkV2l0aFRvdGFsWzFdID0gc2hhcmVkVG90YWxGb3JFYWNoO1xuICAgIH0gXG5cbiAgICBwZW9wbGUuZm9yRWFjaCgocGVyc29uKSA9PiB7XG4gICAgICBsZXQgaXRlbVN1YnRvdGFsID0gMC4wO1xuICAgICAgcGVyc29uLml0ZW1zLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgaXRlbVN1YnRvdGFsICs9IHBhcnNlRmxvYXQoaXRlbS5wcmljZSAqIHBhcnNlSW50KGl0ZW0ucXVhbnRpdHkpKTtcbiAgICAgIH0pXG4gICAgICBjb25zdCBwZXJzb25Ub3RhbCA9IGl0ZW1TdWJ0b3RhbCBcbiAgICAgICAgICAgICAgICAgICAgICAgKyAoKGl0ZW1TdWJ0b3RhbCAvIHBhcnNlRmxvYXQoc3VidG90YWwpKSAqIHBhcnNlRmxvYXQodGF4KSkgXG4gICAgICAgICAgICAgICAgICAgICAgICArICgoaXRlbVN1YnRvdGFsIC8gcGFyc2VGbG9hdChzdWJ0b3RhbCkpICogcGFyc2VGbG9hdCh0aXApKSBcbiAgICAgICAgICAgICAgICAgICAgICAgICsgc2hhcmVkVG90YWxGb3JFYWNoO1xuICAgICAgcGVvcGxlV2l0aFRvdGFsQXJyYXkucHVzaChbcGVyc29uLCBwZXJzb25Ub3RhbC50b0ZpeGVkKDIpXSk7XG4gICAgfSlcbiAgICByZXR1cm4gcGVvcGxlV2l0aFRvdGFsQXJyYXk7XG4gIH1cbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBJdGVtIHtcbiAgY29uc3RydWN0b3IobmFtZSwgcXVhbnRpdHksIHByaWNlKSB7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLnF1YW50aXR5ID0gcXVhbnRpdHk7XG4gICAgdGhpcy5wcmljZSA9IHByaWNlO1xuICB9XG5cbiAgc2V0TmFtZShuYW1lKSB7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgfVxuXG4gIGdldE5hbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMubmFtZTtcbiAgfVxuXG4gIHNldFF1YW50aXR5KHF1YW50aXR5KSB7XG4gICAgdGhpcy5xdWFudGl0eSA9IHF1YW50aXR5O1xuICB9XG5cbiAgZ2V0UXVhbnRpdHkoKSB7XG4gICAgcmV0dXJuIHRoaXMucXVhbnRpdHk7XG4gIH1cblxuICBzZXRQcmljZShwcmljZSkge1xuICAgIHRoaXMucHJpY2UgPSBwcmljZTtcbiAgfVxuXG4gIGdldFByaWNlKCkge1xuICAgIHJldHVybiB0aGlzLnByaWNlO1xuICB9XG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWVhbExpc3Qge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnBlb3BsZSA9IFtdXG4gICAgdGhpcy5zaGFyZWQgPSB1bmRlZmluZWQ7XG4gIH1cblxuICBzZXRQZW9wbGUocGVvcGxlKSB7XG4gICAgdGhpcy5wZW9wbGUgPSBwZW9wbGU7XG4gIH1cblxuICBnZXRQZW9wbGUoKSB7XG4gICAgcmV0dXJuIHRoaXMucGVvcGxlO1xuICB9XG5cbiAgc2V0U2hhcmVkKHNoYXJlZCkge1xuICAgIHRoaXMuc2hhcmVkID0gc2hhcmVkO1xuICB9XG5cbiAgZ2V0U2hhcmVkKCkge1xuICAgIHJldHVybiB0aGlzLnNoYXJlZDtcbiAgfVxuXG4gIGFkZFBlcnNvbihuZXdQZXJzb24pIHtcbiAgICBpZih0aGlzLnBlb3BsZS5maW5kKChwZXJzb24pID0+IHBlcnNvbi5uYW1lID09PSBuZXdQZXJzb24pKSB7XG4gICAgICBhbGVydChcIkNob29zZSBkaWZmZXJlbnQgbmFtZSFcIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucGVvcGxlLnB1c2gobmV3UGVyc29uKTtcbiAgICB9XG4gICAgXG4gIH1cblxuICBkZWxldGVQZXJzb24ocGVyc29uTmFtZSkge1xuICAgIHRoaXMucGVvcGxlID0gdGhpcy5wZW9wbGUuZmlsdGVyKChwZXJzb24pID0+IHBlcnNvbi5uYW1lICE9PSBwZXJzb25OYW1lKTtcbiAgfVxuXG4gIGRlbGV0ZVNoYXJlZCgpIHtcbiAgICB0aGlzLnNoYXJlZCA9IHVuZGVmaW5lZDtcbiAgfVxuXG4gIGhhc1BlcnNvbihwZXJzb25OYW1lKSB7XG4gICAgcmV0dXJuIHRoaXMucGVvcGxlLnNvbWUoKHBlcnNvbikgPT4gcGVyc29uLm5hbWUgPT09IHBlcnNvbk5hbWUpO1xuICB9XG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGVyc29uIHtcbiAgY29uc3RydWN0b3IobmFtZSwgaXRlbXMpIHtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIHRoaXMuaXRlbXMgPSBpdGVtcztcbiAgfVxuXG4gIHNldE5hbWUobmFtZSkge1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gIH1cblxuICBnZXROYW1lKCkge1xuICAgIHJldHVybiB0aGlzLm5hbWU7XG4gIH1cblxuICBzZXRJdGVtcyhpdGVtcykge1xuICAgIHRoaXMuaXRlbXMgPSBpdGVtcztcbiAgfVxuXG4gIGdldEl0ZW1zKCkge1xuICAgIHJldHVybiB0aGlzLml0ZW1zO1xuICB9XG5cbiAgYWRkSXRlbShpdGVtKSB7XG4gICAgdGhpcy5pdGVtcy5wdXNoKGl0ZW0pO1xuICB9XG5cbiAgZGVsZXRlSXRlbShpdGVtTmFtZSkge1xuICAgIHRoaXMuaXRlbXMgPSB0aGlzLml0ZW1zLmZpbHRlcigoaXRlbSkgPT4gaXRlbS5uYW1lICE9PSBpdGVtTmFtZSk7XG4gIH1cblxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFNoYXJlZCB7XG5cbiAgY29uc3RydWN0b3IobmFtZSwgaXRlbXMpIHtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIHRoaXMuaXRlbXMgPSBpdGVtcztcbiAgfVxuXG4gIHNldE5hbWUobmFtZSkge1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gIH1cblxuICBnZXROYW1lKCkge1xuICAgIHJldHVybiB0aGlzLm5hbWU7XG4gIH1cblxuICBzZXRJdGVtcyhpdGVtcykge1xuICAgIHRoaXMuaXRlbXMgPSBpdGVtcztcbiAgfVxuXG4gIGdldEl0ZW1zKCkge1xuICAgIHJldHVybiB0aGlzLml0ZW1zO1xuICB9XG5cbiAgYWRkSXRlbShpdGVtKSB7XG4gICAgdGhpcy5pdGVtcy5wdXNoKGl0ZW0pO1xuICB9XG5cbiAgZGVsZXRlSXRlbShpdGVtTmFtZSkge1xuICAgIHRoaXMuaXRlbXMgPSB0aGlzLml0ZW1zLmZpbHRlcigoaXRlbSkgPT4gaXRlbS5uYW1lICE9PSBpdGVtTmFtZSk7XG4gIH1cblxuXG59IiwiaW1wb3J0IE1lYWxMaXN0IGZyb20gJy4vbWVhbExpc3QnO1xuaW1wb3J0IFBlcnNvbiBmcm9tICcuL3BlcnNvbic7XG5pbXBvcnQgU2hhcmVkIGZyb20gJy4vc2hhcmVkJztcbmltcG9ydCBJdGVtICBmcm9tICcuL2l0ZW0nO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdG9yYWdlIHtcbiAgc3RhdGljIHNhdmVNZWFsTGlzdChkYXRhKSB7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ21lYWxMaXN0JywgSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xuICB9XG5cbiAgc3RhdGljIGdldE1lYWxMaXN0KCkge1xuICAgIGNvbnN0IG1lYWxMaXN0ID0gT2JqZWN0LmFzc2lnbihcbiAgICAgIG5ldyBNZWFsTGlzdCgpLCBcbiAgICAgIEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ21lYWxMaXN0JykpKTtcbiAgICBcbiAgICAgIG1lYWxMaXN0LnNldFBlb3BsZShcbiAgICAgICAgbWVhbExpc3RcbiAgICAgICAgICAuZ2V0UGVvcGxlKClcbiAgICAgICAgICAubWFwKChwZXJzb24pID0+IE9iamVjdC5hc3NpZ24obmV3IFBlcnNvbigpLCBwZXJzb24pKVxuICAgICAgKTtcblxuICAgICAgbWVhbExpc3Quc2V0U2hhcmVkKFxuICAgICAgICBPYmplY3QuYXNzaWduKG5ldyBTaGFyZWQoKSwgbWVhbExpc3QuZ2V0U2hhcmVkKCkpXG4gICAgICApO1xuXG4gICAgICBtZWFsTGlzdC5nZXRQZW9wbGUoKS5mb3JFYWNoKChwZXJzb24pID0+IHtcbiAgICAgICAgcGVyc29uLnNldEl0ZW1zKFxuICAgICAgICAgIHBlcnNvbi5nZXRJdGVtcygpLm1hcCgoaXRlbSkgPT4gT2JqZWN0LmFzc2lnbihuZXcgSXRlbSgpLCBpdGVtKSlcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuXG4gICAgICBpZiAobWVhbExpc3QuZ2V0U2hhcmVkKCkuZ2V0SXRlbXMoKSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBtZWFsTGlzdC5nZXRTaGFyZWQoKS5zZXRJdGVtcyhcbiAgICAgICAgICAgICAgbWVhbExpc3QuZ2V0U2hhcmVkKClcbiAgICAgICAgICAgICAgLmdldEl0ZW1zKClcbiAgICAgICAgICAgICAgLm1hcCgoaXRlbSkgPT4gT2JqZWN0LmFzc2lnbihuZXcgSXRlbSgpLCBpdGVtKSlcbiAgICAgICAgICAgICk7XG4gICAgICB9XG4gICAgXG4gICAgcmV0dXJuIG1lYWxMaXN0O1xuICB9XG5cbiAgc3RhdGljIGFkZFBlcnNvbihwZXJzb24pIHtcbiAgICBjb25zdCBtZWFsTGlzdCA9IFN0b3JhZ2UuZ2V0TWVhbExpc3QoKTtcbiAgICBtZWFsTGlzdC5hZGRQZXJzb24ocGVyc29uKTtcbiAgICBTdG9yYWdlLnNhdmVNZWFsTGlzdChtZWFsTGlzdCk7XG4gIH1cblxuICBzdGF0aWMgZGVsZXRlUGVyc29uKHBlcnNvbk5hbWUpIHtcbiAgICBjb25zdCBtZWFsTGlzdCA9IFN0b3JhZ2UuZ2V0TWVhbExpc3QoKTtcbiAgICBtZWFsTGlzdC5kZWxldGVQZXJzb24ocGVyc29uTmFtZSk7XG4gICAgU3RvcmFnZS5zYXZlTWVhbExpc3QobWVhbExpc3QpO1xuICB9XG5cbiAgc3RhdGljIGFkZFNoYXJlZChzaGFyZWQpIHtcbiAgICBjb25zdCBtZWFsTGlzdCA9IFN0b3JhZ2UuZ2V0TWVhbExpc3QoKTtcbiAgICBtZWFsTGlzdC5zZXRTaGFyZWQoc2hhcmVkKTtcbiAgICBTdG9yYWdlLnNhdmVNZWFsTGlzdChtZWFsTGlzdCk7XG4gIH1cblxuICBzdGF0aWMgZGVsZXRlU2hhcmVkKCkge1xuICAgIGNvbnN0IG1lYWxMaXN0ID0gU3RvcmFnZS5nZXRNZWFsTGlzdCgpO1xuICAgIG1lYWxMaXN0LmRlbGV0ZVNoYXJlZCgpO1xuICAgIFN0b3JhZ2Uuc2F2ZU1lYWxMaXN0KG1lYWxMaXN0KTtcbiAgfVxuXG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgVUkgZnJvbSAnLi9tb2R1bGVzL1VJJztcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIFVJLmxvYWRIb21lKSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==