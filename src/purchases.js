// import { getAllPurchases } from './model.js';

import { logoutUser, getAllItems, getAllSuppliers, displayAllPurchases, addPurchase, deletePurchase, updatePurchase } from "./controller.js";


axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwt');

// MUST RETRIEVE LOCALSTORAGE FOR EVERY EVENT!!!!!!!!!!!!!
// REFACTOR THIS AND PLACE INSIDE EVENT LISTENERS
const listOfItems = JSON.parse(localStorage.getItem('listOfItems'));
const listOfSuppliers = JSON.parse(localStorage.getItem('listOfSuppliers'));
const listOfPurchases = JSON.parse(localStorage.getItem('listOfPurchases'));

const logoutBtn = document.querySelector('#btn-logout');
const addPurchaseForm = document.querySelector('#addPurchaseForm');
const addItemNameSelect = document.querySelector('#addItemName');
const deletePurchaseForm = document.querySelector('#deletePurchaseForm');
const deleteIDSelect = document.querySelector('#deleteID');
const updatePurchaseForm = document.querySelector('#updatePurchaseForm');
const updateIDSelect = document.querySelector('#updateID');
// const updateName = document.querySelector('#updateName');


if (!axios.defaults.headers.common['Authorization'] || axios.defaults.headers.common['Authorization'] !== localStorage.getItem('jwt')) {
    alert('You are unauthorized. Please log in.');
    logoutUser();
}

if (!('listOfItems' in localStorage)) {
    getAllItems();
} 
if (!('listOfSuppliers' in localStorage)) {
    getAllSuppliers();
} 

displayAllPurchases();


logoutBtn.addEventListener('click', event => {
    event.preventDefault();
    logoutUser();
});

// console.log('addPurchaseModal:', document.getElementById('addPurchaseModal'));
// console.log('addPurchaseModal:', document.querySelector('#addPurchaseModal'));

// console.log(addPurchaseForm);
// console.log(deletePurchaseForm);
// console.log(updatePurchaseForm);

addItemNameSelect.addEventListener('change', event => {
    let entered_item_name = addItemNameSelect.value;
    let unit_of_measure;
    for (const item of listOfItems) {
        if (item.name === entered_item_name) {
            unit_of_measure = item.unit_of_measure;
        }
    }
    console.log(document.querySelector('#addUnitOfMeasure').firstElementChild);
    document.querySelector('#addUnitOfMeasure').firstElementChild.text = unit_of_measure;
    document.querySelector('#addUnitOfMeasure').firstElementChild.value = unit_of_measure;
});


addPurchaseForm.addEventListener('submit', event => {
    event.preventDefault();
    let entered_itemName = event.currentTarget.querySelector('#addItemName').value;
    let entered_quantity = event.currentTarget.querySelector('#addQuantity').value;
    let entered_cost = event.currentTarget.querySelector('#addCost').value;
    let entered_supplierName = event.currentTarget.querySelector('#addSupplierName').value;
    let item_id, supplier_id;
    for (const item of listOfItems) {
        if (item.name === entered_itemName) {
            item_id = item.id;
        }
    }
    for (const supplier of listOfSuppliers) {
        if (supplier.name === entered_supplierName) {
            supplier_id = supplier.id;
        }
    }
    console.log(item_id, entered_quantity, entered_cost, supplier_id);
    addPurchase(item_id, entered_quantity, entered_cost, supplier_id);
});

deleteIDSelect.addEventListener('change', event => {
    let entered_purchase_id = deleteIDSelect.value;
    let item_name, quantity, unit_of_measure, cost, supplier;
    for (const purchase of listOfPurchases) {
        if (purchase.id === entered_purchase_id) {
            item_name = purchase.item;
            quantity = purchase.quantity;
            unit_of_measure = purchase.unit_of_measure;
            cost = purchase.cost;
            supplier = purchase.supplier;
        }
    }
    // console.log(document.querySelector('#addUnitOfMeasure').firstElementChild);
    document.querySelector('#deleteItemName').firstElementChild.text = item_name;
    // document.querySelector('#deleteItemName').firstElementChild.value = item_name;
    document.querySelector('#deleteQuantity').firstElementChild.text = quantity;
    document.querySelector('#deleteUnitOfMeasure').firstElementChild.text = unit_of_measure;
    document.querySelector('#deleteCost').firstElementChild.text = cost;
    document.querySelector('#deleteSupplierName').firstElementChild.text = supplier;
});

deletePurchaseForm.addEventListener('submit', event => {
    event.preventDefault();
    // let 
    let purchase_id = event.currentTarget.querySelector('#deleteID').value;
    deletePurchase(purchase_id);
});

updateIDSelect.addEventListener('change', event => {
    let entered_purchase_id = updateIDSelect.value;
    // MUST RETRIEVE LOCALSTORAGE FOR EVERY EVENT
    const listOfPurchases = JSON.parse(localStorage.getItem('listOfPurchases'));
    let 
        // cannot be updated
        item, 
        unit_of_measure,
        // can be updated
        supplier, 
        quantity, 
        cost;
    for (const purchase of listOfPurchases) {
        if (purchase.id === entered_purchase_id) {
            item = purchase.item;
            unit_of_measure = purchase.unit_of_measure;
            supplier = purchase.supplier;
            quantity = purchase.quantity;
            cost = purchase.cost;
        }
    }
    // cannot be updated
    document.querySelector('#updateItemName').firstElementChild.text = item;
    document.querySelector('#updateUnitOfMeasure').firstElementChild.text = unit_of_measure;

    // can be updated
    document.querySelector('#updateSupplierName').firstElementChild.text = supplier;
    document.querySelector('#updateSupplierName').firstElementChild.value = supplier;
    document.querySelector('#updateQuantity').text = quantity;
    document.querySelector('#updateQuantity').value = quantity;
    document.querySelector('#updateCost').text = cost;
    document.querySelector('#updateCost').value = cost;
});

updatePurchaseForm.addEventListener('submit', event => {
    event.preventDefault();
    let purchase_id = event.currentTarget.querySelector('#updateID').value;
    let quantity = event.currentTarget.querySelector('#updateQuantity').value;
    let cost = event.currentTarget.querySelector('#updateCost').value;
    let entered_supplier_name = event.currentTarget.querySelector('#updateSupplierName').value;
    let supplier_id;
    for (const supplier of listOfSuppliers) {
        if (supplier.name === entered_supplier_name) {
            supplier_id = supplier.id;
            break;
        }
    }
    console.log(purchase_id, quantity, cost, supplier_id);
    updatePurchase(purchase_id, quantity, cost, supplier_id);
});