let customers = [];
let products = [];
let billings = [];

let totalSales = 0;  
let totalRevenue = 0;  

function saveCustomer() {
    let gender = document.querySelector('input[name="gender"]:checked').value;
    
    let customer = {
        name: document.getElementById("customer-name").value,
        gender: gender,
        contact: document.getElementById("customer-contact").value,
        email: document.getElementById("customer-email").value
    };

    customers.push(customer);
    updateCustomerList();
    updateCustomerDropdown();
}

function clearInput() {
    document.getElementById('customer-name').value = '';
    document.getElementById('customer-contact').value = '';
    document.getElementById('customer-email').value = '';
    document.querySelector('input[name="gender"]:checked').checked = false;  
}

function updateCustomerList() {
    let customerTable = document.getElementById("customer-list");
    customerTable.innerHTML = `
        <tr>
            <th>Name</th>
            <th>Gender</th>
            <th>Contact</th>
            <th>Email</th>
        </tr>`;
    customers.forEach(customer => {
        customerTable.innerHTML += `
            <tr>
                <td>${customer.name}</td>
                <td>${customer.gender}</td>
                <td>${customer.contact}</td>
                <td>${customer.email}</td>
            </tr>`;
    });
}

function updateCustomerDropdown() {
    let customerDropdown = document.getElementById("billing-customer");
    customerDropdown.innerHTML = "";  // Clear existing options
    customers.forEach(customer => {
        let option = document.createElement("option");
        option.value = customer.name;
        option.text = customer.name;
        customerDropdown.add(option);
    });
}

function saveProduct() {
    let product = {
        name: document.getElementById("product-name").value,
        price: parseFloat(document.getElementById("product-price").value),
        quantity: parseInt(document.getElementById("product-quantity").value),
        brand: document.getElementById("product-brand").value,
        supplier: document.getElementById("product-supplier").value,
        oldStock: parseInt(document.getElementById("old-stock").value),
        category: document.getElementById("product-category").value
    };

    products.push(product);
    updateProductList();
    updateProductDropdown();  // Update dropdown after adding product
}

function updateProductList() {
    let productTable = document.getElementById("product-list");
    productTable.innerHTML = `
        <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Brand</th>
            <th>Actions</th>
        </tr>`;
    products.forEach((product, index) => {
        productTable.innerHTML += `
            <tr>
                <td>${product.name}</td>
                <td>$${product.price.toFixed(2)}</td>
                <td>${product.quantity}</td>
                <td>${product.brand}</td>
                <td>
                    <button onclick="editProduct(${index})">Edit</button>
                    <button onclick="deleteProduct(${index})">Delete</button>
                </td>
            </tr>`;
    });
}
// Assuming customers is an array defined somewhere in your code
// let customers = [];

function saveCustomer() {
    // Get selected gender, handle the case if no gender is selected
    let gender = document.querySelector('input[name="gender"]:checked');
    if (!gender) {
        alert('Please select a gender.');
        return; // Stop if no gender is selected
    }
    
    // Get the contact number value
    let contact = document.getElementById("customer-contact").value;

    // Check if the contact number is valid (10 digits)
    if (!/^\d{10}$/.test(contact)) {
        alert('Please enter a valid contact number with exactly 10 digits.');
        return; // Stop if the contact number is not valid
    }

    // Create a customer object
    let customer = {
        name: document.getElementById("customer-name").value,
        gender: gender.value,
        contact: contact,
        email: document.getElementById("customer-email").value
    };

    // Add customer to the customers array
    customers.push(customer);

    // Update customer list and dropdown (assuming these functions are defined)
    updateCustomerList();
    updateCustomerDropdown();

    // Show a success alert
    // alert('Customer data saved successfully!');
}





function updateProductDropdown() {
    let productDropdown = document.getElementById("billing-product");
    productDropdown.innerHTML = "";  // Clear existing options
    products.forEach(product => {
        let option = document.createElement("option");
        option.value = product.name;
        option.text = product.name;
        productDropdown.add(option);
    });
}

function addBilling() {
    let selectedCustomer = document.getElementById("billing-customer").value;
    let selectedProduct = document.getElementById("billing-product").value;

    let product = products.find(p => p.name === selectedProduct);
    
    if (!product) {
        alert('Product not found!');
        return;
    }

    let totalAmount = product.price*product.quantity;  

    let billing = { customer: selectedCustomer, product: selectedProduct, total: totalAmount };
    billings.push(billing);
    

    totalSales++;  
    totalRevenue += totalAmount;  

    updateBillingList();
    updateDashboard(); 
}

function updateBillingList() {
    let billingTable = document.getElementById("billing-list");
    let tableContent = `
        <tr>
            <th>Customer</th>
            <th>Product</th>
            <th>Total</th>
            <th>Actions</th>
        </tr>`;

    billings.forEach((billing, index) => {
        tableContent += `
            <tr>
                <td>${billing.customer}</td>
                <td>${billing.product}</td>
                <td>$${billing.total.toFixed(2)}</td>
                <td>
                    <button onclick="deleteBilling(${index})">Delete</button>
                </td>
            </tr>`;
    });

    billingTable.innerHTML = tableContent; 
}

function updateDashboard() {
    document.getElementById("total-sales").textContent = totalSales;
    document.getElementById("total-revenue").textContent = `$${totalRevenue.toFixed(2)}`;
}

function deleteBilling(index) {
    let billing = billings[index];
    
    totalSales--;  
    totalRevenue -= billing.total;  

    billings.splice(index, 1); 
    updateBillingList();
    updateDashboard();  
}

function deleteProduct(index) {
    products.splice(index, 1);  
    updateProductList();  
}

function editProduct(index) {
    let product = products[index];
    document.getElementById("product-name").value = product.name;
    document.getElementById("product-price").value = product.price;
    document.getElementById("product-quantity").value = product.quantity;
    document.getElementById("product-brand").value = product.brand;
    document.getElementById("product-supplier").value = product.supplier;
    document.getElementById("old-stock").value = product.oldStock;
    document.getElementById("product-category").value = product.category;

    deleteProduct(index);
}
