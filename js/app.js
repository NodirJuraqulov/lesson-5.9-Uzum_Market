
// Uzum -- Banner:
const mainImgEl = document.querySelector(".main_img img");

let img1 = "/assets/swiper-slide.png";
let img2 = "/assets/img3.avif";
let img3 = "/assets/img33.avif";
let img4 = "/assets/img4.avif";
let img5 = "/assets/img5.avif";

let arrImg = [img1, img2, img3, img4, img5];

let i = 0;

function mainImg() {
    mainImgEl.setAttribute("src", arrImg[i]);
}

function nextImg() {
    if (i < arrImg.length - 1) {
        i++;
        mainImg();
    }
}

function afterImg() {
    if (i > 0) {
        i--;
        mainImg();
    }
}


// Scroller:
document.querySelector(".scroller").addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
});


// Get API:
const BASE_URL = "https://dummyjson.com";
const itemsEl = document.querySelector(".cheap_items");

function renderProduct(data) {
    const fragment = document.createDocumentFragment();
    // console.log(data[0].images[0]);

    data.forEach(product => {
        let card = document.createElement("div");
        card.className = "cheap_item";
        card.dataset.id = product.id;
        card.innerHTML = `
            <img name="card-image" class="main_img" src=${product.images[0]} alt=${product.brand}>

            <div class="info">
                <h3>${product.brand}</h3>
                <h3 title=${product.title}>${product.title}</h3>
                <div class="star">
                    <img src="/assets/SVG (8).svg" alt="">
                    <span>${product.rating}</span>
                    <span>(8 sharh)</span>
                </div>
                <span class="monthly">299 880 so'm/oyiga</span>
                <div class="price">
                    <div class="left">
                        <p class="old_price">${product.price + 10} so'm</p>
                        <p class="new_price">${product.price} so'm</p>
                    </div>
                    <div class="cart">
                        <img src="/assets/div.slot.svg" alt="">
                    </div>
                </div>
            </div>

            <div class="aksiya">Aksiya</div>

            <div class="heart">
                <img src="/assets/SVG (9).svg" alt="">
            </div>
        `
        fragment.appendChild(card);
    });

    itemsEl.appendChild(fragment);
}

function fetchData(endpoint) {
    fetch(`${BASE_URL}${endpoint}`)
        .then((res) => {
            if(!res.ok){
                throw new Error("something went wrong :(");
            }
            return res.json();
        })
        .then((data) => {
            let products = data.products;
            renderProduct(products);
            // console.log(products);
        })
        .catch(err =>{
            console.log(err);
        })
        .finally(()=>{
            // skeletonEl.style.display = "none"
        })
}


window.addEventListener("load", ()=>{
    let params = new URLSearchParams(location.search);
    fetchData("/products");
    // renderSkeleton(20);
})


// See more:
itemsEl.addEventListener("click", (event) => {
    const name = event.target.name;
    if (name === "card-image") {
        console.log(event.target.parentElement.dataset.id);
        const id = event.target.closest(".cheap_item").dataset.id;

        open(`/pages/product.html?q=${id}`);
    }
})

// function fetchDetail(endpoint) {
//     fetch(`${BASE_URL}${endpoint}`)
//         .then((res) => {
//             if(!res.ok){
//                 throw new Error("something went wrong :(");
//             }
//             return res.json();
//         })
//         .then((data) => {
//             // let products = data.products;
//             // renderProduct(products);
//             // console.log(products);
//             console.log(data);
//         })
//         .catch(err =>{
//             console.log(err);
//         })
//         .finally(()=>{
//             // skeletonEl.style.display = "none"
//         })
// }









