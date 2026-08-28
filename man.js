let currentProduct = '';
let currentUnitPrice = 0;


function openOrderModal(pName, price, category) {
  currentProduct = pName;
  currentUnitPrice = price;
  
  document.getElementById('modalProductName').innerText = `${pName} (Unit Price: ৳${price})`;
  document.getElementById('custQty').value = 1;

  const sizeSelect = document.getElementById('custSize');
  sizeSelect.innerHTML = '';

  if (category === 'pant') {

    const sizes = ['28', '30', '32', '34', '36'];
    sizes.forEach(s => sizeSelect.innerHTML += `<option value="${s}">${s}</option>`);
  } else if (category === 'shoe') {
   
    const sizes = ['39', '40', '41', '42', '43', '44'];
    sizes.forEach(s => sizeSelect.innerHTML += `<option value="${s}">${s}</option>`);
  } else {
  
    const sizes = ['S', 'M', 'L', 'XL', 'XXL'];
    sizes.forEach(s => sizeSelect.innerHTML += `<option value="${s}">${s}</option>`);
  }

  updateTotalPrice();
  
  const modal = document.getElementById('orderModal');
  modal.classList.remove('hidden');
  modal.classList.add('flex');
}


function updateTotalPrice() {
  const qtyInput = document.getElementById('custQty').value;
  const qty = parseInt(qtyInput) || 1;
  const total = qty * currentUnitPrice;
  
  document.getElementById('totalPriceText').innerText = `৳ ${total}`;
}


function closeOrderModal() {
  const modal = document.getElementById('orderModal');
  modal.classList.add('hidden');
  modal.classList.remove('flex');
}


function submitOrder(e) {
  e.preventDefault();
  
  const name = document.getElementById('custName').value;
  const phone = document.getElementById('custPhone').value;
  const size = document.getElementById('custSize').value;
  const qty = parseInt(document.getElementById('custQty').value) || 1;
  const totalPrice = qty * currentUnitPrice;

  let orders = JSON.parse(localStorage.getItem('allOrders')) || [];

  const newOrder = {
    id: "ORD-" + Date.now(),
    name: name,
    phone: phone,
    product: currentProduct,
    size: size,
    qty: qty,
    price: totalPrice,
    date: new Date().toLocaleDateString('bn-BD')
  };

  orders.unshift(newOrder);
  localStorage.setItem('allOrders', JSON.stringify(orders));

  alert(`Congratulation .you order is successfully submited\n\n product: ${currentProduct}\nsize: ${size}\nAmount: ${qty}\nTotal price: ৳${totalPrice}`);
  
  closeOrderModal();
  document.getElementById('custName').value = '';
  document.getElementById('custPhone').value = '';
}