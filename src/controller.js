axios.defaults.baseURL = 'https://cmsc209-api.herokuapp.com/api/v1';

export async function logoutUser() {
    try {
        localStorage.clear()
        window.location.href = window.location.origin + '/login.html';
        alert('successfully logged out');
    }
    catch (err) {
        alert(err.message)
        console.error('err.response:', err.response);
    }
}

export async function getAllCategories() {
    try{
        const response = await axios.get('/categories');
        console.log('getAllCategories response.data:', response.data);
        const listOfCategories = response.data.data.categories;
        localStorage.setItem('listOfCategories', JSON.stringify(listOfCategories));
        const addCategorySelect = document.querySelector('#addCategory');
        const updateCategorySelect = document.querySelector('#updateCategory');
        console.log(addCategorySelect);
        for (const category of listOfCategories) {
            // const optionCategory = document.importNode(addCategorySelect.firstElementChild, true);
            const optionCategory = document.createElement('option');
            optionCategory.value = category.name;
            optionCategory.text = category.name;
            addCategorySelect.append(optionCategory);
            updateCategorySelect.append(document.importNode(optionCategory, true));
        }
    }
    catch (err) {
        alert(err.message);
        console.error('err.response:', err.response)
    }
}

export async function displayAllItems() {
    try{

        let listOfItems, listOfPurchases, listOfConsumptions, listOfWriteoffs;
  
        const responseItems = await axios.get('/items');
        listOfItems = responseItems.data.data.items;
        localStorage.setItem('listOfItems', JSON.stringify(listOfItems));

        if (!('listOfPurchases' in localStorage)) {
            let response = await axios.get('/purchases');
            listOfPurchases = response.data.data.purchases;
            localStorage.setItem('listOfPurchases', JSON.stringify(listOfPurchases));
        } else {
            listOfPurchases = JSON.parse(localStorage.getItem('listOfPurchases'));
        }
        if (!('listOfConsumptions' in localStorage)) {
            let response = await axios.get('/consumptions');
            listOfConsumptions = response.data.data.consumptions;
            localStorage.setItem('listOfConsumptions', JSON.stringify(listOfConsumptions));
        } else {
            listOfConsumptions = JSON.parse(localStorage.getItem('listOfConsumptions'));
        }
        if (!('listOfWriteoffs' in localStorage)) {
            let response = await axios.get('/writeoffs');
            listOfWriteoffs = response.data.data.writeoffs;
            localStorage.setItem('listOfWriteoffs', JSON.stringify(listOfWriteoffs));
        } else {
            listOfWriteoffs = JSON.parse(localStorage.getItem('listOfWriteoffs'));
        }

        const rowItemTemplate = document.querySelector('#row-item-template');
        const tableItems = document.querySelector('#table-items');
        const deleteNameSelect = document.querySelector('#deleteName');
        const updateNameSelect = document.querySelector('#updateName');

        for (const item of listOfItems) {
            const rowItem = document.importNode(rowItemTemplate.content, true).firstElementChild;
            rowItem.children[0].textContent = item.name;
            rowItem.children[1].textContent = item.category;
            rowItem.children[2].textContent = item.description;

            rowItem.children[4].textContent = item.unit_of_measure;
            rowItem.children[5].textContent = item.updated_by || item.created_by;
            tableItems.append(rowItem);
    
            const optionName = document.createElement('option');
            optionName.value = item.name;
            optionName.text = item.name;
            deleteNameSelect.append(optionName);
            updateNameSelect.append(document.importNode(optionName, true));

            let itemQuantity = 0;
            for (const purchase of listOfPurchases) {
                if (purchase.item === item.name) {
                    itemQuantity += Number(purchase.quantity);
                }
            }
            for (const consumption of listOfConsumptions) {
                if (consumption.item === item.name) {
                    itemQuantity -= Number(consumption.quantity);
                }
            }
            for (const writeoff of listOfWriteoffs) {
                if (writeoff.item === item.name) {
                    itemQuantity -= Number(writeoff.quantity);
                }
            }
            rowItem.children[3].textContent = itemQuantity;
        }
    }
    catch (err) {
        alert(err.message);
        console.error('err.response:', err.response);
    }
}

