// - - - - - - Example of item Object - - - - - -

// let item = {
    //     itemImage : "./images/1.jpg",
    //     rating:{
        //         stars:4.5,
        //         numberOfReviews:1400
        //     },
        //     companyName: "Carloton London",
        //     itemName: "Rhodium-Plated CZ Floral",
        //     currentPrice: 406,
        //     originalPrice:1045,
        //     discountPercentage:42,
        // };
        
// - - - - - - - - - - - - - - - - - - - - - - - -
let bagItems;
onLoad();

function onLoad() {
    let bagItemsString = localStorage.getItem("bagItems");
    bagItems = bagItemsString ? JSON.parse(bagItemsString) : [];    
    displayBagCount();
    displayItemsOnHomePage();
}

function addToBag(itemId){
    // TODO  - add loop to check for items already in bag
    bagItems.push(itemId);
    localStorage.setItem("bagItems", JSON.stringify(bagItems));
    displayBagCount();
}

function displayBagCount() {
    let bagItemCountElement = document.querySelector(".bag-item-count");
    if(bagItems.length > 0){
        bagItemCountElement.style.visibility = 'visible';
        bagItemCountElement.innerText = bagItems.length;
    }else{
        bagItemCountElement.style.visibility = 'hidden';
    }
}

function displayItemsOnHomePage() {
    let itemsContainerElement = document.querySelector(".items-container");

    if(!itemsContainerElement) return;
    let inner_html = '';
    items.forEach(item => {
        inner_html += `
            <div class="itemContainer">
                <img class="item-image" src="${item.image}" alt="item image">
                <div class="rating">${item.rating.stars}⭐ | ${item.rating.count}</div>
                <div class="company-name">${item.company}</div>
                <div class="item-name">${item.item_name}</div>
                <div class="price">
                    <span class="current-price">"Rs ${item.current_price}"</span>
                    <span class="original-price">"Rs ${item.original_price}"</span>
                    <span class="discount">"${item.discount_percentage}% Off"</span>
                </div>
                <button class="btn-add-bag" onclick="addToBag(${item.id})">Add to Bag</button>
            </div>`;
    });
    itemsContainerElement.innerHTML = inner_html;
}

