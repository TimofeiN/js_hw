'use strict';

const productItems = document.querySelectorAll('.featuredItem');
let n = 1;
productItems.forEach(el => {
    el.dataset.id = n++;
});

let busketCountEL = document.querySelector('.cartIconWrap>span');
let totalCount = 0;

class ProductInBasket {
    constructor(id, name, price) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.count = 1;
        this.totalCount = this.price * this.count;
    }

    oneMoreItem() {
        this.count += 1;
        this.totalCount = this.price * this.count;
        document.querySelector(`.basketRow[id="${this.id}"]>.cartCount`)
            .innerHTML = this.count;
        document.querySelector(`.basketRow[id="${this.id}"]>.cartPerUnit`)
            .innerHTML = `$${this.totalCount}`;
    }

    ProductMarkup() {
        return `
        <div class='cartName'>${this.name}</div>
        <div class='cartCount'>${this.count}</div>
        <div class='cartPrice'>$${this.price}</div>
        <div class='cartPerUnit'>$${this.totalCount}</div>
        `;
    }
}

const basketObj = {};
const orderPriceEl = document.querySelector('.basketTotalValue');
const inBasket = document.querySelector('.productsInBasket');

productItems.forEach(el => {

    el.addEventListener('click', (event) => {
        if (!(event.target.tagName === 'BUTTON')) {
            return;
        }

        const productId = el.dataset.id;
        const productName = el.querySelector('.featuredName').innerText;
        const productPrice = Number(el.querySelector('.featuredPrice').
            innerText.slice(1,));

        if (!(productId in basketObj)) {
            const selectedProduct =
                new ProductInBasket(productId, productName, productPrice);
            basketObj[productId] = selectedProduct;

            const newBasketEl = document.createElement('div');
            newBasketEl.className = 'basketRow';
            newBasketEl.id = productId;
            newBasketEl.innerHTML = selectedProduct.ProductMarkup();

            inBasket.append(newBasketEl);
        }
        else { basketObj[productId].oneMoreItem(); }

        let orderPrice = 0;
        for (let key in basketObj) {
            orderPrice += basketObj[key].totalCount;
        }
        orderPriceEl.innerHTML = `$${orderPrice}`;

        totalCount += 1;
        busketCountEL.innerHTML = totalCount;
    });

});


const basketImage = document.querySelector('.cartIconWrap');
let basketEl = document.querySelector('.basket');
basketImage.addEventListener('click', () => {
    if (totalCount > 0) {
        basketEl.classList.toggle('hidden');
    }
});