export async function getAllItems() {
    try{
        const response = await axios.get('/items');
        const listOfItems = response.data.data.items;
        localStorage.setItem('listOfItems', JSON.stringify(listOfItems));
    }
    catch (err) {
        alert(err.message);
        console.error('err.response:', err.response);
    }
}

export async function addItem(name, category_id, description, unit_of_measure) {
    try{
        let data = {
            name,
            category_id,
            description,
            unit_of_measure
        }
        const response = await axios.post('/items', data);
        console.log('response.data:', response.data);
        alert('Successfully added item!!!');
        location.reload();
    }
    catch (err) {
        alert(err.message);
        console.error('err.response:', err.response)
    }
}

export async function deleteItem(name) {
    let result= confirm("Are you sure you want to delete the item?");
    if(result == true) {
        try {
            const getItemResponse = await axios.get('/items');
            console.log(getItemResponse.data.data.items);
            for (const item of getItemResponse.data.data.items) {
                if (item.name === name) {
                    const response = await axios.delete(`/items/${item.id}`);
                    console.log('response.data for delete:', response.data);
                    break
                }
            }
            alert('Successfully deleted item!!!');
            location.reload();
        }
        catch (err) {
            alert(err.message);
            console.error('err.response', err.response);
        }
    }
}

export async function updateItem(item_id, category_id, description, unit_of_measure) {
    let result= confirm("Are you sure you want to update the item?");
    if(result == true) {
        try {
            let data = {
                category_id,
                description,
                unit_of_measure
            }
            const response = await axios.put(`/items/${item_id}`, data);
            alert('Successfully updated item!!!');
            location.reload();
        }
        catch (err) {
            alert(err.message);
            console.error('err.response', err.response);
        }
    }
}

export async function displayAllSuppliers() {
    try{
        const responseSuppliers = await axios.get('/suppliers');
        const listOfSuppliers = responseSuppliers.data.data.suppliers;
        localStorage.setItem('listOfSuppliers', JSON.stringify(listOfSuppliers));

        const rowSupplierTemplate = document.querySelector('#row-supplier-template');
        const tableSuppliers = document.querySelector('#table-suppliers');
        const deleteNameSelect = document.querySelector('#deleteName');
        const updateNameSelect = document.querySelector('#updateName');

        for (const supplier of listOfSuppliers) {
            const rowSupplier = document.importNode(rowSupplierTemplate.content, true).firstElementChild;

            rowSupplier.children[0].textContent = supplier.name;
            rowSupplier.children[1].textContent = supplier.address;
            rowSupplier.children[2].textContent = supplier.contact_person;
            rowSupplier.children[3].textContent = supplier.contact_number;
            rowSupplier.children[4].textContent = supplier.payment_mode;
            rowSupplier.children[5].textContent = supplier.credit_term;
            rowSupplier.children[6].textContent = supplier.updated_by || supplier.created_by;
            tableSuppliers.append(rowSupplier);

            const optionName = document.createElement('option');
            optionName.value = supplier.name;
            optionName.text = supplier.name;
            deleteNameSelect.append(optionName);
            updateNameSelect.append(document.importNode(optionName, true));
        }
    }
    catch (err) {
        alert(err.message);
        console.error('err.response:', err.response)
    }
}

export async function getAllSuppliers() {
    try{
        const response = await axios.get('/suppliers');
        const listOfSuppliers = response.data.data.suppliers;
        localStorage.setItem('listOfSuppliers', JSON.stringify(listOfSuppliers));
    }
    catch (err) {
        alert(err.message);
        console.error('err.response:', err.response)
    }
}

export async function addSupplier(name, address, contact_person, contact_number, payment_mode, credit_term) {
    try{
        let data = {
            name,
            address,
            contact_person,
            contact_number,
            payment_mode,
            credit_term
        }
        const response = await axios.post('/suppliers', data);
        console.log('response.data:', response.data);
        alert('Successfully added supplier!!!');
        location.reload();
    }
    catch (err) {
        alert(err.message);
        console.error('err.response:', err.response)
    }
}

export async function deleteSupplier(name) {
    let result= confirm("Are you sure you want to delete the supplier?");
    if(result == true) {
        try {
            let listOfSuppliers = JSON.parse(localStorage.getItem('listOfSuppliers'));
            console.log('listOfSuppliers:', listOfSuppliers);
            for (const supplier of listOfSuppliers) {
                if (supplier.name === name) {
                    const response = await axios.delete(`/suppliers/${supplier.id}`);
                    console.log('response.data for delete:', response.data);
                    break
                }
            }
            alert('Successfully deleted supplier');
            location.reload();
        }
        catch (err) {
            alert(err.message);
            console.error('err.response', err.response);
        }
    }
}

