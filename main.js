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
    const main = document.querySelector('main');
    main.innerHTML = `

          <div class="meal-grid">
          

          <div class="add-card">
            <button class="add-person">ADD PERSON</button>
            <button class="add-shared">ADD SHARED</button>
          </div>

        </div>

        <div class="add-person-modal">
          <button class="remove-modal">
            <i class="fa-solid fa-xmark"></i>
          </button>
          <form class="add-person-form">

            <input 
              type="text"
              class="input"
              id="name"
              placeholder="Name"
              required
              maxLength="21"
            >

            <div class="item-header">
              <div class="item-name">ITEM</div>
              <div class="quantity">QTY</div>
              <div class="price">PRICE</div>
            </div>

            <div class="add-item-list add-person-item-list">
              
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
            </div>
            <button type="submit" class="add-person-btn">ADD</button>
          </form>
        </div>

        <div class="add-shared-modal">
          <button class="remove-modal">
            <i class="fa-solid fa-xmark"></i>
          </button>
          <form class="add-shared-form">
            <p class="name">Shared</p>
            <div class="item-header">
              <div class="item-name">ITEM</div>
              <div class="quantity">QTY</div>
              <div class="price">PRICE</div>
            </div>

            <div class="add-item-list add-shared-item-list">
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
                >
                <input 
                  type="number"
                  class="input"
                  id="price"
                  placeholder="$"
                  step="0.01"
                  onchange="(function(el){el.value=parseFloat(el.value).toFixed(2);})(this)"
                  required
                >
              </div>
              

              <div class="item-btns">
                <button class="add-item-btn add-item-shared">+</button>
                <button class="remove-item-btn remove-item-shared">-</button>
              </div>
              <div class="add-btn-margin"></div>
            </div>


            <button type="submit" class="add-shared-btn">ADD</button>
          </form>
        </div>

        <div class="split-modal">
          <button class="remove-modal">
            <i class="fa-solid fa-xmark"></i>
          </button>
          <form class="split-form">
            <input 
              type="text" 
              class="input"
              id="restaurant-name"
              placeholder="Enter restaurant"
              maxlength="18"
              required
            >
            <fieldset>
              <legend>Tip Amount</legend>
              <div class="radio">
                <div class="twenty">
                  <input type="radio" class="radio-btn" id="twenty" name="radio" value="0.2" checked/>
                  <label for="twenty">20%</label><br />
                </div>
                <div class="eighteen">
                  <input type="radio" class="radio-btn" id="eighteen" name="radio" value="0.18" />
                  <label for="eighteen">18%</label><br />
                </div> 
                <div class="fifteen">
                  <input type="radio" class="radio-btn" id="fifteen" name="radio" value="0.15" 
                          onChange=""/>
                  <label for="fifteen">15%</label>
                </div>            
              </div>
              
              <input 
                  type="number"
                  class="input"
                  id="custom"
                  placeholder="Custom Tip"
                  step="0.01"
                  onchange="(function(el){el.value=parseFloat(el.value).toFixed(2);})(this)"
                  min="0.00"
                >
            </fieldset>
            <button type="button" class="calculate">CALCULATE</button>
          </form>
        </div>
        <div class="bill-modal"></div>
        <div class="overlay"></div>
    `;
    UI.initButtons();
    UI.displayMealList();
  }

  static loadSavedBill() {
    const main = document.querySelector('main');
    main.innerHTML = '';

    const splitBtn = document.querySelector('.split');
    splitBtn.classList.remove('active');
    
    UI.initSavedBillButtons();
    UI.displayBillList();
  }

  static displayBillList() {
    const billList = _storage__WEBPACK_IMPORTED_MODULE_4__["default"].getBillList();
    const main = document.querySelector('main');
    const billGrid = document.createElement('div');
    billGrid.classList.add('bill-grid');

    for (const bill of billList.bills) {
      billGrid.appendChild(UI.makeBillCard(bill));
    }
    main.appendChild(billGrid);
    UI.initSavedBillButtons();
  }

  static makeBillCard(bill) {
    const billCard = document.createElement('div');
    billCard.classList.add('bill-card');
    billCard.innerHTML = `
      <button class="remove-modal remove-bill-card">
        <i class="fa-solid fa-xmark"></i>
      </button>
      <p class="name">${bill.restaurant}</p>
      <p class="date">Date: ${bill.date}</p>
    `;
    
    const mealTotalList = UI.makeBill(bill);
    for (let mealTotal of mealTotalList) {
      billCard.appendChild(mealTotal);
    }
    billCard.innerHTML += `
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
    `;
    return billCard;
  }

  static initSavedBillButtons() {
    const homeBtn = document.querySelector('.home');
    homeBtn.addEventListener('click', UI.loadHome);

    const removeBillBtns = document.querySelectorAll('.remove-bill-card');
    removeBillBtns.forEach((button) => {
      let date = button.nextSibling.nextSibling.nextSibling.nextSibling;
      const dateTime = date.textContent.slice(6);
      button.addEventListener('click', () => {
        UI.deleteBillCard(dateTime);

      });
    })
  }

  static deleteBillCard(billDate) {
    _storage__WEBPACK_IMPORTED_MODULE_4__["default"].deleteBill(billDate);
    UI.loadSavedBill();
  }

  static initHomeButtons() {
    const addPersonBtn = document.querySelector('.add-person');
    const addSharedBtn = document.querySelector('.add-shared');
    const removePersonCardBtns = document.querySelectorAll('.remove');
    const removeSharedCardBtn = document.querySelector('.remove-shared');
    const splitBtn = document.querySelector('.split');
    const savedBillBtn = document.querySelector('.saved-bills');

    splitBtn.classList.add('active');

    savedBillBtn.addEventListener('click', UI.loadSavedBill);
    
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
    
    // console.log(bill);
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
    UI.initSaveBillButton(bill);
    UI.initButtons();
   
  }

  static initSaveBillButton(bill) {
    const saveBillBtn = document.querySelector('.save-bill');
    saveBillBtn.addEventListener('click', () => {
      _storage__WEBPACK_IMPORTED_MODULE_4__["default"].addBill(bill);
      UI.closeAllModals();
      UI.loadSavedBill();
    });

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

    if (bill.sharedWithTotal !== null && bill.sharedWithTotal !== undefined)  {
      
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

  static deleteBill() {}

  static closeBillModal() {
    const billModal = document.querySelector('.bill-modal');
    const overlay = document.querySelector('.overlay');
    
    billModal.classList.remove('active');
    overlay.classList.remove('active');
  }

  static billify(restaurant, tipAmount) {
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
    
    console.log(_storage__WEBPACK_IMPORTED_MODULE_4__["default"].getBillList());                                                              
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

/***/ "./src/modules/billList.js":
/*!*********************************!*\
  !*** ./src/modules/billList.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ BillList)
/* harmony export */ });
class BillList {
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
/* harmony import */ var _billList__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./billList */ "./src/modules/billList.js");
/* harmony import */ var _bill__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./bill */ "./src/modules/bill.js");
/* harmony import */ var _person__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./person */ "./src/modules/person.js");
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./shared */ "./src/modules/shared.js");
/* harmony import */ var _item__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./item */ "./src/modules/item.js");







class Storage {
  static saveMealList(data) {
    localStorage.setItem('mealList', JSON.stringify(data));
  }

  static saveBillList(data) {
    localStorage.setItem('billList', JSON.stringify(data));
  }

  static getBillList() {
    const billList = Object.assign(
      new _billList__WEBPACK_IMPORTED_MODULE_1__["default"](),
      JSON.parse(localStorage.getItem('billList')));
    
      billList.setBills(
        billList.getBills().map((bill) => Object.assign(new _bill__WEBPACK_IMPORTED_MODULE_2__["default"](), bill))
      );

      billList.getBills().forEach((bill) => {
        // bill.peopleWithTotal.map((person[0]) => Object.assign(new Person(), person[0]))

        for (let personWithTotal of bill.peopleWithTotal) {
          personWithTotal[0] = Object.assign(new _person__WEBPACK_IMPORTED_MODULE_3__["default"](), personWithTotal[0]);

          personWithTotal[0].getItems().map((item) => Object.assign(new _item__WEBPACK_IMPORTED_MODULE_5__["default"](), item));
        }
        
        if (bill.sharedWithTotal !== null) {
          bill.sharedWithTotal[0].map((item) => Object.assign(new _item__WEBPACK_IMPORTED_MODULE_5__["default"](), item));
        }
        
      });

    return billList;
  }

