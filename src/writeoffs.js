import { logoutUser, getAllItems, displayAllWriteoffs, addWriteoff } from "./controller.js";

axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwt');

const logoutBtn = document.querySelector('#btn-logout');
const addItemNameSelect = document.querySelector('#addItemName');
// const addWriteoffForm = document.querySelector('#addWriteoffForm');
// const deleteConsumptionForm = document.querySelector('#deleteConsumptionForm');
// const deleteIDSelect = document.querySelector('#deleteID');
// const updateConsumptionForm = document.querySelector('#updateConsumptionForm');
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

displayAllWriteoffs();

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

addWriteoffForm.addEventListener('submit', event => {
    event.preventDefault();
    const listOfItems = JSON.parse(localStorage.getItem('listOfItems'));
    let entered_itemName = event.currentTarget.querySelector('#addItemName').value;
    let quantity = event.currentTarget.querySelector('#addQuantity').value;
    let just_cause = event.currentTarget.querySelector('#addReason').value;
    let item_id;
    for (const item of listOfItems) {
        if (item.name === entered_itemName) {
            item_id = item.id;
        }
    }
    addWriteoff(item_id, quantity, just_cause);
});