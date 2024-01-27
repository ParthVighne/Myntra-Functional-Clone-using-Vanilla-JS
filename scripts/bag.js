let bagItemObjects;
onload();

function onload() {
    loadBagItemObjects();
    displayBagItems();
    displayBagSummary();
}

function loadBagItemObjects() {
    console.log(bagItems);
    bagItemObjects = bagItems.map(ItemId =>{
        for(let i = 0; i<items.length; i++){
            if(ItemId == items[i].id) return items[i];
        }
    });
    console.log(bagItemObjects);
}

function displayBagSummary() {
    let bagSummaryElement = document.querySelector(".bag-summary");
    let totalItems = bagItemObjects.length;
    let totalMRP = 0;
    let totalDiscount = 0;
    let finalPayment = 0;

    bagItemObjects.forEach(bagItem => {
        totalMRP += bagItem.original_price;
        totalDiscount += bagItem.original_price - bagItem.current_price;
        finalPayment = totalMRP + totalDiscount + 99 // convenience fees;
    });

    bagSummaryElement.innerHTML = 
    `<div class="bag-details-container">
        <div class="price-header">PRICE DETAILS (${totalItems} Items) </div>
        <div class="price-item">
            <span class="price-item-tag">Total MRP</span>
            <span class="price-item-value">₹ ${totalMRP}</span>
        </div>
        <div class="price-item">
            <span class="price-item-tag">Discount on MRP</span>
            <span class="price-item-value priceDetail-base-discount">-${totalDiscount}</span>
        </div>
        <div class="price-item">
            <span class="price-item-tag">Convenience Fee</span>
            <span class="price-item-value">₹ 99</span>
        </div>
        <hr>
        <div class="price-footer">
            <span class="price-item-tag">Total Amount</span>
            <span class="price-item-value">₹${finalPayment}</span>
        </div>
    </div>
        <button class="btn-place-order">
          <div class="css-xjhrni">PLACE ORDER</div>
        </button>`;
}

function displayBagItems() {
    let containerElement = document.querySelector(".bag-items-container");
    let innerHTML = "";
    bagItemObjects.forEach(bagItem => {
        innerHTML += generateItemHTML(bagItem);
    });
    containerElement.innerHTML = innerHTML;
     
}

function removeItemFromBag(id) {
    bagItems = bagItems.filter(bagItemId => bagItemId !== id);
    localStorage.setItem("bagItems", JSON.stringify(bagItems));
    loadBagItemObjects();
    displayBagItems();
    displayBagCount();
    displayBagSummary();
}

function generateItemHTML(item) {
    return `<div class="bag-item-container">
          <div class="item-left-part">
            <img class="bag-item-img" src="../${item.image}">
          </div>
          <div class="item-right-part">
            <div class="company">${item.company}</div>
            <div class="item-name">${item.item_name}</div>
            <div class="price-container">
              <span class="current-price">"₹ ${item.current_price}"</span>
              <span class="original-price">"₹ ${item.original_price}"</span>
              <span class="discount-percentage">"(${item.discount_percentage}% Off)"</span>
            </div>
            <div class="return-period">
              <span class="return-period-days">"${item.return_period} Days"</span> return available
            </div>
            <div class="delivery-details">
              Delivery by
              <span class="delivery-details-days">${item.delivery_date}</span>
            </div>
          </div>

          <div class="remove-from-cart" onclick="removeItemFromBag(${item.id})">X</div>
        </div>
    `;
}