export async function updateSupplier(supplier_id, address, contact_person, contact_number, payment_mode, credit_term) {
    let result= confirm("Are you sure you want to update the supplier?");
    if(result == true) {
        try {
            let data = {
                address,
                contact_person,
                contact_number,
                payment_mode,
                credit_term
            }
            const response = await axios.put(`/suppliers/${supplier_id}`, data);
            alert('Successfully updated supplier!!!');
            location.reload();
        }
        catch (err) {
            alert(err.message);
            console.error('err.response', err.response);
        }
    }
}

export async function displayAllPurchases() {
    try{
        const responsePurchases = await axios.get('/purchases');
        const listOfPurchases = responsePurchases.data.data.purchases;
        localStorage.setItem('listOfPurchases', JSON.stringify(listOfPurchases));

        let listOfItems, listOfSuppliers;
  
        if (!('listOfItems' in localStorage)) {
            let response = await axios.get('/items');
            listOfItems = response.data.data.items;
            localStorage.setItem('listOfItems', JSON.stringify(listOfItems));
        } else {
            listOfItems = JSON.parse(localStorage.getItem('listOfItems'));
        }
        if (!('listOfSuppliers' in localStorage)) {
            let response = await axios.get('/suppliers');
            listOfSuppliers = response.data.data.suppliers;
            localStorage.setItem('listOfSuppliers', JSON.stringify(listOfSuppliers));
        } else {
            listOfSuppliers = JSON.parse(localStorage.getItem('listOfSuppliers'));
        }

        const rowPurchaseTemplate = document.querySelector('#row-purchase-template');
        const tablePurchases = document.querySelector('#table-purchases');
        const addItemNameSelect = document.querySelector('#addItemName');
        const addSupplierNameSelect = document.querySelector('#addSupplierName');

        const deleteIDSelect = document.querySelector('#deleteID');
        const updateIDSelect = document.querySelector('#updateID');
        const updateSupplierNameSelect = document.querySelector('#updateSupplierName');

        for (const purchase of listOfPurchases) {
            const rowPurchase = document.importNode(rowPurchaseTemplate.content, true).firstElementChild;

            rowPurchase.children[0].textContent = purchase.id;
            rowPurchase.children[1].textContent = purchase.item;
            rowPurchase.children[2].textContent = purchase.quantity;
            rowPurchase.children[3].textContent = purchase.unit_of_measure;
            rowPurchase.children[4].textContent = purchase.cost;
            rowPurchase.children[5].textContent = purchase.supplier;
            rowPurchase.children[6].textContent = new Date(purchase.created_at).toGMTString();
            rowPurchase.children[7].textContent = purchase.updated_by || purchase.created_by;
            tablePurchases.append(rowPurchase);

            const optionID = document.createElement('option');
            optionID.value = purchase.id;
            optionID.text = purchase.id;
            deleteIDSelect.append(optionID);
            updateIDSelect.append(document.importNode(optionID, true));
        }
        for (const item of listOfItems) {
            const optionItemName = document.createElement('option');
            optionItemName.value = item.name;
            optionItemName.text = item.name;
            addItemNameSelect.append(optionItemName);
        }
        for (const supplier of listOfSuppliers) {
            const optionSupplierName = document.createElement('option');
            optionSupplierName.value = supplier.name;
            optionSupplierName.text = supplier.name;
            addSupplierNameSelect.append(optionSupplierName);
            updateSupplierNameSelect.append(document.importNode(optionSupplierName, true));
        }
    }
    catch (err) {
        alert(err.message);
        console.error('err.response:', err.response)
    }
}

export async function addPurchase(item_id, quantity, cost, supplier_id) {
    try{
        let data = {
            item_id,
            quantity,
            cost,
            supplier_id
        }
        const response = await axios.post('/purchases', data);
        console.log('response.data:', response.data);
        alert('Successfully added purchase entry!!!');
        location.reload();
    }
    catch (err) {
        alert(err.message);
        console.error('err.response:', err.response)
    }
}

