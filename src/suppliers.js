import { logoutUser, displayAllSuppliers, addSupplier, deleteSupplier, updateSupplier } from './controller.js';

axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwt');

const listOfSuppliers = JSON.parse(localStorage.getItem('listOfSuppliers'));

const logoutBtn = document.querySelector('#btn-logout');
const addSupplierForm = document.querySelector('#addSupplierForm');
const deleteSupplierForm = document.querySelector('#deleteSupplierForm');
const updateSupplierForm = document.querySelector('#updateSupplierForm');
const updateName = document.querySelector('#updateName');


if (!axios.defaults.headers.common['Authorization'] || axios.defaults.headers.common['Authorization'] !== localStorage.getItem('jwt')) {
    alert('You are unauthorized. Please log in.');
    logoutUser();
}

if (localStorage.getItem('username')) {
    document.querySelector('.logout a').text = localStorage.getItem('username');
}

displayAllSuppliers();


logoutBtn.addEventListener('click', event => {
    event.preventDefault();
    logoutUser();
});


addSupplierForm.addEventListener('submit', event => {
    event.preventDefault();
    let name = event.currentTarget.querySelector('#addName').value;
    let address = event.currentTarget.querySelector('#addAddress').value;
    let contact_person = event.currentTarget.querySelector('#addContactPerson').value;
    let contact_number = event.currentTarget.querySelector('#addContactNumber').value;
    let payment_mode = event.currentTarget.querySelector('#addPaymentMode').value;
    let credit_term = event.currentTarget.querySelector('#addCreditTerm').value;
    addSupplier(name, address, contact_person, contact_number, payment_mode, credit_term);
});

deleteSupplierForm.addEventListener('submit', event => {
    event.preventDefault();
    let name = event.currentTarget.querySelector('#deleteName').value;
    deleteSupplier(name);
});

updateName.addEventListener('change', event => {
    let entered_name = updateName.value;
    let 
        address, 
        contact_person, 
        contact_number, 
        payment_mode, 
        credit_term;
    console.log(updateName.value);
    for (const supplier of listOfSuppliers) {
        if (supplier.name === entered_name) {
            address = supplier.address;
            contact_person = supplier.contact_person;
            contact_number = supplier.contact_number;
            payment_mode = supplier.payment_mode;
            credit_term = supplier.credit_term;
        }
    }
    document.querySelector('#updateAddress').value = address;
    document.querySelector('#updateContactPerson').value = contact_person;
    document.querySelector('#updateContactNumber').value = contact_number;
    document.querySelector('#updatePaymentMode').value = payment_mode;
    document.querySelector('#updateCreditTerm').value = credit_term;
})

updateSupplierForm.addEventListener('submit', event => {
    event.preventDefault();
    let entered_name = event.currentTarget.querySelector('#updateName').value;
    let entered_address = event.currentTarget.querySelector('#updateAddress').value;
    let entered_contact_person = event.currentTarget.querySelector('#updateContactPerson').value;
    let entered_contact_number = event.currentTarget.querySelector('#updateContactNumber').value;
    let entered_payment_mode = event.currentTarget.querySelector('#updatePaymentMode').value;
    let entered_credit_term = event.currentTarget.querySelector('#updateCreditTerm').value;
    let supplier_id;
    for (const supplier of listOfSuppliers) {
        if (supplier.name === entered_name) {
            supplier_id = supplier.id;
            break;
        }
    }
    updateSupplier(supplier_id, entered_address, entered_contact_person, entered_contact_number, entered_payment_mode, entered_credit_term);
});

console.log('addSupplierModal:', document.getElementById('addSupplierModal'));