const initialOrders = Array.from({ length: 5 }, (_, i) => ({
  id: "ORD-" + (i + 1),
  name: `User ${i + 1}`,
  phone: "01800000000",
  product: `Product ${i + 1}`,
  qty: Math.floor(Math.random() * 3) + 1,
  price: (Math.floor(Math.random() * 5) + 1) * 450,
  status: "Pending"
}));

const initialUsers = Array.from({ length: 5 }, (_, i) => ({
  id: "USR-" + (i + 1),
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  phone: "01800000000"
}));

// LocalStorage 
if (!localStorage.getItem("allOrders")) {
  localStorage.setItem("allOrders", JSON.stringify(initialOrders));
}

if (!localStorage.getItem("allUsers")) {
  localStorage.setItem("allUsers", JSON.stringify(initialUsers));
}

const getOrders = () => JSON.parse(localStorage.getItem("allOrders")) || [];
const getUsers = () => JSON.parse(localStorage.getItem("allUsers")) || [];

const saveOrders = (orders) => {
  localStorage.setItem("allOrders", JSON.stringify(orders));
  loadOrders();
};

// use for Admin Login 
document.getElementById("loginForm").onsubmit = (e) => {
  e.preventDefault();
  const user = document.getElementById("adminUsername").value.trim();
  const pass = document.getElementById("adminPassword").value.trim();

  if (user === "Rajkumardas" && pass === "01882569245") {
    document.getElementById("loginSection").classList.add("hidden");
    document.getElementById("dashboardSection").classList.remove("hidden");
    
    loadUsers();
    loadOrders();
    displayReviews(); 
  } else {
    alert("Try again! Wrong credentials.");
  }
};

// use for Users Function
function loadUsers() {
  const users = getUsers();
  const tbody = document.getElementById("userTableBody");

  if (!tbody) return; 

  if (!users.length) {
    tbody.innerHTML = `<tr><td colspan="4" class="p-4 text-center text-gray-500">No registered users found!</td></tr>`;
    return;
  }

  tbody.innerHTML = users.map((u, index) => `
    <tr class="border-b hover:bg-gray-50">
      <td class="p-3 font-semibold text-gray-800">#${u.id || (index + 1)}</td>
      <td class="p-3 font-medium text-gray-900">${u.name || 'N/A'}</td>
      <td class="p-3 text-gray-600">${u.email || 'N/A'}</td>
      <td class="p-3 text-gray-600">${u.phone || 'N/A'}</td>
    </tr>
  `).join("");
}

// use for Load Orders Function
function loadOrders() {
  const orders = getOrders();
  const tbody = document.getElementById("orderTableBody");

  if (!tbody) return;

  if (!orders.length) {
    tbody.innerHTML = `<tr><td colspan="7" class="p-4 text-center text-gray-500">No orders found!</td></tr>`;
    return;
  }

  tbody.innerHTML = orders.map((order, index) => `
    <tr class="border-b hover:bg-gray-50">
      <td class="p-3 font-semibold text-gray-800">${order.name || 'N/A'}</td>
      <td class="p-3 text-gray-600">${order.phone || 'N/A'}</td>
      <td class="p-3">${order.product || 'N/A'}</td>
      <td class="p-3">${order.qty || 1} pc</td>
      <td class="p-3 font-bold text-blue-600">৳ ${order.price || 0}</td>
      <td class="p-3">
        <span class="px-2.5 py-1 text-xs font-semibold rounded-full ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}">
          ${order.status || 'Pending'}
        </span>
      </td>
      <td class="p-3 text-center space-x-2">
        <button onclick="confirmDelivery(${index})" class="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-xs font-semibold transition-colors">Confirm</button>
        <button onclick="deleteOrder(${index})" class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs font-semibold transition-colors">Delete</button>
      </td>
    </tr>
  `).join("");
}

// Confirm Order 
function confirmDelivery(index) {
  const orders = getOrders();
  orders[index].status = "Delivered";
  saveOrders(orders);
}

// Delete Order
function deleteOrder(index) {
  if (confirm("Are you sure to delete this order?")) {
    const orders = getOrders();
    orders.splice(index, 1);
    saveOrders(orders);
  }
}

//use for Display Reviews Function
function displayReviews() {
  const reviews = JSON.parse(localStorage.getItem("allReviews")) || [];
  const reviewContainer = document.getElementById("adminReviewList");

  if (!reviewContainer) return;

  reviewContainer.innerHTML = "";

  if (reviews.length === 0) {
    reviewContainer.innerHTML = "<div class='bg-white p-4 rounded-lg shadow border text-gray-500 text-center'>Reviews not found yet</div>";
    return;
  }

  reviews.forEach((rev, index) => {
    const ratingNum = parseInt(rev.rating) || 5;
    const stars = "⭐".repeat(ratingNum);
    
    reviewContainer.innerHTML += `
      <div class="bg-white p-4 rounded-lg shadow border border-gray-200">
        <div class="flex justify-between items-center mb-1">
          <h4 class="font-bold text-gray-800 text-base">${rev.name || 'Anonymous'}</h4>
          <span class="text-xs text-gray-400">${rev.date || ''}</span>
        </div>
        <div class="text-sm mb-2 text-yellow-500">${stars} <span class="text-gray-600 text-xs">(${ratingNum}/5)</span></div>
        <p class="text-sm text-gray-700 bg-gray-50 p-2 rounded">${rev.comment || 'No comment provided.'}</p>
        <div class="mt-2 text-right">
          <button onclick="deleteReview(${index})" class="text-xs text-red-500 hover:underline">Delete Review</button>
        </div>
      </div>
    `;
  });
}

// use forDelete Single Review
function deleteReview(index) {
  if (confirm("do you want to remove review?")) {
    let reviews = JSON.parse(localStorage.getItem("allReviews")) || [];
    reviews.splice(index, 1);
    localStorage.setItem("allReviews", JSON.stringify(reviews));
    displayReviews();
  }
}

// use for Clear All Reviews
function clearAllReviews() {
  if (confirm("do you want to remove review?")) {
    localStorage.removeItem("allReviews");
    displayReviews();
  }
}

// use for Logout Admin
function logoutAdmin() {
  document.getElementById("dashboardSection").classList.add("hidden");
  document.getElementById("loginSection").classList.remove("hidden");
  document.getElementById("loginForm").reset();
}

// use for Page load listener
document.addEventListener("DOMContentLoaded", () => {
  displayReviews();
});