export async function deletePurchase(purchase_id) {
    let result= confirm("Are you sure you want to delete the purchase?");
    if(result == true) {
        try {
            let listOfPurchases = JSON.parse(localStorage.getItem('listOfPurchases'));
            console.log('listOfPurchases:', listOfPurchases);
            for (const purchase of listOfPurchases) {
                if (purchase.id === purchase_id) {
                    const response = await axios.delete(`/purchases/${purchase.id}`);
                    console.log('response.data for delete:', response.data);
                    break
                }
            }
            alert('Successfully deleted purchase entry!!!');
            location.reload();
        }
        catch (err) {
            alert(err.message);
            console.error('err.response', err.response);
        }
    }
}

export async function updatePurchase(purchase_id, quantity, cost, supplier_id) {
    let result= confirm("Are you sure you want to update the purchase?");
    if(result == true) {
        try {
            let data = {
                quantity,
                cost,
                supplier_id
            }
            const response = await axios.put(`/purchases/${purchase_id}`, data);
            console.log(response);
            alert('Successfully updated purchase entry!!!');
            location.reload();
        }
        catch (err) {
            alert(err.message);
            console.error('err.response', err.response);
        }
    }
}

export async function displayAllConsumptions() {
    try {
        const responseConsumptions = await axios.get('/consumptions');
        const listOfConsumptions = responseConsumptions.data.data.consumptions;
        localStorage.setItem('listOfConsumptions', JSON.stringify(listOfConsumptions));

        let listOfItems;
  
        if (!('listOfItems' in localStorage)) {
            let response = await axios.get('/items');
            listOfItems = response.data.data.items;
            localStorage.setItem('listOfItems', JSON.stringify(listOfItems));
        } else {
            listOfItems = JSON.parse(localStorage.getItem('listOfItems'));
        }

        const rowConsumptionTemplate = document.querySelector('#row-consumption-template');
        const tableConsumptions = document.querySelector('#table-consumptions');
        const addItemNameSelect = document.querySelector('#addItemName');
        const deleteIDSelect = document.querySelector('#deleteID');
        const updateIDSelect = document.querySelector('#updateID');

        for (const consumption of listOfConsumptions) {
            const rowConsumption = document.importNode(rowConsumptionTemplate.content, true).firstElementChild;
            rowConsumption.children[0].textContent = consumption.id;
            rowConsumption.children[1].textContent = consumption.item;
            rowConsumption.children[2].textContent = consumption.quantity;
            rowConsumption.children[3].textContent = consumption.unit_of_measure;
            rowConsumption.children[4].textContent = new Date(consumption.created_at).toGMTString();
            rowConsumption.children[5].textContent = consumption.updated_by || consumption.created_by;
            tableConsumptions.append(rowConsumption);

            const optionID = document.createElement('option');
            optionID.value = consumption.id;
            optionID.text = consumption.id;
            deleteIDSelect.append(optionID);
            updateIDSelect.append(document.importNode(optionID, true));
        }
        for (const item of listOfItems) {
            const optionItemName = document.createElement('option');
            optionItemName.value = item.name;
            optionItemName.text = item.name;
            addItemNameSelect.append(optionItemName);
        }
    }
    catch (err) {
        alert(err.message);
        console.error('err.response:', err.response)
    }
}

export async function addConsumption(item_id, quantity) {
    try{
        let data = {
            item_id,
            quantity
        }
        const response = await axios.post('/consumptions', data);
        console.log('response.data:', response.data);
        alert('Successfully added consumption entry!!!');
        location.reload();
    }
    catch (err) {
        alert(err.message);
        console.error('err.response:', err.response)
    }
}

export async function deleteConsumption(consumption_id) {
    let result= confirm("Are you sure you want to delete the consumption?");
    if(result == true) {
        try {
            let listOfConsumptions = JSON.parse(localStorage.getItem('listOfConsumptions'));
            console.log('listOfConsumptions:', listOfConsumptions);
            for (const consumption of listOfConsumptions) {
                if (consumption.id === consumption_id) {
                    const response = await axios.delete(`/consumptions/${consumption.id}`);
                    console.log('response.data for delete:', response.data);
                    break
                }
            }
            alert('Successfully deleted consumption entry!!!');
            location.reload();
        }
        catch (err) {
            alert(err.message);
            console.error('err.response', err.response);
        }
    }
}

