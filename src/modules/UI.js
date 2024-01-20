import Person from './person';
import Item from './item';
import Shared from './shared';
import Bill from './bill';
import Storage from './storage';

export default class UI {
  
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
    const billList = Storage.getBillList();
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
    Storage.deleteBill(billDate);
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
    if (Storage.getMealList().getShared().getItems() !== undefined) {
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
      Storage.addBill(bill);
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
    const mealList = Storage.getMealList();
    const newBill = new Bill(restaurant);
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
    
    console.log(Storage.getBillList());                                                              
    return newBill;
  }

  static deletePersonCard(name) {
    Storage.deletePerson(name);
    UI.displayMealList();
  }

  static deleteSharedCard() {
    Storage.deleteShared();
    const addSharedBtn = document.querySelector('.add-shared');
    addSharedBtn.classList.remove('hidden');
    UI.displayMealList();
  }

  static displayMealList() {
    const mealList = Storage.getMealList();
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
    if (Storage.getMealList().hasPerson(name)) {
      alert("This name already exist!");
      return;
    }
    let items = Array.from(document.querySelectorAll('.add-item.person'));
    let convertedItems = [];
    items.forEach((item) => {
      convertedItems.push(UI.getItem(item));
    });

    Storage.addPerson(new Person(name, convertedItems));
    console.log(Storage.getMealList());
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
   
    Storage.addShared(new Shared("Shared", convertedItems));
    UI.displayMealList();
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