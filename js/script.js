let grandTotal = 244200000000;
let spent = 0;
const productList = document.querySelector(".shop");

window.onload = function() {
    //Add one to the product
    productList.addEventListener("click", function(e) {
        if(e.target !== e.currentTarget) {
            let clickedItem = e.target.id;

            if(clickedItem.includes("btnAdd")) {
                let btnId = clickedItem.slice(6);
                let totalId = "total" + btnId;
                let priceId = "price" + btnId;

                let a = parseInt(document.getElementById(totalId).innerHTML);
                let price = document.getElementById(priceId).innerHTML;
                let intPrice = parseInt(price.slice(1));
                a += 1;

                document.getElementById(totalId).innerHTML = a;

                spent += intPrice;
                calcTotal(spent);
                //valueCheck(btnId);

            } else if(clickedItem.includes("btnRemove")){
                let btnId = clickedItem.slice(9);
                let totalId = "total" + btnId;
                let priceId = "price" + btnId;

                let a = parseInt(document.getElementById(totalId).innerHTML);
                let price = document.getElementById(priceId).innerHTML;
                let intPrice = parseInt(price.slice(1));

                if(a > 0) {
                    a -= 1;
                    document.getElementById(totalId).innerHTML = a;
                    spent -= intPrice;
                    calcTotal(spent);
                }
                //valueCheck(btnId);
            }
        }

        e.stopPropagation();
    });

    function calcTotal(totalSpent) {
        let percent = ((totalSpent/grandTotal)*100).toFixed(6);
        document.querySelector(".totalSpent").innerHTML ="You spent total of <span style='font-weight: 700'> $"+totalSpent+". </span> <br><br> Thats is <span style='font-weight: 700'>"+percent+"% </span> of Elons Musk's total wealth.";
    }

    //disable remove button if product is less than 0
    function valueCheck(totalId) {
        let total = parseInt(document.getElementById("total"+totalId).innerHTML);
        if(total < 1) {
            document.getElementById("btnRemove"+totalId).disabled = true;
        } else {
            document.getElementById("btnRemove"+totalId).disabled = false;
        }
    }

    //valueCheck();
}


class UI {
    displayProducts(products) {
        let result = '';
        products.forEach(product => {
            result += `
            <div class="item">
                <img src="${product.image}" alt="">
                <span class="product-name">${product.name}</span>
                <span class="product-price" id="price${product.id}">$${product.price}</span>
                <div class="add-to-cart">
                    <button class="btnRemove" id="btnRemove${product.id}" product-id="${product.id}">-1</button>
                    <h1 class="total" id="total${product.id}">0</h1>
                    <button class="btnAdd" id="btnAdd${product.id}" product-id="${product.id}">+1</button>
                </div>
            </div>
            `;
        });

        productList.innerHTML = result;
    }
}

class Products {
    async getProducts() {
        try {
            let result = await fetch("./js/data.json");
            let products = await result.json();
            products = products.map(item => {
                const {name, price, id, image} = item;
                return {id, name, price, image};
            })

            return products;
        } catch(e) {
            console.log(e);
        }
    }
}

const products = new Products();
const ui = new UI();

products.getProducts().then(products => ui.displayProducts(products));