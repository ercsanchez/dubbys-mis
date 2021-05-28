//for filterbox category

// const selected = document.querySelector(".selected");
// const optionsContainer = document.querySelector(".options-container");

// const optionsList = document.querySelectorAll(".option");

// selected.addEventListener("click", () => {
// 	optionsContainer.classList.toggle("active");
// });

// optionsList.forEach( o => {
// 	o.addEventListener("click", () => {
// 		selected.innerHTML = o.querySelector("label").innerHTML;
// 		optionsContainer.classList.remove("active");
// 	});
// });

axios.defaults.baseURL = 'https://cmsc209-api.herokuapp.com/api/v1';

// might remove signup and querying users feature
const getAllUsersBtn = document.querySelector('#btn-get-all-users');
const getUserBtn = document.querySelector('#btn-get-user');
const putUserBtn = document.querySelector('#btn-put-user');
const deleteUserBtn = document.querySelector('#btn-delete-user');

const getAllCategoriesBtn = document.querySelector('#btn-get-all-categories');

const addSupplierBtn = document.querySelector('#btn-add-supplier');
const getAllSuppliersBtn = document.querySelector('#btn-get-all-suppliers');
const getSupplierBtn = document.querySelector('#btn-get-supplier');
const putSupplierBtn = document.querySelector('#btn-put-supplier');
const deleteSupplierBtn = document.querySelector('#btn-delete-supplier');

const addItemBtn = document.querySelector('#btn-add-item');
const getAllItemsBtn = document.querySelector('#btn-get-all-items');
const getItemBtn = document.querySelector('#btn-get-item');
const putItemBtn = document.querySelector('#btn-put-item');
const deleteItemBtn = document.querySelector('#btn-delete-item');


getAllCategoriesBtn.addEventListener('click', event => {
    getAllCategories();
});

addSupplierBtn.addEventListener('click', event => {
    let name = "Supplier4";
    let address = "Somewhere around the area";
    addSupplier(name, address);
});

getAllSuppliersBtn.addEventListener('click', event => {
    getAllSuppliers();
});

getSupplierBtn.addEventListener('click', event => {
    let id = 1;
    getSupplier(id);
});


// might remove signup and querying users feature
// async function getAllUsers() {
//     try{
//         const response = await axios.get('/users');
//         console.log('response.data:', response.data);
//     }
//     catch (err) {
//         alert(err.message);
//         console.error('err.response:', err.response)
//     }
// }
// async function getUser(id) {
//     try{
//         const response = await axios.get(`/users/${id}`);
//         console.log('response.data:', response.data);
//     }
//     catch (err) {
//         alert(err.message);
//         console.error('err.response:', err.response)
//     }
// }