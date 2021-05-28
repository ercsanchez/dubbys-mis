// import { logoutUser, getAllItems, getAllSuppliers, displayAllPurchases, addPurchase, deletePurchase, updatePurchase } from "./controller.js";
import { logoutUser, getAllItems, displayAllConsumptions, addConsumption, deleteConsumption, updateConsumption } from "./controller.js";

axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwt');

// const listOfItems = JSON.parse(localStorage.getItem('listOfItems'));
// const listOfConsumptions = JSON.parse(localStorage.getItem('listOfConsumptions'));

const logoutBtn = document.querySelector('#btn-logout');
const addItemNameSelect = document.querySelector('#addItemName');
const addConsumptionForm = document.querySelector('#addConsumptionForm');
const deleteConsumptionForm = document.querySelector('#deleteConsumptionForm');
const deleteIDSelect = document.querySelector('#deleteID');
const updateConsumptionForm = document.querySelector('#updateConsumptionForm');
const updateIDSelect = document.querySelector('#updateID');

if (!axios.defaults.headers.common['Authorization'] || axios.defaults.headers.common['Authorization'] !== localStorage.getItem('jwt')) {
    alert('You are unauthorized. Please log in.');
    logoutUser();
}

if (localStorage.getItem('username')) {
    document.querySelector('.logout a').text = localStorage.getItem('username');
}

if (!('listOfItems' in localStorage)) {
    getAllItems();
} 

displayAllConsumptions();

logoutBtn.addEventListener('click', event => {
    event.preventDefault();
    logoutUser();
});

addItemNameSelect.addEventListener('change', event => {
    const listOfItems = JSON.parse(localStorage.getItem('listOfItems'));
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

addConsumptionForm.addEventListener('submit', event => {
    event.preventDefault();
    const listOfItems = JSON.parse(localStorage.getItem('listOfItems'));
    let entered_itemName = event.currentTarget.querySelector('#addItemName').value;
    let quantity = event.currentTarget.querySelector('#addQuantity').value;
    let item_id;
    for (const item of listOfItems) {
        if (item.name === entered_itemName) {
            item_id = item.id;
        }
    }
    console.log(item_id, quantity);
    addConsumption(item_id, quantity);
});

deleteIDSelect.addEventListener('change', event => {
    let entered_consumption_id = deleteIDSelect.value;
    let item_name, quantity, unit_of_measure, cost, supplier;
    const listOfConsumptions = JSON.parse(localStorage.getItem('listOfConsumptions'));
    for (const consumption of listOfConsumptions) {
        if (consumption.id === entered_consumption_id) {
            item_name = consumption.item;
            quantity = consumption.quantity;
            unit_of_measure = consumption.unit_of_measure;
        }
    }
    document.querySelector('#deleteItemName').firstElementChild.text = item_name;
    document.querySelector('#deleteQuantity').firstElementChild.text = quantity;
    document.querySelector('#deleteUnitOfMeasure').firstElementChild.text = unit_of_measure;
    document.querySelector('#deleteUnitOfMeasure').firstElementChild.value = unit_of_measure;
});

deleteConsumptionForm.addEventListener('submit', event => {
    event.preventDefault();
    let consumption_id = event.currentTarget.querySelector('#deleteID').value;
    deleteConsumption(consumption_id);
});

updateIDSelect.addEventListener('change', event => {
    let entered_consumption_id = updateIDSelect.value;
    // MUST RETRIEVE LOCALSTORAGE FOR EVERY EVENT
    const listOfConsumptions = JSON.parse(localStorage.getItem('listOfConsumptions'));
    let 
        // cannot be updated
        item, 
        unit_of_measure,
        // can be updated
        quantity
    for (const consumption of listOfConsumptions) {
        if (consumption.id === entered_consumption_id) {
            item = consumption.item;
            unit_of_measure = consumption.unit_of_measure;
            quantity = consumption.quantity;
        }
    }
    // cannot be updated
    document.querySelector('#updateItemName').firstElementChild.text = item;
    document.querySelector('#updateUnitOfMeasure').firstElementChild.text = unit_of_measure;
    document.querySelector('#updateUnitOfMeasure').firstElementChild.value = unit_of_measure;

    // can be updated
    document.querySelector('#updateQuantity').text = quantity;
    document.querySelector('#updateQuantity').value = quantity;
});

updateConsumptionForm.addEventListener('submit', event => {
    event.preventDefault();
    let consumption_id = event.currentTarget.querySelector('#updateID').value;
    let quantity = event.currentTarget.querySelector('#updateQuantity').value;
    // let cost = event.currentTarget.querySelector('#updateCost').value;
    // let entered_supplier_name = event.currentTarget.querySelector('#updateSupplierName').value;
    // let supplier_id;
    // const listOfSuppliers = JSON.parse(localStorage.getItem('listOfSuppliers'));
    // for (const supplier of listOfSuppliers) {
    //     if (supplier.name === entered_supplier_name) {
    //         supplier_id = supplier.id;
    //         break;
    //     }
    // }
    updateConsumption(consumption_id, quantity);
});