import { logoutUser, getAllCategories, displayAllItems, addItem, deleteItem, updateItem} from './controller.js';

axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwt');
// const token = localStorage.getItem('jwt');   // not needed

const listOfItems = JSON.parse(localStorage.getItem('listOfItems'));
const listOfCategories = JSON.parse(localStorage.getItem('listOfCategories'));
// console.log('Authorization header: ', axios.defaults.headers.common['Authorization']);
// console.log('window origin: ', window.location.origin);
// console.log('window href: ', window.location.href);

const logoutBtn = document.querySelector('#btn-logout');
const addItemForm = document.querySelector('#addItemForm');
const deleteItemForm = document.querySelector('#deleteItemForm');
const updateItemForm = document.querySelector('#updateItemForm');
const updateName = document.querySelector('#updateName');


if (!axios.defaults.headers.common['Authorization'] || axios.defaults.headers.common['Authorization'] !== localStorage.getItem('jwt')) {
    alert('You are unauthorized. Please log in.');
    logoutUser();
}

if (localStorage.getItem('username')) {
    document.querySelector('.logout a').text = localStorage.getItem('username');
}

displayAllItems();
getAllCategories();

console.log(logoutBtn);
logoutBtn.addEventListener('click', event => {
    event.preventDefault();
    logoutUser();
});


addItemForm.addEventListener('submit', event => {
    event.preventDefault();
    let name = event.currentTarget.querySelector('#addName').value;
    let category_id;
    let entered_category = event.currentTarget.querySelector('#addCategory').value;
    // let listOfCategories = JSON.parse(localStorage.getItem('listOfCategories'));
    // console.log('listOfCategories:', listOfCategories);
    for (const category of listOfCategories) {
        // console.log('category.name:', category.name);
        // console.log('entered_category:', entered_category);
        if (category.name === entered_category) {
            category_id = category.id;
            break;
        }
    }
    let description = event.currentTarget.querySelector('#addDescription').value;
    // let quantity = parseInt(event.currentTarget.querySelector('#addQuantity').value);
    let unit_of_measure = event.currentTarget.querySelector('#addUnitOfMeasure').value;
    // let category = addCategoryField.value;
    // let description = addDescriptionField.value;
    // let quantity = addQuantityField.value;
    // let unitofmeasure = addUnitOfMeasureField.value; 
    // console.log(name, category_id, description, unit_of_measure);
    addItem(name, category_id, description, unit_of_measure);
});


deleteItemForm.addEventListener('submit', event => {
    event.preventDefault();
    let name = event.currentTarget.querySelector('#deleteName').value;
    console.log('name:', name);
    deleteItem(name);
});


updateName.addEventListener('change', event => {
    let entered_name = updateName.value;
    let category;
    let description;
    let unit_of_measure;
    // let listOfItems = JSON.parse(localStorage.getItem('listOfItems'));
    console.log(listOfItems);
    console.log(updateName.value);
    for (const item of listOfItems) {
        if (item.name === entered_name) {
            category = item.category;
            description = item.description;
            unit_of_measure = item.unit_of_measure;
        }
    }
    document.querySelector('#updateCategory').value = category;
    document.querySelector('#updateDescription').value = description;
    document.querySelector('#updateUnitOfMeasure').value = unit_of_measure;
})


updateItemForm.addEventListener('submit', event => {
    event.preventDefault();
    let entered_name = event.currentTarget.querySelector('#updateName').value;
    let entered_category = event.currentTarget.querySelector('#updateCategory').value;
    let entered_description = event.currentTarget.querySelector('#updateDescription').value;
    let entered_unitOfMeasure = event.currentTarget.querySelector('#updateUnitOfMeasure').value;
    console.log('update form values:', entered_name, entered_category, entered_description, entered_unitOfMeasure);
    // let listOfItems = JSON.parse(localStorage.getItem('listOfItems'));
    // let listOfCategories = JSON.parse(localStorage.getItem('listOfCategories'));
    let item_id;
    let category_id;
    for (const item of listOfItems) {
        if (item.name === entered_name) {
            item_id = item.id;
            break; 
        }
    }
    for (const category of listOfCategories) {
        if (category.name === entered_category) {
            category_id = category.id;
            break;
        }
    }
    updateItem(item_id, category_id, entered_description, entered_unitOfMeasure);
});