export async function updateConsumption(consumption_id, quantity) {
    let result= confirm("Are you sure you want to update the consumption?");
    if(result == true) {
        try {
            let data = {
                quantity
            }
            const response = await axios.put(`/consumptions/${consumption_id}`, data);
            alert('Successfully updated consumption entry!!!');
            location.reload();
        }
        catch (err) {
            alert(err.message);
            console.error('err.response', err.response);
        }
    }
}

export async function displayAllWriteoffs() {
    try {
        const responseWriteoffs = await axios.get('/writeoffs');
        const listOfWriteoffs = responseWriteoffs.data.data.writeoffs;
        localStorage.setItem('listOfWriteoffs', JSON.stringify(listOfWriteoffs));

        let listOfItems;
  
        if (!('listOfItems' in localStorage)) {
            let response = await axios.get('/items');
            listOfItems = response.data.data.items;
            localStorage.setItem('listOfItems', JSON.stringify(listOfItems));
        } else {
            listOfItems = JSON.parse(localStorage.getItem('listOfItems'));
        }

        const rowWriteoffTemplate = document.querySelector('#row-writeoff-template');
        const tableWriteoffs = document.querySelector('#table-writeoffs');
        const addItemNameSelect = document.querySelector('#addItemName');
        const deleteIDSelect = document.querySelector('#deleteID');
        const updateIDSelect = document.querySelector('#updateID');

        for (const writeoff of listOfWriteoffs) {
            const rowWriteoff = document.importNode(rowWriteoffTemplate.content, true).firstElementChild;
            rowWriteoff.children[0].textContent = writeoff.id;
            rowWriteoff.children[1].textContent = writeoff.item;
            rowWriteoff.children[2].textContent = writeoff.quantity;
            rowWriteoff.children[3].textContent = writeoff.unit_of_measure;
            rowWriteoff.children[4].textContent = writeoff.just_cause;
            rowWriteoff.children[5].textContent = new Date(writeoff.created_at).toGMTString();
            rowWriteoff.children[6].textContent = writeoff.updated_by || writeoff.created_by;
            tableWriteoffs.append(rowWriteoff);

            const optionID = document.createElement('option');
            optionID.value = writeoff.id;
            optionID.text = writeoff.id;
            deleteIDSelect.append(optionID);
            updateIDSelect.append(document.importNode(optionID, true));
        }
        for (const item of listOfItems) {
            const optionItemName = document.createElement('option');
            optionItemName.value = item.name;
            optionItemName.text = item.name;
            addItemNameSelect.append(optionItemName);
        }
    }
    catch (err) {
        alert(err.message);
        console.error('err.response:', err.response)
    }
}

export async function addWriteoff(item_id, quantity, just_cause) {
    try{
        let data = {
            item_id,
            quantity,
            just_cause
        }
        const response = await axios.post('/writeoffs', data);
        console.log('response.data:', response.data);
        alert('Successfully added write-off entry!!!');
        location.reload();
    }
    catch (err) {
        alert(err.message);
        console.error('err.response:', err.response)
    }
}

export async function deleteWriteoff(writeoff_id) {
    let result= confirm("Are you sure you want to delete the write-off?");
    if(result == true) {
        try {
            let listOfWriteoffs = JSON.parse(localStorage.getItem('listOfWriteoffs'));
            console.log('listOfWriteoffs:', listOfWriteoffs);
            for (const writeoff of listOfWriteoffs) {
                if (writeoff.id === writeoff_id) {
                    const response = await axios.delete(`/writeoffs/${writeoff.id}`);
                    console.log('response.data for delete:', response.data);
                    break
                }
            }
            alert('Successfully deleted write-off entry!!!');
            location.reload();
        }
        catch (err) {
            alert(err.message);
            console.error('err.response', err.response);
        }
    }
}

export async function updateWriteoff(writeoff_id, quantity, just_cause) {
    let result= confirm("Are you sure you want to update the write-off?");
    if(result == true) {
        try {
            let data = {
                quantity,
                just_cause
            }
            const response = await axios.put(`/writeoffs/${writeoff_id}`, data);
            alert('Successfully updated write-off entry!!!');
            location.reload();
        }
        catch (err) {
            alert(err.message);
            console.error('err.response', err.response);
        }
    }
}