  static getMealList() {
    const mealList = Object.assign(
      new _mealList__WEBPACK_IMPORTED_MODULE_0__["default"](), 
      JSON.parse(localStorage.getItem('mealList')));
    
      mealList.setPeople(
        mealList
          .getPeople()
          .map((person) => Object.assign(new _person__WEBPACK_IMPORTED_MODULE_3__["default"](), person))
      );

      mealList.setShared(
        Object.assign(new _shared__WEBPACK_IMPORTED_MODULE_4__["default"](), mealList.getShared())
      );

      mealList.getPeople().forEach((person) => {
        person.setItems(
          person.getItems().map((item) => Object.assign(new _item__WEBPACK_IMPORTED_MODULE_5__["default"](), item))
        );
      });

      if (mealList.getShared().getItems() !== undefined) {
            mealList.getShared().setItems(
              mealList.getShared()
              .getItems()
              .map((item) => Object.assign(new _item__WEBPACK_IMPORTED_MODULE_5__["default"](), item))
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQTtBQUNBO0FBQ0Esa0NBQWtDLDBDQUEwQztBQUM1RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUM3MUJlOzs7QUFHZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDN0ZlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQ3BCZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUM5QmU7QUFDZjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDMUNlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7O0FDOUJlOztBQUVmO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoQ2tDO0FBQ0E7QUFDUjtBQUNJO0FBQ0E7QUFDSDs7QUFFWjtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFVBQVUsaURBQVE7QUFDbEI7QUFDQTtBQUNBO0FBQ0EsNERBQTRELDZDQUFJO0FBQ2hFOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxpREFBaUQsK0NBQU07O0FBRXZELHdFQUF3RSw2Q0FBSTtBQUM1RTtBQUNBO0FBQ0E7QUFDQSxrRUFBa0UsNkNBQUk7QUFDdEU7QUFDQTtBQUNBLE9BQU87O0FBRVA7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsVUFBVSxpREFBUTtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkNBQTZDLCtDQUFNO0FBQ25EOztBQUVBO0FBQ0EsMEJBQTBCLCtDQUFNO0FBQ2hDOztBQUVBO0FBQ0E7QUFDQSw0REFBNEQsNkNBQUk7QUFDaEU7QUFDQSxPQUFPOztBQUVQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0NBQStDLDZDQUFJO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7OztVQy9HQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTjhCOztBQUU5Qiw4Q0FBOEMsbURBQUUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9tZWFsLXNwbGl0dGVyLy4vc3JjL21vZHVsZXMvVUkuanMiLCJ3ZWJwYWNrOi8vbWVhbC1zcGxpdHRlci8uL3NyYy9tb2R1bGVzL2JpbGwuanMiLCJ3ZWJwYWNrOi8vbWVhbC1zcGxpdHRlci8uL3NyYy9tb2R1bGVzL2JpbGxMaXN0LmpzIiwid2VicGFjazovL21lYWwtc3BsaXR0ZXIvLi9zcmMvbW9kdWxlcy9pdGVtLmpzIiwid2VicGFjazovL21lYWwtc3BsaXR0ZXIvLi9zcmMvbW9kdWxlcy9tZWFsTGlzdC5qcyIsIndlYnBhY2s6Ly9tZWFsLXNwbGl0dGVyLy4vc3JjL21vZHVsZXMvcGVyc29uLmpzIiwid2VicGFjazovL21lYWwtc3BsaXR0ZXIvLi9zcmMvbW9kdWxlcy9zaGFyZWQuanMiLCJ3ZWJwYWNrOi8vbWVhbC1zcGxpdHRlci8uL3NyYy9tb2R1bGVzL3N0b3JhZ2UuanMiLCJ3ZWJwYWNrOi8vbWVhbC1zcGxpdHRlci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9tZWFsLXNwbGl0dGVyL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9tZWFsLXNwbGl0dGVyL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vbWVhbC1zcGxpdHRlci93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL21lYWwtc3BsaXR0ZXIvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFBlcnNvbiBmcm9tICcuL3BlcnNvbic7XG5pbXBvcnQgSXRlbSBmcm9tICcuL2l0ZW0nO1xuaW1wb3J0IFNoYXJlZCBmcm9tICcuL3NoYXJlZCc7XG5pbXBvcnQgQmlsbCBmcm9tICcuL2JpbGwnO1xuaW1wb3J0IFN0b3JhZ2UgZnJvbSAnLi9zdG9yYWdlJztcblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSSB7XG4gIFxuXG4gIHN0YXRpYyBsb2FkSG9tZSgpIHtcbiAgICBjb25zdCBtYWluID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbWFpbicpO1xuICAgIG1haW4uaW5uZXJIVE1MID0gYFxuXG4gICAgICAgICAgPGRpdiBjbGFzcz1cIm1lYWwtZ3JpZFwiPlxuICAgICAgICAgIFxuXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImFkZC1jYXJkXCI+XG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYWRkLXBlcnNvblwiPkFERCBQRVJTT048L2J1dHRvbj5cbiAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJhZGQtc2hhcmVkXCI+QUREIFNIQVJFRDwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3M9XCJhZGQtcGVyc29uLW1vZGFsXCI+XG4gICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cInJlbW92ZS1tb2RhbFwiPlxuICAgICAgICAgICAgPGkgY2xhc3M9XCJmYS1zb2xpZCBmYS14bWFya1wiPjwvaT5cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8Zm9ybSBjbGFzcz1cImFkZC1wZXJzb24tZm9ybVwiPlxuXG4gICAgICAgICAgICA8aW5wdXQgXG4gICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgY2xhc3M9XCJpbnB1dFwiXG4gICAgICAgICAgICAgIGlkPVwibmFtZVwiXG4gICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiTmFtZVwiXG4gICAgICAgICAgICAgIHJlcXVpcmVkXG4gICAgICAgICAgICAgIG1heExlbmd0aD1cIjIxXCJcbiAgICAgICAgICAgID5cblxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIml0ZW0taGVhZGVyXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpdGVtLW5hbWVcIj5JVEVNPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJxdWFudGl0eVwiPlFUWTwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJpY2VcIj5QUklDRTwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhZGQtaXRlbS1saXN0IGFkZC1wZXJzb24taXRlbS1saXN0XCI+XG4gICAgICAgICAgICAgIFxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWRkLWl0ZW0gcGVyc29uXCI+XG4gICAgICAgICAgICAgICAgPGlucHV0IFxuICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgICAgY2xhc3M9XCJpbnB1dFwiXG4gICAgICAgICAgICAgICAgICBpZD1cIml0ZW1OYW1lXCJcbiAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiSXRlbVwiXG4gICAgICAgICAgICAgICAgICBtYXhsZW5ndGg9XCIxNlwiXG4gICAgICAgICAgICAgICAgICByZXF1aXJlZFxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8aW5wdXQgXG4gICAgICAgICAgICAgICAgICB0eXBlPVwibnVtYmVyXCJcbiAgICAgICAgICAgICAgICAgIGNsYXNzPVwiaW5wdXRcIlxuICAgICAgICAgICAgICAgICAgaWQ9XCJxdWFudGl0eVwiXG4gICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIiNcIlxuICAgICAgICAgICAgICAgICAgb25jaGFuZ2U9XCIoZnVuY3Rpb24oZWwpe2VsLnZhbHVlPXBhcnNlRmxvYXQoZWwudmFsdWUpLnRvRml4ZWQoMCk7fSkodGhpcylcIlxuICAgICAgICAgICAgICAgICAgc3RlcD1cIjFcIlxuICAgICAgICAgICAgICAgICAgcmVxdWlyZWRcbiAgICAgICAgICAgICAgICAgIG1pbj1cIjFcIlxuICAgICAgICAgICAgICAgICAgbWF4PVwiOTk5XCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPGlucHV0IFxuICAgICAgICAgICAgICAgICAgdHlwZT1cIm51bWJlclwiXG4gICAgICAgICAgICAgICAgICBjbGFzcz1cImlucHV0XCJcbiAgICAgICAgICAgICAgICAgIGlkPVwicHJpY2VcIlxuICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCIkXCJcbiAgICAgICAgICAgICAgICAgIHN0ZXA9XCIwLjAxXCJcbiAgICAgICAgICAgICAgICAgIG9uY2hhbmdlPVwiKGZ1bmN0aW9uKGVsKXtlbC52YWx1ZT1wYXJzZUZsb2F0KGVsLnZhbHVlKS50b0ZpeGVkKDIpO30pKHRoaXMpXCJcbiAgICAgICAgICAgICAgICAgIHJlcXVpcmVkXG4gICAgICAgICAgICAgICAgICBtaW49XCIwLjAxXCJcbiAgICAgICAgICAgICAgICAgIG1heD1cIjk5OTkuOTlcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIml0ZW0tYnRuc1wiPlxuICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJhZGQtaXRlbS1idG4gYWRkLWl0ZW0tcGVyc29uXCI+KzwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJyZW1vdmUtaXRlbS1idG4gcmVtb3ZlLWl0ZW0tcGVyc29uXCI+LTwvYnV0dG9uPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhZGQtYnRuLW1hcmdpblwiPjwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIiBjbGFzcz1cImFkZC1wZXJzb24tYnRuXCI+QUREPC9idXR0b24+XG4gICAgICAgICAgPC9mb3JtPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzPVwiYWRkLXNoYXJlZC1tb2RhbFwiPlxuICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJyZW1vdmUtbW9kYWxcIj5cbiAgICAgICAgICAgIDxpIGNsYXNzPVwiZmEtc29saWQgZmEteG1hcmtcIj48L2k+XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPGZvcm0gY2xhc3M9XCJhZGQtc2hhcmVkLWZvcm1cIj5cbiAgICAgICAgICAgIDxwIGNsYXNzPVwibmFtZVwiPlNoYXJlZDwvcD5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpdGVtLWhlYWRlclwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaXRlbS1uYW1lXCI+SVRFTTwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicXVhbnRpdHlcIj5RVFk8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByaWNlXCI+UFJJQ0U8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWRkLWl0ZW0tbGlzdCBhZGQtc2hhcmVkLWl0ZW0tbGlzdFwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWRkLWl0ZW0gc2hhcmVkXCI+XG4gICAgICAgICAgICAgICAgPGlucHV0IFxuICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgICAgY2xhc3M9XCJpbnB1dFwiXG4gICAgICAgICAgICAgICAgICBpZD1cIml0ZW1OYW1lXCJcbiAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiSXRlbVwiXG4gICAgICAgICAgICAgICAgICBtYXhsZW5ndGg9XCIxNlwiXG4gICAgICAgICAgICAgICAgICByZXF1aXJlZFxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8aW5wdXQgXG4gICAgICAgICAgICAgICAgICB0eXBlPVwibnVtYmVyXCJcbiAgICAgICAgICAgICAgICAgIGNsYXNzPVwiaW5wdXRcIlxuICAgICAgICAgICAgICAgICAgaWQ9XCJxdWFudGl0eVwiXG4gICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIiNcIlxuICAgICAgICAgICAgICAgICAgb25jaGFuZ2U9XCIoZnVuY3Rpb24oZWwpe2VsLnZhbHVlPXBhcnNlRmxvYXQoZWwudmFsdWUpLnRvRml4ZWQoMCk7fSkodGhpcylcIlxuICAgICAgICAgICAgICAgICAgc3RlcD1cIjFcIlxuICAgICAgICAgICAgICAgICAgcmVxdWlyZWRcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPGlucHV0IFxuICAgICAgICAgICAgICAgICAgdHlwZT1cIm51bWJlclwiXG4gICAgICAgICAgICAgICAgICBjbGFzcz1cImlucHV0XCJcbiAgICAgICAgICAgICAgICAgIGlkPVwicHJpY2VcIlxuICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCIkXCJcbiAgICAgICAgICAgICAgICAgIHN0ZXA9XCIwLjAxXCJcbiAgICAgICAgICAgICAgICAgIG9uY2hhbmdlPVwiKGZ1bmN0aW9uKGVsKXtlbC52YWx1ZT1wYXJzZUZsb2F0KGVsLnZhbHVlKS50b0ZpeGVkKDIpO30pKHRoaXMpXCJcbiAgICAgICAgICAgICAgICAgIHJlcXVpcmVkXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgXG5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIml0ZW0tYnRuc1wiPlxuICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJhZGQtaXRlbS1idG4gYWRkLWl0ZW0tc2hhcmVkXCI+KzwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJyZW1vdmUtaXRlbS1idG4gcmVtb3ZlLWl0ZW0tc2hhcmVkXCI+LTwvYnV0dG9uPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFkZC1idG4tbWFyZ2luXCI+PC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cblxuXG4gICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIiBjbGFzcz1cImFkZC1zaGFyZWQtYnRuXCI+QUREPC9idXR0b24+XG4gICAgICAgICAgPC9mb3JtPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzPVwic3BsaXQtbW9kYWxcIj5cbiAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwicmVtb3ZlLW1vZGFsXCI+XG4gICAgICAgICAgICA8aSBjbGFzcz1cImZhLXNvbGlkIGZhLXhtYXJrXCI+PC9pPlxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDxmb3JtIGNsYXNzPVwic3BsaXQtZm9ybVwiPlxuICAgICAgICAgICAgPGlucHV0IFxuICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiIFxuICAgICAgICAgICAgICBjbGFzcz1cImlucHV0XCJcbiAgICAgICAgICAgICAgaWQ9XCJyZXN0YXVyYW50LW5hbWVcIlxuICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIkVudGVyIHJlc3RhdXJhbnRcIlxuICAgICAgICAgICAgICBtYXhsZW5ndGg9XCIxOFwiXG4gICAgICAgICAgICAgIHJlcXVpcmVkXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICA8ZmllbGRzZXQ+XG4gICAgICAgICAgICAgIDxsZWdlbmQ+VGlwIEFtb3VudDwvbGVnZW5kPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicmFkaW9cIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidHdlbnR5XCI+XG4gICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInJhZGlvXCIgY2xhc3M9XCJyYWRpby1idG5cIiBpZD1cInR3ZW50eVwiIG5hbWU9XCJyYWRpb1wiIHZhbHVlPVwiMC4yXCIgY2hlY2tlZC8+XG4gICAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwidHdlbnR5XCI+MjAlPC9sYWJlbD48YnIgLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZWlnaHRlZW5cIj5cbiAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwicmFkaW9cIiBjbGFzcz1cInJhZGlvLWJ0blwiIGlkPVwiZWlnaHRlZW5cIiBuYW1lPVwicmFkaW9cIiB2YWx1ZT1cIjAuMThcIiAvPlxuICAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cImVpZ2h0ZWVuXCI+MTglPC9sYWJlbD48YnIgLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj4gXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZpZnRlZW5cIj5cbiAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwicmFkaW9cIiBjbGFzcz1cInJhZGlvLWJ0blwiIGlkPVwiZmlmdGVlblwiIG5hbWU9XCJyYWRpb1wiIHZhbHVlPVwiMC4xNVwiIFxuICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT1cIlwiLz5cbiAgICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJmaWZ0ZWVuXCI+MTUlPC9sYWJlbD5cbiAgICAgICAgICAgICAgICA8L2Rpdj4gICAgICAgICAgICBcbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIFxuICAgICAgICAgICAgICA8aW5wdXQgXG4gICAgICAgICAgICAgICAgICB0eXBlPVwibnVtYmVyXCJcbiAgICAgICAgICAgICAgICAgIGNsYXNzPVwiaW5wdXRcIlxuICAgICAgICAgICAgICAgICAgaWQ9XCJjdXN0b21cIlxuICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJDdXN0b20gVGlwXCJcbiAgICAgICAgICAgICAgICAgIHN0ZXA9XCIwLjAxXCJcbiAgICAgICAgICAgICAgICAgIG9uY2hhbmdlPVwiKGZ1bmN0aW9uKGVsKXtlbC52YWx1ZT1wYXJzZUZsb2F0KGVsLnZhbHVlKS50b0ZpeGVkKDIpO30pKHRoaXMpXCJcbiAgICAgICAgICAgICAgICAgIG1pbj1cIjAuMDBcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgIDwvZmllbGRzZXQ+XG4gICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImNhbGN1bGF0ZVwiPkNBTENVTEFURTwvYnV0dG9uPlxuICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJiaWxsLW1vZGFsXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJvdmVybGF5XCI+PC9kaXY+XG4gICAgYDtcbiAgICBVSS5pbml0QnV0dG9ucygpO1xuICAgIFVJLmRpc3BsYXlNZWFsTGlzdCgpO1xuICB9XG5cbiAgc3RhdGljIGxvYWRTYXZlZEJpbGwoKSB7XG4gICAgY29uc3QgbWFpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ21haW4nKTtcbiAgICBtYWluLmlubmVySFRNTCA9ICcnO1xuXG4gICAgY29uc3Qgc3BsaXRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3BsaXQnKTtcbiAgICBzcGxpdEJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcbiAgICBcbiAgICBVSS5pbml0U2F2ZWRCaWxsQnV0dG9ucygpO1xuICAgIFVJLmRpc3BsYXlCaWxsTGlzdCgpO1xuICB9XG5cbiAgc3RhdGljIGRpc3BsYXlCaWxsTGlzdCgpIHtcbiAgICBjb25zdCBiaWxsTGlzdCA9IFN0b3JhZ2UuZ2V0QmlsbExpc3QoKTtcbiAgICBjb25zdCBtYWluID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbWFpbicpO1xuICAgIGNvbnN0IGJpbGxHcmlkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgYmlsbEdyaWQuY2xhc3NMaXN0LmFkZCgnYmlsbC1ncmlkJyk7XG5cbiAgICBmb3IgKGNvbnN0IGJpbGwgb2YgYmlsbExpc3QuYmlsbHMpIHtcbiAgICAgIGJpbGxHcmlkLmFwcGVuZENoaWxkKFVJLm1ha2VCaWxsQ2FyZChiaWxsKSk7XG4gICAgfVxuICAgIG1haW4uYXBwZW5kQ2hpbGQoYmlsbEdyaWQpO1xuICAgIFVJLmluaXRTYXZlZEJpbGxCdXR0b25zKCk7XG4gIH1cblxuICBzdGF0aWMgbWFrZUJpbGxDYXJkKGJpbGwpIHtcbiAgICBjb25zdCBiaWxsQ2FyZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGJpbGxDYXJkLmNsYXNzTGlzdC5hZGQoJ2JpbGwtY2FyZCcpO1xuICAgIGJpbGxDYXJkLmlubmVySFRNTCA9IGBcbiAgICAgIDxidXR0b24gY2xhc3M9XCJyZW1vdmUtbW9kYWwgcmVtb3ZlLWJpbGwtY2FyZFwiPlxuICAgICAgICA8aSBjbGFzcz1cImZhLXNvbGlkIGZhLXhtYXJrXCI+PC9pPlxuICAgICAgPC9idXR0b24+XG4gICAgICA8cCBjbGFzcz1cIm5hbWVcIj4ke2JpbGwucmVzdGF1cmFudH08L3A+XG4gICAgICA8cCBjbGFzcz1cImRhdGVcIj5EYXRlOiAke2JpbGwuZGF0ZX08L3A+XG4gICAgYDtcbiAgICBcbiAgICBjb25zdCBtZWFsVG90YWxMaXN0ID0gVUkubWFrZUJpbGwoYmlsbCk7XG4gICAgZm9yIChsZXQgbWVhbFRvdGFsIG9mIG1lYWxUb3RhbExpc3QpIHtcbiAgICAgIGJpbGxDYXJkLmFwcGVuZENoaWxkKG1lYWxUb3RhbCk7XG4gICAgfVxuICAgIGJpbGxDYXJkLmlubmVySFRNTCArPSBgXG4gICAgICA8ZGl2IGNsYXNzPVwic3VtbWFyeVwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwidGl0bGVzXCI+XG4gICAgICAgICAgPHA+U1VCVE9UQUw6IDwvcD5cbiAgICAgICAgICA8cD5UQVg6IDwvcD5cbiAgICAgICAgICA8cD5USVA6IDwvcD5cbiAgICAgICAgICA8cD5UT1RBTDogPC9wPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm51bWJlcnNcIj5cbiAgICAgICAgICA8cCBjbGFzcz1cInN1YnRvdGFsXCI+JCAke2JpbGwuc3VidG90YWx9PC9wPlxuICAgICAgICAgIDxwIGNsYXNzPVwidGF4XCI+JCAke2JpbGwudGF4fTwvcD5cbiAgICAgICAgICA8cCBjbGFzcz1cInRpcFwiPiQgJHtiaWxsLnRpcH08L3A+XG4gICAgICAgICAgPHAgY2xhc3M9XCJ0b3RhbFwiPiQgJHtiaWxsLnRvdGFsfTwvcD5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICBgO1xuICAgIHJldHVybiBiaWxsQ2FyZDtcbiAgfVxuXG4gIHN0YXRpYyBpbml0U2F2ZWRCaWxsQnV0dG9ucygpIHtcbiAgICBjb25zdCBob21lQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhvbWUnKTtcbiAgICBob21lQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgVUkubG9hZEhvbWUpO1xuXG4gICAgY29uc3QgcmVtb3ZlQmlsbEJ0bnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucmVtb3ZlLWJpbGwtY2FyZCcpO1xuICAgIHJlbW92ZUJpbGxCdG5zLmZvckVhY2goKGJ1dHRvbikgPT4ge1xuICAgICAgbGV0IGRhdGUgPSBidXR0b24ubmV4dFNpYmxpbmcubmV4dFNpYmxpbmcubmV4dFNpYmxpbmcubmV4dFNpYmxpbmc7XG4gICAgICBjb25zdCBkYXRlVGltZSA9IGRhdGUudGV4dENvbnRlbnQuc2xpY2UoNik7XG4gICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIFVJLmRlbGV0ZUJpbGxDYXJkKGRhdGVUaW1lKTtcblxuICAgICAgfSk7XG4gICAgfSlcbiAgfVxuXG4gIHN0YXRpYyBkZWxldGVCaWxsQ2FyZChiaWxsRGF0ZSkge1xuICAgIFN0b3JhZ2UuZGVsZXRlQmlsbChiaWxsRGF0ZSk7XG4gICAgVUkubG9hZFNhdmVkQmlsbCgpO1xuICB9XG5cbiAgc3RhdGljIGluaXRIb21lQnV0dG9ucygpIHtcbiAgICBjb25zdCBhZGRQZXJzb25CdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRkLXBlcnNvbicpO1xuICAgIGNvbnN0IGFkZFNoYXJlZEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hZGQtc2hhcmVkJyk7XG4gICAgY29uc3QgcmVtb3ZlUGVyc29uQ2FyZEJ0bnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucmVtb3ZlJyk7XG4gICAgY29uc3QgcmVtb3ZlU2hhcmVkQ2FyZEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yZW1vdmUtc2hhcmVkJyk7XG4gICAgY29uc3Qgc3BsaXRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3BsaXQnKTtcbiAgICBjb25zdCBzYXZlZEJpbGxCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2F2ZWQtYmlsbHMnKTtcblxuICAgIHNwbGl0QnRuLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuXG4gICAgc2F2ZWRCaWxsQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgVUkubG9hZFNhdmVkQmlsbCk7XG4gICAgXG4gICAgYWRkUGVyc29uQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgVUkub3BlbkFkZFBlcnNvbk1vZGFsKTtcbiAgICBhZGRTaGFyZWRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBVSS5vcGVuQWRkU2hhcmVkTW9kYWwpO1xuICAgIHJlbW92ZVBlcnNvbkNhcmRCdG5zLmZvckVhY2goKGJ1dHRvbikgPT4ge1xuICAgICAgY29uc3QgbmFtZSA9IGJ1dHRvbi5uZXh0U2libGluZy5uZXh0U2libGluZztcbiAgICAgIFxuICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICBVSS5kZWxldGVQZXJzb25DYXJkKG5hbWUudGV4dENvbnRlbnQpO1xuICAgICAgfSk7XG4gICAgfSlcbiAgICBpZiAoU3RvcmFnZS5nZXRNZWFsTGlzdCgpLmdldFNoYXJlZCgpLmdldEl0ZW1zKCkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmVtb3ZlU2hhcmVkQ2FyZEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIFVJLmRlbGV0ZVNoYXJlZENhcmQpO1xuICAgICAgYWRkU2hhcmVkQnRuLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xuICAgIH1cbiAgICBzcGxpdEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIFVJLm9wZW5TcGxpdE1vZGFsKTtcbiAgfVxuXG4gIHN0YXRpYyBvcGVuU3BsaXRNb2RhbChlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNvbnN0IHNwbGl0TW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3BsaXQtbW9kYWwnKTtcbiAgICBjb25zdCBvdmVybGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm92ZXJsYXknKTtcblxuICAgIHNwbGl0TW9kYWwuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgb3ZlcmxheS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICBcbiAgICBVSS5pbml0QnV0dG9ucygpO1xuICB9XG5cbiAgc3RhdGljIGNsb3NlU3BsaXRNb2RhbCgpIHtcbiAgICBjb25zdCBzcGxpdE1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNwbGl0LW1vZGFsJyk7XG4gICAgY29uc3Qgc3BsaXRGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNwbGl0LWZvcm0nKTtcbiAgICBjb25zdCBvdmVybGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm92ZXJsYXknKTtcblxuICAgIHNwbGl0TW9kYWwuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG4gICAgc3BsaXRGb3JtLnJlc2V0KCk7XG4gICAgb3ZlcmxheS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcbiAgfVxuXG4gIHN0YXRpYyBpbml0QnV0dG9ucygpIHtcbiAgICBjb25zdCBhZGRQZXJzb25CdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRkLXBlcnNvbicpO1xuICAgIGNvbnN0IGFkZFBlcnNvbkZyb20gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRkLXBlcnNvbi1mb3JtJyk7XG4gICAgY29uc3QgYWRkU2hhcmVkQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFkZC1zaGFyZWQnKTtcbiAgICBjb25zdCBhZGRTaGFyZWRGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFkZC1zaGFyZWQtZm9ybScpO1xuICAgIGNvbnN0IGNsb3NlTW9kYWxCdG5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnJlbW92ZS1tb2RhbCcpO1xuICAgIGNvbnN0IG92ZXJsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcub3ZlcmxheScpO1xuICAgIFxuICAgIGNvbnN0IGFkZFBlcnNvbkl0ZW1CdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRkLWl0ZW0tcGVyc29uJyk7XG4gICAgY29uc3QgcmVtb3ZlUGVyc29uSXRlbUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yZW1vdmUtaXRlbS1wZXJzb24nKTtcblxuICAgIGNvbnN0IGFkZFNoYXJlZEl0ZW1CdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRkLWl0ZW0tc2hhcmVkJyk7XG4gICAgY29uc3QgcmVtb3ZlU2hhcmVkSXRlbUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yZW1vdmUtaXRlbS1zaGFyZWQnKTtcblxuICAgIGNvbnN0IGNhbGN1bGF0ZUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jYWxjdWxhdGUnKTtcbiAgICBcblxuICAgIFxuXG4gICAgYWRkUGVyc29uQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgVUkub3BlbkFkZFBlcnNvbk1vZGFsKTtcbiAgICBhZGRQZXJzb25Gcm9tLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIFVJLmFkZFBlcnNvbik7XG4gICAgYWRkU2hhcmVkQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgVUkub3BlbkFkZFNoYXJlZE1vZGFsKTtcbiAgICBhZGRTaGFyZWRGb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIFVJLmFkZFNoYXJlZCk7XG4gICAgY2xvc2VNb2RhbEJ0bnMuZm9yRWFjaCgoYnV0dG9uKSA9PiB7XG4gICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBVSS5jbG9zZUFsbE1vZGFscyk7XG4gICAgfSk7XG4gICAgb3ZlcmxheS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIFVJLmNsb3NlQWxsTW9kYWxzKTtcblxuICAgIGFkZFBlcnNvbkl0ZW1CdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBVSS5hZGRJdGVtKTtcbiAgICByZW1vdmVQZXJzb25JdGVtQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgVUkucmVtb3ZlSXRlbSk7XG4gICAgYWRkU2hhcmVkSXRlbUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIFVJLmFkZEl0ZW0pO1xuICAgIHJlbW92ZVNoYXJlZEl0ZW1CdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBVSS5yZW1vdmVJdGVtKTtcblxuICAgIGNhbGN1bGF0ZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIFVJLm9wZW5CaWxsTW9kYWwpO1xuICB9XG5cbiAgc3RhdGljIG9wZW5CaWxsTW9kYWwoKSB7XG4gICAgY29uc3QgYmlsbE1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJpbGwtbW9kYWwnKTtcbiAgICBjb25zdCBvdmVybGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm92ZXJsYXknKTtcbiAgICBcbiAgICBjb25zdCByZXN0YXVyYW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlc3RhdXJhbnQtbmFtZScpLnZhbHVlO1xuICAgIGlmIChyZXN0YXVyYW50ID09PSBcIlwiKSB7XG4gICAgICBhbGVydChcIkVudGVyIHJlc3RhdXJhbnQgbmFtZSFcIik7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IHRpcEJ0bnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucmFkaW8tYnRuJyk7XG4gICAgY29uc3QgY3VzdG9tQW10ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2N1c3RvbScpLnZhbHVlO1xuICAgIGxldCB0aXBBbW91bnQgPSAwLjA7XG4gICAgdGlwQnRucy5mb3JFYWNoKCh0aXBCdG4pID0+IHtcbiAgICAgIGlmICh0aXBCdG4uY2hlY2tlZCkge1xuICAgICAgICB0aXBBbW91bnQgPSB0aXBCdG4udmFsdWU7XG4gICAgICB9XG4gICAgfSk7XG4gICAgaWYgKGN1c3RvbUFtdCAhPT0gXCJcIikge1xuICAgICAgdGlwQW1vdW50ID0gY3VzdG9tQW10O1xuICAgIH1cbiAgICBVSS5jbG9zZUFsbE1vZGFscygpO1xuICAgIFxuXG4gICAgXG4gICAgY29uc3QgYmlsbCA9IFVJLmJpbGxpZnkocmVzdGF1cmFudCwgdGlwQW1vdW50KTtcbiAgICBcbiAgICAvLyBjb25zb2xlLmxvZyhiaWxsKTtcbiAgICBiaWxsTW9kYWwuaW5uZXJIVE1MID0gYFxuICAgICAgPGJ1dHRvbiBjbGFzcz1cInJlbW92ZS1tb2RhbFwiPlxuICAgICAgPGkgY2xhc3M9XCJmYS1zb2xpZCBmYS14bWFya1wiPjwvaT5cbiAgICAgIDwvYnV0dG9uPlxuICAgICAgPHAgY2xhc3M9XCJuYW1lXCI+JHtiaWxsLnJlc3RhdXJhbnR9PC9wPlxuICAgICAgPHAgY2xhc3M9XCJkYXRlXCI+RGF0ZTogJHtiaWxsLmRhdGV9PC9wPlxuICAgIGA7XG4gICAgXG4gICAgY29uc3QgbWVhbFRvdGFsTGlzdCA9IFVJLm1ha2VCaWxsKGJpbGwpO1xuICAgIGZvciAobGV0IG1lYWxUb3RhbCBvZiBtZWFsVG90YWxMaXN0KSB7XG4gICAgICBiaWxsTW9kYWwuYXBwZW5kQ2hpbGQobWVhbFRvdGFsKTtcbiAgICB9XG4gICAgYmlsbE1vZGFsLmlubmVySFRNTCArPSBgXG4gICAgICA8ZGl2IGNsYXNzPVwic3VtbWFyeVwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwidGl0bGVzXCI+XG4gICAgICAgICAgPHA+U1VCVE9UQUw6IDwvcD5cbiAgICAgICAgICA8cD5UQVg6IDwvcD5cbiAgICAgICAgICA8cD5USVA6IDwvcD5cbiAgICAgICAgICA8cD5UT1RBTDogPC9wPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm51bWJlcnNcIj5cbiAgICAgICAgICA8cCBjbGFzcz1cInN1YnRvdGFsXCI+JCAke2JpbGwuc3VidG90YWx9PC9wPlxuICAgICAgICAgIDxwIGNsYXNzPVwidGF4XCI+JCAke2JpbGwudGF4fTwvcD5cbiAgICAgICAgICA8cCBjbGFzcz1cInRpcFwiPiQgJHtiaWxsLnRpcH08L3A+XG4gICAgICAgICAgPHAgY2xhc3M9XCJ0b3RhbFwiPiQgJHtiaWxsLnRvdGFsfTwvcD5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwic2F2ZS1iaWxsXCI+U0FWRTwvYnV0dG9uPlxuICAgIGA7XG4gICAgYmlsbE1vZGFsLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgIG92ZXJsYXkuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgVUkuaW5pdFNhdmVCaWxsQnV0dG9uKGJpbGwpO1xuICAgIFVJLmluaXRCdXR0b25zKCk7XG4gICBcbiAgfVxuXG4gIHN0YXRpYyBpbml0U2F2ZUJpbGxCdXR0b24oYmlsbCkge1xuICAgIGNvbnN0IHNhdmVCaWxsQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNhdmUtYmlsbCcpO1xuICAgIHNhdmVCaWxsQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgU3RvcmFnZS5hZGRCaWxsKGJpbGwpO1xuICAgICAgVUkuY2xvc2VBbGxNb2RhbHMoKTtcbiAgICAgIFVJLmxvYWRTYXZlZEJpbGwoKTtcbiAgICB9KTtcblxuICB9XG5cbiAgc3RhdGljIG1ha2VCaWxsKGJpbGwpIHtcbiAgICBjb25zdCBtZWFsVG90YWxMaXN0ID0gW107XG4gICAgXG4gICAgYmlsbC5wZW9wbGVXaXRoVG90YWwuZm9yRWFjaCgocGVyc29uKSA9PiB7XG4gICAgICBjb25zdCBtZWFsVG90YWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIG1lYWxUb3RhbC5jbGFzc0xpc3QuYWRkKCdtZWFsLXRvdGFsJyk7XG5cbiAgICAgIGNvbnN0IHBlcnNvblRvdGFsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgcGVyc29uVG90YWwuY2xhc3NMaXN0LmFkZCgncGVyc29uLXRvdGFsJyk7XG4gICAgICBwZXJzb25Ub3RhbC50ZXh0Q29udGVudCA9IHBlcnNvblswXS5uYW1lICsgJzogJCAnICsgcGVyc29uWzFdO1xuXG4gICAgICBjb25zdCBpdGVtSGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBpdGVtSGVhZGVyLmNsYXNzTGlzdC5hZGQoJ2l0ZW0taGVhZGVyJyk7XG4gICAgICBpdGVtSGVhZGVyLmlubmVySFRNTCA9IGBcbiAgICAgICAgPGRpdiBjbGFzcz1cIml0ZW0tbmFtZVwiPklURU08L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInF1YW50aXR5XCI+UVRZPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJwcmljZVwiPlBSSUNFPC9kaXY+XG4gICAgICBgO1xuXG4gICAgICBtZWFsVG90YWwuYXBwZW5kQ2hpbGQocGVyc29uVG90YWwpO1xuICAgICAgbWVhbFRvdGFsLmFwcGVuZENoaWxkKGl0ZW1IZWFkZXIpO1xuICAgICAgbWVhbFRvdGFsLmFwcGVuZENoaWxkKFVJLm1ha2VJdGVtTGlzdChwZXJzb25bMF0uaXRlbXMpKTtcbiAgICAgIFxuICAgICAgbWVhbFRvdGFsTGlzdC5wdXNoKG1lYWxUb3RhbCk7XG4gICAgfSlcblxuICAgIGlmIChiaWxsLnNoYXJlZFdpdGhUb3RhbCAhPT0gbnVsbCAmJiBiaWxsLnNoYXJlZFdpdGhUb3RhbCAhPT0gdW5kZWZpbmVkKSAge1xuICAgICAgXG4gICAgICBjb25zdCBtZWFsVG90YWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIG1lYWxUb3RhbC5jbGFzc0xpc3QuYWRkKCdtZWFsLXRvdGFsJyk7XG5cbiAgICAgIGNvbnN0IHBlcnNvblRvdGFsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgcGVyc29uVG90YWwuY2xhc3NMaXN0LmFkZCgncGVyc29uLXRvdGFsJyk7XG4gICAgICBwZXJzb25Ub3RhbC50ZXh0Q29udGVudCA9IFwiU2hhcmVkXCI7XG4gICAgICAvLyArICc6ICQgJyArIGJpbGwuc2hhcmVkV2l0aFRvdGFsWzFdICsgXCIgRWFjaFwiXG5cbiAgICAgIGNvbnN0IGl0ZW1IZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIGl0ZW1IZWFkZXIuY2xhc3NMaXN0LmFkZCgnaXRlbS1oZWFkZXInKTtcbiAgICAgIGl0ZW1IZWFkZXIuaW5uZXJIVE1MID0gYFxuICAgICAgICA8ZGl2IGNsYXNzPVwiaXRlbS1uYW1lXCI+SVRFTTwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwicXVhbnRpdHlcIj5RVFk8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInByaWNlXCI+UFJJQ0U8L2Rpdj5cbiAgICAgIGA7XG5cbiAgICAgIG1lYWxUb3RhbC5hcHBlbmRDaGlsZChwZXJzb25Ub3RhbCk7XG4gICAgICBtZWFsVG90YWwuYXBwZW5kQ2hpbGQoaXRlbUhlYWRlcik7XG4gICAgICBtZWFsVG90YWwuYXBwZW5kQ2hpbGQoVUkubWFrZUl0ZW1MaXN0KGJpbGwuc2hhcmVkV2l0aFRvdGFsWzBdKSk7XG4gICAgICBtZWFsVG90YWxMaXN0LnB1c2gobWVhbFRvdGFsKTtcbiAgICB9XG4gICAgcmV0dXJuIG1lYWxUb3RhbExpc3Q7XG4gIH1cblxuICBzdGF0aWMgZGVsZXRlQmlsbCgpIHt9XG5cbiAgc3RhdGljIGNsb3NlQmlsbE1vZGFsKCkge1xuICAgIGNvbnN0IGJpbGxNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5iaWxsLW1vZGFsJyk7XG4gICAgY29uc3Qgb3ZlcmxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5vdmVybGF5Jyk7XG4gICAgXG4gICAgYmlsbE1vZGFsLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuICAgIG92ZXJsYXkuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG4gIH1cblxuICBzdGF0aWMgYmlsbGlmeShyZXN0YXVyYW50LCB0aXBBbW91bnQpIHtcbiAgICBjb25zdCBtZWFsTGlzdCA9IFN0b3JhZ2UuZ2V0TWVhbExpc3QoKTtcbiAgICBjb25zdCBuZXdCaWxsID0gbmV3IEJpbGwocmVzdGF1cmFudCk7XG4gICAgbmV3QmlsbC5kYXRlID0gbmV3QmlsbC5nZXREYXRlKCk7XG4gICAgbmV3QmlsbC5zdWJ0b3RhbCA9IG5ld0JpbGwuY2FsY3VsYXRlU3VidG90YWwobWVhbExpc3QucGVvcGxlLCBtZWFsTGlzdC5zaGFyZWQpO1xuICAgIG5ld0JpbGwudGF4ID0gbmV3QmlsbC5jYWxjdWxhdGVUYXgobmV3QmlsbC5zdWJ0b3RhbCk7XG4gICAgbmV3QmlsbC50aXAgPSBuZXdCaWxsLmNhbGN1bGF0ZVRpcChuZXdCaWxsLnN1YnRvdGFsLCB0aXBBbW91bnQpO1xuICAgIG5ld0JpbGwudG90YWwgPSBuZXdCaWxsLmNhbGN1bGF0ZVRvdGFsKG5ld0JpbGwuc3VidG90YWwsIG5ld0JpbGwudGF4LCBuZXdCaWxsLnRpcCk7XG4gICAgbmV3QmlsbC5zaGFyZWRXaXRoVG90YWwgPSBuZXdCaWxsLmNhbGN1bGF0ZVNoYXJlZFdpdGhUb3RhbChtZWFsTGlzdC5zaGFyZWQsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld0JpbGwuc3VidG90YWwsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld0JpbGwudGF4LCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdCaWxsLnRpcCk7XG4gICAgbmV3QmlsbC5wZW9wbGVXaXRoVG90YWwgPSBuZXdCaWxsLmNhbGN1bGF0ZVBlb3BsZVdpdGhUb3RhbChtZWFsTGlzdC5wZW9wbGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3QmlsbC5zaGFyZWRXaXRoVG90YWwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3QmlsbC5zdWJ0b3RhbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdCaWxsLnRheCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdCaWxsLnRpcCk7XG4gICAgXG4gICAgY29uc29sZS5sb2coU3RvcmFnZS5nZXRCaWxsTGlzdCgpKTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgIHJldHVybiBuZXdCaWxsO1xuICB9XG5cbiAgc3RhdGljIGRlbGV0ZVBlcnNvbkNhcmQobmFtZSkge1xuICAgIFN0b3JhZ2UuZGVsZXRlUGVyc29uKG5hbWUpO1xuICAgIFVJLmRpc3BsYXlNZWFsTGlzdCgpO1xuICB9XG5cbiAgc3RhdGljIGRlbGV0ZVNoYXJlZENhcmQoKSB7XG4gICAgU3RvcmFnZS5kZWxldGVTaGFyZWQoKTtcbiAgICBjb25zdCBhZGRTaGFyZWRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRkLXNoYXJlZCcpO1xuICAgIGFkZFNoYXJlZEJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcbiAgICBVSS5kaXNwbGF5TWVhbExpc3QoKTtcbiAgfVxuXG4gIHN0YXRpYyBkaXNwbGF5TWVhbExpc3QoKSB7XG4gICAgY29uc3QgbWVhbExpc3QgPSBTdG9yYWdlLmdldE1lYWxMaXN0KCk7XG4gICAgY29uc29sZS5sb2cobWVhbExpc3QpO1xuICAgIGNvbnN0IG1lYWxHcmlkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1lYWwtZ3JpZCcpO1xuICAgIG1lYWxHcmlkLmlubmVySFRNTCA9ICcnO1xuICAgIGNvbnN0IGFkZENhcmRCdG5zID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgYWRkQ2FyZEJ0bnMuY2xhc3NMaXN0LmFkZCgnYWRkLWNhcmQnKTtcbiAgICBhZGRDYXJkQnRucy5pbm5lckhUTUwgPSBgXG4gICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImFkZC1wZXJzb25cIj5BREQgUEVSU09OPC9idXR0b24+XG4gICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImFkZC1zaGFyZWRcIj5BREQgU0hBUkVEPC9idXR0b24+YFxuICAgIG1lYWxHcmlkLmFwcGVuZENoaWxkKGFkZENhcmRCdG5zKVxuICAgIFxuICAgIGNvbnN0IGFkZENhcmRCdG4gPSBtZWFsR3JpZC5xdWVyeVNlbGVjdG9yKCcuYWRkLWNhcmQnKTtcblxuICAgIGlmIChtZWFsTGlzdC5nZXRTaGFyZWQoKS5nZXRJdGVtcygpICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIG1lYWxHcmlkLmluc2VydEJlZm9yZShVSS5tYWtlTWVhbENhcmQobWVhbExpc3Quc2hhcmVkKSwgYWRkQ2FyZEJ0bik7XG4gICAgfVxuICAgIFxuICAgIGZvciAoY29uc3QgcGVyc29uIG9mIG1lYWxMaXN0LnBlb3BsZSkge1xuICAgICAgbWVhbEdyaWQuaW5zZXJ0QmVmb3JlKFVJLm1ha2VNZWFsQ2FyZChwZXJzb24pLCBhZGRDYXJkQnRuKTtcbiAgICB9XG4gICAgXG4gICAgVUkuaW5pdEhvbWVCdXR0b25zKCk7XG4gIH1cblxuICBzdGF0aWMgbWFrZU1lYWxDYXJkKHBlcnNvbikge1xuICAgIGNvbnN0IG5hbWUgPSBwZXJzb24ubmFtZTtcblxuICAgIGNvbnN0IG1lYWxDYXJkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgbWVhbENhcmQuY2xhc3NMaXN0LmFkZCgnbWVhbC1jYXJkJyk7XG5cbiAgICBpZiAobmFtZSA9PT0gXCJTaGFyZWRcIikge1xuICAgICAgbWVhbENhcmQuaW5uZXJIVE1MID0gYFxuICAgICAgICA8YnV0dG9uIGNsYXNzPVwicmVtb3ZlLXNoYXJlZFwiPlxuICAgICAgICAgIDxpIGNsYXNzPVwiZmEtc29saWQgZmEteG1hcmtcIj48L2k+XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8cCBjbGFzcz1cIm5hbWVcIj4ke25hbWV9PC9wPlxuXG4gICAgICAgIDxkaXYgY2xhc3M9XCJpdGVtLWhlYWRlclwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJpdGVtLW5hbWVcIj5JVEVNPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInF1YW50aXR5XCI+UVRZPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInByaWNlXCI+UFJJQ0U8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgYDtcbiAgICB9IGVsc2Uge1xuICAgICAgbWVhbENhcmQuaW5uZXJIVE1MID0gYFxuICAgICAgICA8YnV0dG9uIGNsYXNzPVwicmVtb3ZlXCI+XG4gICAgICAgICAgPGkgY2xhc3M9XCJmYS1zb2xpZCBmYS14bWFya1wiPjwvaT5cbiAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDxwIGNsYXNzPVwibmFtZVwiPiR7bmFtZX08L3A+XG5cbiAgICAgICAgPGRpdiBjbGFzcz1cIml0ZW0taGVhZGVyXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cIml0ZW0tbmFtZVwiPklURU08L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicXVhbnRpdHlcIj5RVFk8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJpY2VcIj5QUklDRTwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICBgO1xuICAgIH1cbiAgICBcbiAgICBtZWFsQ2FyZC5hcHBlbmRDaGlsZChVSS5tYWtlSXRlbUxpc3QocGVyc29uLml0ZW1zKSk7XG4gICAgXG4gICAgLy8gY29uc3QgZWRpdEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIC8vIGVkaXRCdG4uY2xhc3NMaXN0LmFkZCgnZWRpdCcpO1xuICAgIC8vIGVkaXRCdG4udGV4dENvbnRlbnQgPSAnRURJVCc7XG5cbiAgICAvLyBtZWFsQ2FyZC5hcHBlbmRDaGlsZChlZGl0QnRuKTtcblxuICAgIHJldHVybiBtZWFsQ2FyZDtcbiAgfVxuXG4gIHN0YXRpYyBtYWtlSXRlbUxpc3QoaXRlbXMpIHtcbiAgICBjb25zdCBpdGVtTGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGl0ZW1MaXN0LmNsYXNzTGlzdC5hZGQoJ2l0ZW0tbGlzdCcpO1xuICAgIGZvciAoY29uc3QgaXRlbSBvZiBpdGVtcykge1xuICAgICAgY29uc3QgbmV3SXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgbmV3SXRlbS5jbGFzc0xpc3QuYWRkKCdpdGVtJyk7XG4gICAgICBuZXdJdGVtLmlubmVySFRNTCA9IGBcbiAgICAgICAgPGRpdiBjbGFzcz1cIml0ZW0tbmFtZVwiPiR7aXRlbS5uYW1lfTwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwicXVhbnRpdHlcIj4ke2l0ZW0ucXVhbnRpdHl9PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJwcmljZVwiPiQgJHtpdGVtLnByaWNlfTwvZGl2PlxuICAgICAgYDtcbiAgICAgIGl0ZW1MaXN0LmFwcGVuZENoaWxkKG5ld0l0ZW0pXG4gICAgfVxuICAgIHJldHVybiBpdGVtTGlzdDtcbiAgfVxuXG4gIHN0YXRpYyBvcGVuQWRkUGVyc29uTW9kYWwoZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBjb25zdCBhZGRQZXJzb25Nb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hZGQtcGVyc29uLW1vZGFsJyk7XG4gICAgY29uc3Qgb3ZlcmxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5vdmVybGF5Jyk7XG4gICAgY29uc3QgYWRkSXRlbUxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRkLXBlcnNvbi1pdGVtLWxpc3QnKTtcblxuICAgIGFkZEl0ZW1MaXN0LmlubmVySFRNTCA9IGBcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWRkLWl0ZW0gcGVyc29uXCI+XG5cbiAgICAgICAgICA8aW5wdXQgXG4gICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICBjbGFzcz1cImlucHV0XCJcbiAgICAgICAgICAgIGlkPVwiaXRlbU5hbWVcIlxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJJdGVtXCJcbiAgICAgICAgICAgIG1heGxlbmd0aD1cIjE2XCJcbiAgICAgICAgICAgIHJlcXVpcmVkXG4gICAgICAgICAgPlxuICAgICAgICAgIDxpbnB1dCBcbiAgICAgICAgICAgIHR5cGU9XCJudW1iZXJcIlxuICAgICAgICAgICAgY2xhc3M9XCJpbnB1dFwiXG4gICAgICAgICAgICBpZD1cInF1YW50aXR5XCJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiI1wiXG4gICAgICAgICAgICBvbmNoYW5nZT1cIihmdW5jdGlvbihlbCl7ZWwudmFsdWU9cGFyc2VGbG9hdChlbC52YWx1ZSkudG9GaXhlZCgwKTt9KSh0aGlzKVwiXG4gICAgICAgICAgICBzdGVwPVwiMVwiXG4gICAgICAgICAgICByZXF1aXJlZFxuICAgICAgICAgICAgbWluPVwiMVwiXG4gICAgICAgICAgICBtYXg9XCI5OTlcIlxuICAgICAgICAgID5cbiAgICAgICAgICA8aW5wdXQgXG4gICAgICAgICAgICB0eXBlPVwibnVtYmVyXCJcbiAgICAgICAgICAgIGNsYXNzPVwiaW5wdXRcIlxuICAgICAgICAgICAgaWQ9XCJwcmljZVwiXG4gICAgICAgICAgICBwbGFjZWhvbGRlcj1cIiRcIlxuICAgICAgICAgICAgc3RlcD1cIjAuMDFcIlxuICAgICAgICAgICAgb25jaGFuZ2U9XCIoZnVuY3Rpb24oZWwpe2VsLnZhbHVlPXBhcnNlRmxvYXQoZWwudmFsdWUpLnRvRml4ZWQoMik7fSkodGhpcylcIlxuICAgICAgICAgICAgcmVxdWlyZWRcbiAgICAgICAgICAgIG1pbj1cIjAuMDFcIlxuICAgICAgICAgICAgbWF4PVwiOTk5OS45OVwiXG4gICAgICAgICAgPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJpdGVtLWJ0bnNcIj5cbiAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJhZGQtaXRlbS1idG4gYWRkLWl0ZW0tcGVyc29uXCI+KzwvYnV0dG9uPlxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cInJlbW92ZS1pdGVtLWJ0biByZW1vdmUtaXRlbS1wZXJzb25cIj4tPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiYWRkLWJ0bi1tYXJnaW5cIj48L2Rpdj5cbiAgICBgO1xuICAgIGFkZFBlcnNvbk1vZGFsLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgIG92ZXJsYXkuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG5cbiAgICBVSS5pbml0QnV0dG9ucygpO1xuICB9XG5cbiAgc3RhdGljIGFkZFBlcnNvbihlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgY29uc3QgbmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduYW1lJykudmFsdWU7XG4gICAgaWYgKFN0b3JhZ2UuZ2V0TWVhbExpc3QoKS5oYXNQZXJzb24obmFtZSkpIHtcbiAgICAgIGFsZXJ0KFwiVGhpcyBuYW1lIGFscmVhZHkgZXhpc3QhXCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBsZXQgaXRlbXMgPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5hZGQtaXRlbS5wZXJzb24nKSk7XG4gICAgbGV0IGNvbnZlcnRlZEl0ZW1zID0gW107XG4gICAgaXRlbXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgY29udmVydGVkSXRlbXMucHVzaChVSS5nZXRJdGVtKGl0ZW0pKTtcbiAgICB9KTtcblxuICAgIFN0b3JhZ2UuYWRkUGVyc29uKG5ldyBQZXJzb24obmFtZSwgY29udmVydGVkSXRlbXMpKTtcbiAgICBjb25zb2xlLmxvZyhTdG9yYWdlLmdldE1lYWxMaXN0KCkpO1xuICAgIFVJLmRpc3BsYXlNZWFsTGlzdCgpO1xuICAgIFVJLmNsb3NlQWRkUGVyc29uTW9kYWwoKTtcbiAgICBcbiAgfVxuXG4gIHN0YXRpYyBhZGRTaGFyZWQoZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBcbiAgICBsZXQgaXRlbXMgPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5hZGQtaXRlbS5zaGFyZWQnKSk7XG4gICAgbGV0IGNvbnZlcnRlZEl0ZW1zID0gW107XG4gICAgaXRlbXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgY29udmVydGVkSXRlbXMucHVzaChVSS5nZXRJdGVtKGl0ZW0pKTtcbiAgICB9KTtcbiAgIFxuICAgIFN0b3JhZ2UuYWRkU2hhcmVkKG5ldyBTaGFyZWQoXCJTaGFyZWRcIiwgY29udmVydGVkSXRlbXMpKTtcbiAgICBVSS5kaXNwbGF5TWVhbExpc3QoKTtcbiAgICBVSS5jbG9zZUFkZFNoYXJlZE1vZGFsKCk7XG4gIH1cblxuICBzdGF0aWMgZ2V0SXRlbShpdGVtKSB7XG4gICAgY29uc3QgaXRlbU5hbWUgPSBpdGVtLmNoaWxkcmVuWzBdLnZhbHVlO1xuICAgIGNvbnN0IHF1YW50aXR5ID0gaXRlbS5jaGlsZHJlblsxXS52YWx1ZTtcbiAgICBjb25zdCBwcmljZSA9IGl0ZW0uY2hpbGRyZW5bMl0udmFsdWU7XG4gICAgcmV0dXJuIG5ldyBJdGVtKGl0ZW1OYW1lLCBxdWFudGl0eSwgcHJpY2UpO1xuICB9XG5cbiAgc3RhdGljIG9wZW5BZGRTaGFyZWRNb2RhbCgpIHtcbiAgICBjb25zdCBhZGRTaGFyZWRNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hZGQtc2hhcmVkLW1vZGFsJyk7XG4gICAgY29uc3Qgb3ZlcmxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5vdmVybGF5Jyk7XG4gICAgY29uc3QgYWRkSXRlbUxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRkLXNoYXJlZC1pdGVtLWxpc3QnKTtcblxuICAgIGFkZEl0ZW1MaXN0LmlubmVySFRNTCA9IGBcblxuICAgIDxkaXYgY2xhc3M9XCJhZGQtaXRlbSBzaGFyZWRcIj5cbiAgICAgICAgICAgIDxpbnB1dCBcbiAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICBjbGFzcz1cImlucHV0XCJcbiAgICAgICAgICAgICAgaWQ9XCJpdGVtTmFtZVwiXG4gICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiSXRlbVwiXG4gICAgICAgICAgICAgIG1heGxlbmd0aD1cIjE2XCJcbiAgICAgICAgICAgICAgcmVxdWlyZWRcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgIDxpbnB1dCBcbiAgICAgICAgICAgICAgdHlwZT1cIm51bWJlclwiXG4gICAgICAgICAgICAgIGNsYXNzPVwiaW5wdXRcIlxuICAgICAgICAgICAgICBpZD1cInF1YW50aXR5XCJcbiAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCIjXCJcbiAgICAgICAgICAgICAgb25jaGFuZ2U9XCIoZnVuY3Rpb24oZWwpe2VsLnZhbHVlPXBhcnNlRmxvYXQoZWwudmFsdWUpLnRvRml4ZWQoMCk7fSkodGhpcylcIlxuICAgICAgICAgICAgICBzdGVwPVwiMVwiXG4gICAgICAgICAgICAgIHJlcXVpcmVkXG4gICAgICAgICAgICAgIG1pbj1cIjFcIlxuICAgICAgICAgICAgICBtYXg9XCI5OTlcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgPGlucHV0IFxuICAgICAgICAgICAgICB0eXBlPVwibnVtYmVyXCJcbiAgICAgICAgICAgICAgY2xhc3M9XCJpbnB1dFwiXG4gICAgICAgICAgICAgIGlkPVwicHJpY2VcIlxuICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIiRcIlxuICAgICAgICAgICAgICBzdGVwPVwiMC4wMVwiXG4gICAgICAgICAgICAgIG9uY2hhbmdlPVwiKGZ1bmN0aW9uKGVsKXtlbC52YWx1ZT1wYXJzZUZsb2F0KGVsLnZhbHVlKS50b0ZpeGVkKDIpO30pKHRoaXMpXCJcbiAgICAgICAgICAgICAgcmVxdWlyZWRcbiAgICAgICAgICAgICAgbWluPVwiMC4wMVwiXG4gICAgICAgICAgICAgIG1heD1cIjk5OTkuOTlcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIFxuXG4gICAgICAgICAgPGRpdiBjbGFzcz1cIml0ZW0tYnRuc1wiPlxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImFkZC1pdGVtLWJ0biBhZGQtaXRlbS1zaGFyZWRcIj4rPC9idXR0b24+XG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwicmVtb3ZlLWl0ZW0tYnRuIHJlbW92ZS1pdGVtLXNoYXJlZFwiPi08L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWRkLWJ0bi1tYXJnaW5cIj48L2Rpdj5cblxuICAgIGA7XG5cbiAgICBhZGRTaGFyZWRNb2RhbC5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICBvdmVybGF5LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuXG4gICAgVUkuaW5pdEJ1dHRvbnMoKTtcbiAgfVxuXG4gIHN0YXRpYyBjbG9zZUFkZFBlcnNvbk1vZGFsKCkge1xuICAgIFxuICAgIGNvbnN0IGFkZFBlcnNvbk1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFkZC1wZXJzb24tbW9kYWwnKTtcbiAgICBjb25zdCBhZGRQZXJzb25Gb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFkZC1wZXJzb24tZm9ybScpO1xuICAgIGNvbnN0IG92ZXJsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcub3ZlcmxheScpO1xuXG4gICAgYWRkUGVyc29uTW9kYWwuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG4gICAgYWRkUGVyc29uRm9ybS5yZXNldCgpO1xuICAgIG92ZXJsYXkuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG5cbiAgfVxuXG4gIHN0YXRpYyBjbG9zZUFkZFNoYXJlZE1vZGFsKCkge1xuICAgIGNvbnN0IGFkZFNoYXJlZE1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFkZC1zaGFyZWQtbW9kYWwnKTtcbiAgICBjb25zdCBhZGRTaGFyZWRGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFkZC1zaGFyZWQtZm9ybScpO1xuICAgIGNvbnN0IG92ZXJsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcub3ZlcmxheScpO1xuXG4gICAgYWRkU2hhcmVkTW9kYWwuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG4gICAgYWRkU2hhcmVkRm9ybS5yZXNldCgpO1xuICAgIG92ZXJsYXkuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG5cblxuICB9XG5cbiAgc3RhdGljIGNsb3NlQWxsTW9kYWxzKCkge1xuICAgIFVJLmNsb3NlQWRkUGVyc29uTW9kYWwoKTtcbiAgICBVSS5jbG9zZUFkZFNoYXJlZE1vZGFsKCk7XG4gICAgVUkuY2xvc2VTcGxpdE1vZGFsKCk7XG4gICAgVUkuY2xvc2VCaWxsTW9kYWwoKTtcbiAgfVxuXG4gIHN0YXRpYyBhZGRJdGVtKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgXG4gICAgY29uc3QgYWRkSXRlbUxpc3QgPSBlLnRhcmdldC5wYXJlbnROb2RlLnBhcmVudE5vZGU7XG4gICAgY29uc3QgaXRlbUJ0bnNEaXYgPSBlLnRhcmdldC5wYXJlbnROb2RlO1xuICAgIGNvbnN0IGFkZEl0ZW1EaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBhZGRJdGVtRGl2LmNsYXNzTGlzdC5hZGQoJ2FkZC1pdGVtJyk7XG5cbiAgICBpZiAoYWRkSXRlbUxpc3QuY2xhc3NMaXN0LmNvbnRhaW5zKCdhZGQtc2hhcmVkLWl0ZW0tbGlzdCcpKSB7XG4gICAgICBhZGRJdGVtRGl2LmNsYXNzTGlzdC5hZGQoJ3NoYXJlZCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICBhZGRJdGVtRGl2LmNsYXNzTGlzdC5hZGQoJ3BlcnNvbicpO1xuICAgIH1cblxuICAgIGFkZEl0ZW1EaXYuaW5uZXJIVE1MICs9IGBcbiAgICAgICAgPGlucHV0IFxuICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICBjbGFzcz1cImlucHV0XCJcbiAgICAgICAgICBpZD1cIml0ZW1OYW1lXCJcbiAgICAgICAgICBwbGFjZWhvbGRlcj1cIkl0ZW1cIlxuICAgICAgICAgIG1heGxlbmd0aD1cIjE2XCJcbiAgICAgICAgICByZXF1aXJlZFxuICAgICAgICA+XG4gICAgICAgIDxpbnB1dCBcbiAgICAgICAgICB0eXBlPVwibnVtYmVyXCJcbiAgICAgICAgICBjbGFzcz1cImlucHV0XCJcbiAgICAgICAgICBpZD1cInF1YW50aXR5XCJcbiAgICAgICAgICBwbGFjZWhvbGRlcj1cIiNcIlxuICAgICAgICAgIG9uY2hhbmdlPVwiKGZ1bmN0aW9uKGVsKXtlbC52YWx1ZT1wYXJzZUZsb2F0KGVsLnZhbHVlKS50b0ZpeGVkKDApO30pKHRoaXMpXCJcbiAgICAgICAgICBzdGVwPVwiMVwiXG4gICAgICAgICAgcmVxdWlyZWRcbiAgICAgICAgICBtaW49XCIxXCJcbiAgICAgICAgICBtYXg9XCI5OTlcIlxuICAgICAgICA+XG4gICAgICAgIDxpbnB1dCBcbiAgICAgICAgICB0eXBlPVwibnVtYmVyXCJcbiAgICAgICAgICBjbGFzcz1cImlucHV0XCJcbiAgICAgICAgICBpZD1cInByaWNlXCJcbiAgICAgICAgICBwbGFjZWhvbGRlcj1cIiRcIlxuICAgICAgICAgIHN0ZXA9XCIwLjAxXCJcbiAgICAgICAgICBvbmNoYW5nZT1cIihmdW5jdGlvbihlbCl7ZWwudmFsdWU9cGFyc2VGbG9hdChlbC52YWx1ZSkudG9GaXhlZCgyKTt9KSh0aGlzKVwiXG4gICAgICAgICAgcmVxdWlyZWRcbiAgICAgICAgICBtaW49XCIwLjAxXCJcbiAgICAgICAgICBtYXg9XCI5OTk5Ljk5XCJcbiAgICAgICAgPlxuICAgIGA7XG4gICAgYWRkSXRlbUxpc3QuaW5zZXJ0QmVmb3JlKGFkZEl0ZW1EaXYsIGl0ZW1CdG5zRGl2KTtcblxuICAgIFVJLmluaXRCdXR0b25zKCk7XG4gIH1cblxuICBzdGF0aWMgcmVtb3ZlSXRlbShlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIFxuICAgIGNvbnN0IGFkZEl0ZW1MaXN0ID0gZS50YXJnZXQucGFyZW50Tm9kZS5wYXJlbnROb2RlO1xuICAgIGNvbnN0IGl0ZW1CdG5zRGl2ID0gZS50YXJnZXQucGFyZW50Tm9kZTtcbiAgICBcbiAgICBpZiAoYWRkSXRlbUxpc3QuY2hpbGRFbGVtZW50Q291bnQgPD0gMykge1xuICAgICAgYWxlcnQoXCJZb3UgbmVlZCBhdCBsZWFzdCBvbmUgaXRlbSFcIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFkZEl0ZW1MaXN0LnJlbW92ZUNoaWxkKGl0ZW1CdG5zRGl2LnByZXZpb3VzU2libGluZyk7XG4gICAgfVxuICAgIFxuICAgIFVJLmluaXRCdXR0b25zKCk7XG4gIH1cbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBCaWxsIHtcblxuXG4gIGNvbnN0cnVjdG9yKHJlc3RhdXJhbnQpIHtcbiAgICB0aGlzLnJlc3RhdXJhbnQgPSByZXN0YXVyYW50O1xuICAgIHRoaXMuZGF0ZSA9IG51bGw7XG4gICAgdGhpcy5zdWJ0b3RhbCA9IG51bGw7XG4gICAgdGhpcy50YXggPSBudWxsO1xuICAgIHRoaXMudGlwID0gbnVsbDtcbiAgICB0aGlzLnRvdGFsID0gbnVsbDtcbiAgICB0aGlzLnNoYXJlZFdpdGhUb3RhbCA9IG51bGw7XG4gICAgdGhpcy5wZW9wbGVXaXRoVG90YWwgPSBudWxsO1xuICB9XG5cbiAgZ2V0RGF0ZSgpIHtcbiAgICB2YXIgdG9kYXkgPSBuZXcgRGF0ZSgpO1xuICAgIHZhciBkYXRlID0gKHRvZGF5LmdldE1vbnRoKCkgKyAxKSArICcvJyArIHRvZGF5LmdldERhdGUoKSArICcvJyt0b2RheS5nZXRGdWxsWWVhcigpO1xuICAgIHZhciBtaW51dGUgPSB0b2RheS5nZXRNaW51dGVzKCk7XG4gICAgaWYgKG1pbnV0ZSA8IDEwKSB7XG4gICAgICBtaW51dGUgPSAnMCcgKyBtaW51dGU7XG4gICAgfVxuICAgIHZhciB0aW1lID0gdG9kYXkuZ2V0SG91cnMoKSArIFwiOlwiICsgbWludXRlICsgXCI6XCIgKyB0b2RheS5nZXRTZWNvbmRzKCk7XG4gICAgcmV0dXJuIGRhdGUgKyAnICcgKyB0aW1lO1xuICB9XG5cbiAgY2FsY3VsYXRlU3VidG90YWwocGVvcGxlLCBzaGFyZWQpIHtcbiAgICBsZXQgc3VidG90YWwgPSAwLjA7XG4gICAgaWYgKHNoYXJlZC5pdGVtcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBzaGFyZWQuaXRlbXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICBzdWJ0b3RhbCArPSBwYXJzZUZsb2F0KGl0ZW0ucHJpY2UgKiBwYXJzZUludChpdGVtLnF1YW50aXR5KSk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgXG4gICAgcGVvcGxlLmZvckVhY2goKHBlcnNvbikgPT4ge1xuICAgICAgcGVyc29uLml0ZW1zLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgc3VidG90YWwgKz0gcGFyc2VGbG9hdChpdGVtLnByaWNlICogcGFyc2VJbnQoaXRlbS5xdWFudGl0eSkpO1xuICAgICAgfSlcbiAgICB9KVxuICAgIFxuICAgIFxuICAgIHJldHVybiBzdWJ0b3RhbC50b0ZpeGVkKDIpO1xuICB9XG5cbiAgY2FsY3VsYXRlVGF4KHN1YnRvdGFsKSB7XG4gICAgcmV0dXJuIChzdWJ0b3RhbCAqIDAuMDYpLnRvRml4ZWQoMik7XG4gIH1cblxuICBjYWxjdWxhdGVUaXAoc3VidG90YWwsIHRpcCkge1xuICAgIGlmICh0aXAgPD0gMC4yKSB7XG4gICAgICByZXR1cm4gKHN1YnRvdGFsICogdGlwKS50b0ZpeGVkKDIpO1xuICAgIH1cbiAgICByZXR1cm4gdGlwO1xuICB9XG5cbiAgY2FsY3VsYXRlVG90YWwoc3VidG90YWwsIHRheCwgdGlwKSB7XG4gICAgcmV0dXJuIChwYXJzZUZsb2F0KHN1YnRvdGFsKSArIHBhcnNlRmxvYXQodGF4KSArIHBhcnNlRmxvYXQodGlwKSkudG9GaXhlZCgyKTtcbiAgfVxuXG4gIGNhbGN1bGF0ZVNoYXJlZFdpdGhUb3RhbChzaGFyZWQsIHN1YnRvdGFsLCB0YXgsIHRpcCkge1xuICAgIGxldCBpdGVtU3VidG90YWwgPSAwLjA7XG4gICAgaWYgKHNoYXJlZC5pdGVtcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBzaGFyZWQuaXRlbXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICBpdGVtU3VidG90YWwgKz0gcGFyc2VGbG9hdChpdGVtLnByaWNlICogcGFyc2VJbnQoaXRlbS5xdWFudGl0eSkpO1xuICAgICAgfSk7XG4gICAgICBjb25zdCBzaGFyZWRUb3RhbCA9IGl0ZW1TdWJ0b3RhbCBcbiAgICAgICAgICAgICAgICAgICAgICAgICArICgoaXRlbVN1YnRvdGFsIC8gcGFyc2VGbG9hdChzdWJ0b3RhbCkpICogcGFyc2VGbG9hdCh0YXgpKSBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKyAoKGl0ZW1TdWJ0b3RhbCAvIHBhcnNlRmxvYXQoc3VidG90YWwpKSAqIHBhcnNlRmxvYXQodGlwKSk7XG4gICAgICByZXR1cm4gW3NoYXJlZC5pdGVtcywgc2hhcmVkVG90YWwudG9GaXhlZCgyKV07XG4gICAgfVxuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICBjYWxjdWxhdGVQZW9wbGVXaXRoVG90YWwocGVvcGxlLCBzaGFyZWRXaXRoVG90YWwsIHN1YnRvdGFsLCB0YXgsIHRpcCkge1xuICAgIGNvbnN0IHBlb3BsZVdpdGhUb3RhbEFycmF5ID0gW107XG4gICAgbGV0IHNoYXJlZFRvdGFsRm9yRWFjaCA9IDAuMDtcbiAgICBpZiAoc2hhcmVkV2l0aFRvdGFsICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHNoYXJlZFRvdGFsRm9yRWFjaCA9IHBhcnNlRmxvYXQoc2hhcmVkV2l0aFRvdGFsWzFdKSAvIHBlb3BsZS5sZW5ndGg7XG4gICAgICBzaGFyZWRXaXRoVG90YWxbMV0gPSBzaGFyZWRUb3RhbEZvckVhY2g7XG4gICAgfSBcblxuICAgIHBlb3BsZS5mb3JFYWNoKChwZXJzb24pID0+IHtcbiAgICAgIGxldCBpdGVtU3VidG90YWwgPSAwLjA7XG4gICAgICBwZXJzb24uaXRlbXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICBpdGVtU3VidG90YWwgKz0gcGFyc2VGbG9hdChpdGVtLnByaWNlICogcGFyc2VJbnQoaXRlbS5xdWFudGl0eSkpO1xuICAgICAgfSlcbiAgICAgIGNvbnN0IHBlcnNvblRvdGFsID0gaXRlbVN1YnRvdGFsIFxuICAgICAgICAgICAgICAgICAgICAgICArICgoaXRlbVN1YnRvdGFsIC8gcGFyc2VGbG9hdChzdWJ0b3RhbCkpICogcGFyc2VGbG9hdCh0YXgpKSBcbiAgICAgICAgICAgICAgICAgICAgICAgICsgKChpdGVtU3VidG90YWwgLyBwYXJzZUZsb2F0KHN1YnRvdGFsKSkgKiBwYXJzZUZsb2F0KHRpcCkpIFxuICAgICAgICAgICAgICAgICAgICAgICAgKyBzaGFyZWRUb3RhbEZvckVhY2g7XG4gICAgICBwZW9wbGVXaXRoVG90YWxBcnJheS5wdXNoKFtwZXJzb24sIHBlcnNvblRvdGFsLnRvRml4ZWQoMildKTtcbiAgICB9KVxuICAgIHJldHVybiBwZW9wbGVXaXRoVG90YWxBcnJheTtcbiAgfVxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEJpbGxMaXN0IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5iaWxscyA9IFtdO1xuICB9XG5cbiAgc2V0QmlsbHMoYmlsbHMpIHtcbiAgICB0aGlzLmJpbGxzID0gYmlsbHM7XG4gIH1cblxuICBnZXRCaWxscygpIHtcbiAgICByZXR1cm4gdGhpcy5iaWxscztcbiAgfVxuXG4gIGFkZEJpbGwobmV3QmlsbCkge1xuICAgIHRoaXMuYmlsbHMucHVzaChuZXdCaWxsKTtcbiAgfVxuXG4gIGRlbGV0ZUJpbGwoYmlsbERhdGUpIHtcbiAgICB0aGlzLmJpbGxzID0gdGhpcy5iaWxscy5maWx0ZXIoKGJpbGwpID0+IGJpbGwuZGF0ZSAhPT0gYmlsbERhdGUpO1xuICB9XG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgSXRlbSB7XG4gIGNvbnN0cnVjdG9yKG5hbWUsIHF1YW50aXR5LCBwcmljZSkge1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy5xdWFudGl0eSA9IHF1YW50aXR5O1xuICAgIHRoaXMucHJpY2UgPSBwcmljZTtcbiAgfVxuXG4gIHNldE5hbWUobmFtZSkge1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gIH1cblxuICBnZXROYW1lKCkge1xuICAgIHJldHVybiB0aGlzLm5hbWU7XG4gIH1cblxuICBzZXRRdWFudGl0eShxdWFudGl0eSkge1xuICAgIHRoaXMucXVhbnRpdHkgPSBxdWFudGl0eTtcbiAgfVxuXG4gIGdldFF1YW50aXR5KCkge1xuICAgIHJldHVybiB0aGlzLnF1YW50aXR5O1xuICB9XG5cbiAgc2V0UHJpY2UocHJpY2UpIHtcbiAgICB0aGlzLnByaWNlID0gcHJpY2U7XG4gIH1cblxuICBnZXRQcmljZSgpIHtcbiAgICByZXR1cm4gdGhpcy5wcmljZTtcbiAgfVxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIE1lYWxMaXN0IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5wZW9wbGUgPSBbXVxuICAgIHRoaXMuc2hhcmVkID0gdW5kZWZpbmVkO1xuICB9XG5cbiAgc2V0UGVvcGxlKHBlb3BsZSkge1xuICAgIHRoaXMucGVvcGxlID0gcGVvcGxlO1xuICB9XG5cbiAgZ2V0UGVvcGxlKCkge1xuICAgIHJldHVybiB0aGlzLnBlb3BsZTtcbiAgfVxuXG4gIHNldFNoYXJlZChzaGFyZWQpIHtcbiAgICB0aGlzLnNoYXJlZCA9IHNoYXJlZDtcbiAgfVxuXG4gIGdldFNoYXJlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5zaGFyZWQ7XG4gIH1cblxuICBhZGRQZXJzb24obmV3UGVyc29uKSB7XG4gICAgaWYodGhpcy5wZW9wbGUuZmluZCgocGVyc29uKSA9PiBwZXJzb24ubmFtZSA9PT0gbmV3UGVyc29uKSkge1xuICAgICAgYWxlcnQoXCJDaG9vc2UgZGlmZmVyZW50IG5hbWUhXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnBlb3BsZS5wdXNoKG5ld1BlcnNvbik7XG4gICAgfVxuICAgIFxuICB9XG5cbiAgZGVsZXRlUGVyc29uKHBlcnNvbk5hbWUpIHtcbiAgICB0aGlzLnBlb3BsZSA9IHRoaXMucGVvcGxlLmZpbHRlcigocGVyc29uKSA9PiBwZXJzb24ubmFtZSAhPT0gcGVyc29uTmFtZSk7XG4gIH1cblxuICBkZWxldGVTaGFyZWQoKSB7XG4gICAgdGhpcy5zaGFyZWQgPSB1bmRlZmluZWQ7XG4gIH1cblxuICBoYXNQZXJzb24ocGVyc29uTmFtZSkge1xuICAgIHJldHVybiB0aGlzLnBlb3BsZS5zb21lKChwZXJzb24pID0+IHBlcnNvbi5uYW1lID09PSBwZXJzb25OYW1lKTtcbiAgfVxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFBlcnNvbiB7XG4gIGNvbnN0cnVjdG9yKG5hbWUsIGl0ZW1zKSB7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLml0ZW1zID0gaXRlbXM7XG4gIH1cblxuICBzZXROYW1lKG5hbWUpIHtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICB9XG5cbiAgZ2V0TmFtZSgpIHtcbiAgICByZXR1cm4gdGhpcy5uYW1lO1xuICB9XG5cbiAgc2V0SXRlbXMoaXRlbXMpIHtcbiAgICB0aGlzLml0ZW1zID0gaXRlbXM7XG4gIH1cblxuICBnZXRJdGVtcygpIHtcbiAgICByZXR1cm4gdGhpcy5pdGVtcztcbiAgfVxuXG4gIGFkZEl0ZW0oaXRlbSkge1xuICAgIHRoaXMuaXRlbXMucHVzaChpdGVtKTtcbiAgfVxuXG4gIGRlbGV0ZUl0ZW0oaXRlbU5hbWUpIHtcbiAgICB0aGlzLml0ZW1zID0gdGhpcy5pdGVtcy5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0ubmFtZSAhPT0gaXRlbU5hbWUpO1xuICB9XG5cbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBTaGFyZWQge1xuXG4gIGNvbnN0cnVjdG9yKG5hbWUsIGl0ZW1zKSB7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLml0ZW1zID0gaXRlbXM7XG4gIH1cblxuICBzZXROYW1lKG5hbWUpIHtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICB9XG5cbiAgZ2V0TmFtZSgpIHtcbiAgICByZXR1cm4gdGhpcy5uYW1lO1xuICB9XG5cbiAgc2V0SXRlbXMoaXRlbXMpIHtcbiAgICB0aGlzLml0ZW1zID0gaXRlbXM7XG4gIH1cblxuICBnZXRJdGVtcygpIHtcbiAgICByZXR1cm4gdGhpcy5pdGVtcztcbiAgfVxuXG4gIGFkZEl0ZW0oaXRlbSkge1xuICAgIHRoaXMuaXRlbXMucHVzaChpdGVtKTtcbiAgfVxuXG4gIGRlbGV0ZUl0ZW0oaXRlbU5hbWUpIHtcbiAgICB0aGlzLml0ZW1zID0gdGhpcy5pdGVtcy5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0ubmFtZSAhPT0gaXRlbU5hbWUpO1xuICB9XG5cblxufSIsImltcG9ydCBNZWFsTGlzdCBmcm9tICcuL21lYWxMaXN0JztcbmltcG9ydCBCaWxsTGlzdCBmcm9tICcuL2JpbGxMaXN0JztcbmltcG9ydCBCaWxsIGZyb20gJy4vYmlsbCc7XG5pbXBvcnQgUGVyc29uIGZyb20gJy4vcGVyc29uJztcbmltcG9ydCBTaGFyZWQgZnJvbSAnLi9zaGFyZWQnO1xuaW1wb3J0IEl0ZW0gIGZyb20gJy4vaXRlbSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0b3JhZ2Uge1xuICBzdGF0aWMgc2F2ZU1lYWxMaXN0KGRhdGEpIHtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnbWVhbExpc3QnLCBKU09OLnN0cmluZ2lmeShkYXRhKSk7XG4gIH1cblxuICBzdGF0aWMgc2F2ZUJpbGxMaXN0KGRhdGEpIHtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnYmlsbExpc3QnLCBKU09OLnN0cmluZ2lmeShkYXRhKSk7XG4gIH1cblxuICBzdGF0aWMgZ2V0QmlsbExpc3QoKSB7XG4gICAgY29uc3QgYmlsbExpc3QgPSBPYmplY3QuYXNzaWduKFxuICAgICAgbmV3IEJpbGxMaXN0KCksXG4gICAgICBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdiaWxsTGlzdCcpKSk7XG4gICAgXG4gICAgICBiaWxsTGlzdC5zZXRCaWxscyhcbiAgICAgICAgYmlsbExpc3QuZ2V0QmlsbHMoKS5tYXAoKGJpbGwpID0+IE9iamVjdC5hc3NpZ24obmV3IEJpbGwoKSwgYmlsbCkpXG4gICAgICApO1xuXG4gICAgICBiaWxsTGlzdC5nZXRCaWxscygpLmZvckVhY2goKGJpbGwpID0+IHtcbiAgICAgICAgLy8gYmlsbC5wZW9wbGVXaXRoVG90YWwubWFwKChwZXJzb25bMF0pID0+IE9iamVjdC5hc3NpZ24obmV3IFBlcnNvbigpLCBwZXJzb25bMF0pKVxuXG4gICAgICAgIGZvciAobGV0IHBlcnNvbldpdGhUb3RhbCBvZiBiaWxsLnBlb3BsZVdpdGhUb3RhbCkge1xuICAgICAgICAgIHBlcnNvbldpdGhUb3RhbFswXSA9IE9iamVjdC5hc3NpZ24obmV3IFBlcnNvbigpLCBwZXJzb25XaXRoVG90YWxbMF0pO1xuXG4gICAgICAgICAgcGVyc29uV2l0aFRvdGFsWzBdLmdldEl0ZW1zKCkubWFwKChpdGVtKSA9PiBPYmplY3QuYXNzaWduKG5ldyBJdGVtKCksIGl0ZW0pKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYgKGJpbGwuc2hhcmVkV2l0aFRvdGFsICE9PSBudWxsKSB7XG4gICAgICAgICAgYmlsbC5zaGFyZWRXaXRoVG90YWxbMF0ubWFwKChpdGVtKSA9PiBPYmplY3QuYXNzaWduKG5ldyBJdGVtKCksIGl0ZW0pKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgIH0pO1xuXG4gICAgcmV0dXJuIGJpbGxMaXN0O1xuICB9XG5cbiAgc3RhdGljIGdldE1lYWxMaXN0KCkge1xuICAgIGNvbnN0IG1lYWxMaXN0ID0gT2JqZWN0LmFzc2lnbihcbiAgICAgIG5ldyBNZWFsTGlzdCgpLCBcbiAgICAgIEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ21lYWxMaXN0JykpKTtcbiAgICBcbiAgICAgIG1lYWxMaXN0LnNldFBlb3BsZShcbiAgICAgICAgbWVhbExpc3RcbiAgICAgICAgICAuZ2V0UGVvcGxlKClcbiAgICAgICAgICAubWFwKChwZXJzb24pID0+IE9iamVjdC5hc3NpZ24obmV3IFBlcnNvbigpLCBwZXJzb24pKVxuICAgICAgKTtcblxuICAgICAgbWVhbExpc3Quc2V0U2hhcmVkKFxuICAgICAgICBPYmplY3QuYXNzaWduKG5ldyBTaGFyZWQoKSwgbWVhbExpc3QuZ2V0U2hhcmVkKCkpXG4gICAgICApO1xuXG4gICAgICBtZWFsTGlzdC5nZXRQZW9wbGUoKS5mb3JFYWNoKChwZXJzb24pID0+IHtcbiAgICAgICAgcGVyc29uLnNldEl0ZW1zKFxuICAgICAgICAgIHBlcnNvbi5nZXRJdGVtcygpLm1hcCgoaXRlbSkgPT4gT2JqZWN0LmFzc2lnbihuZXcgSXRlbSgpLCBpdGVtKSlcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuXG4gICAgICBpZiAobWVhbExpc3QuZ2V0U2hhcmVkKCkuZ2V0SXRlbXMoKSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBtZWFsTGlzdC5nZXRTaGFyZWQoKS5zZXRJdGVtcyhcbiAgICAgICAgICAgICAgbWVhbExpc3QuZ2V0U2hhcmVkKClcbiAgICAgICAgICAgICAgLmdldEl0ZW1zKClcbiAgICAgICAgICAgICAgLm1hcCgoaXRlbSkgPT4gT2JqZWN0LmFzc2lnbihuZXcgSXRlbSgpLCBpdGVtKSlcbiAgICAgICAgICAgICk7XG4gICAgICB9XG4gICAgXG4gICAgcmV0dXJuIG1lYWxMaXN0O1xuICB9XG5cbiAgc3RhdGljIGFkZFBlcnNvbihwZXJzb24pIHtcbiAgICBjb25zdCBtZWFsTGlzdCA9IFN0b3JhZ2UuZ2V0TWVhbExpc3QoKTtcbiAgICBtZWFsTGlzdC5hZGRQZXJzb24ocGVyc29uKTtcbiAgICBTdG9yYWdlLnNhdmVNZWFsTGlzdChtZWFsTGlzdCk7XG4gIH1cblxuICBzdGF0aWMgZGVsZXRlUGVyc29uKHBlcnNvbk5hbWUpIHtcbiAgICBjb25zdCBtZWFsTGlzdCA9IFN0b3JhZ2UuZ2V0TWVhbExpc3QoKTtcbiAgICBtZWFsTGlzdC5kZWxldGVQZXJzb24ocGVyc29uTmFtZSk7XG4gICAgU3RvcmFnZS5zYXZlTWVhbExpc3QobWVhbExpc3QpO1xuICB9XG5cbiAgc3RhdGljIGFkZFNoYXJlZChzaGFyZWQpIHtcbiAgICBjb25zdCBtZWFsTGlzdCA9IFN0b3JhZ2UuZ2V0TWVhbExpc3QoKTtcbiAgICBtZWFsTGlzdC5zZXRTaGFyZWQoc2hhcmVkKTtcbiAgICBTdG9yYWdlLnNhdmVNZWFsTGlzdChtZWFsTGlzdCk7XG4gIH1cblxuICBzdGF0aWMgZGVsZXRlU2hhcmVkKCkge1xuICAgIGNvbnN0IG1lYWxMaXN0ID0gU3RvcmFnZS5nZXRNZWFsTGlzdCgpO1xuICAgIG1lYWxMaXN0LmRlbGV0ZVNoYXJlZCgpO1xuICAgIFN0b3JhZ2Uuc2F2ZU1lYWxMaXN0KG1lYWxMaXN0KTtcbiAgfVxuXG4gIHN0YXRpYyBhZGRCaWxsKGJpbGwpIHtcbiAgICBjb25zdCBiaWxsTGlzdCA9IFN0b3JhZ2UuZ2V0QmlsbExpc3QoKTtcbiAgICBiaWxsTGlzdC5hZGRCaWxsKGJpbGwpO1xuICAgIFN0b3JhZ2Uuc2F2ZUJpbGxMaXN0KGJpbGxMaXN0KTtcbiAgfVxuXG4gIHN0YXRpYyBkZWxldGVCaWxsKGJpbGxEYXRlKSB7XG4gICAgY29uc3QgYmlsbExpc3QgPSBTdG9yYWdlLmdldEJpbGxMaXN0KCk7XG4gICAgYmlsbExpc3QuZGVsZXRlQmlsbChiaWxsRGF0ZSk7XG4gICAgU3RvcmFnZS5zYXZlQmlsbExpc3QoYmlsbExpc3QpO1xuICB9XG5cbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBVSSBmcm9tICcuL21vZHVsZXMvVUknO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgVUkubG9hZEhvbWUpXG5cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==