// import { logoutUser, getAllItems, getAllSuppliers, displayAllPurchases, addPurchase, deletePurchase, updatePurchase } from "./controller.js";
import { logoutUser, getAllItems, displayAllConsumptions, addConsumption } from "./controller.js";

axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwt');

const logoutBtn = document.querySelector('#btn-logout');
const addItemNameSelect = document.querySelector('#addItemName');
const addConsumptionForm = document.querySelector('#addConsumptionForm');
// const deletePurchaseForm = document.querySelector('#deletePurchaseForm');
// const deleteIDSelect = document.querySelector('#deleteID');
// const updatePurchaseForm = document.querySelector('#updatePurchaseForm');
// const updateIDSelect = document.querySelector('#updateID');

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