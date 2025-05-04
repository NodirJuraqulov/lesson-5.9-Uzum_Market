
// Uzum -- Banner:
const mainImgEl = document.querySelector(".main_img");
const afterEl = document.querySelector(".after");
const nextEl = document.querySelector(".next");

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
nextEl.addEventListener(("click"), () => {
    nextImg();
})

function afterImg() {
    if (i > 0) {
        i--;
        mainImg();
    }
}
afterEl.addEventListener(("click"), () => {
    afterImg();
})



// Scroller:
document.querySelector(".scroller").addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
});



// Get API:
import { fetchData } from "./main.js";

const itemsEl = document.querySelector(".cheap_items");
const skeletonEl = document.querySelector(".skeleton");
const seeMoreEl = document.querySelector(".btn_more");
const wrapperBtnEl = document.querySelector(".wrapper_btn");
const collectionEl = document.querySelector(".collection");
const bannerEl = document.querySelector(".banner");

function renderProduct(data) {
    const fragment = document.createDocumentFragment(); 
    data.products.forEach((product) => {  
        let card = document.createElement("div");
        card.className = "cheap_item";
        card.dataset.id = product.id;
        card.innerHTML = `
            <img name="card-image" class="main_img" src=${product.images[0]} alt=${product.brand}>

            <div class="info">
                <h3>${product.title}</h3>
                <h3 title=${product.brand}>${product.brand}</h3>
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


function renderSkeleton(count) {
    const fragment = document.createDocumentFragment();
    Array(count).fill("").forEach(() => {
        let skeletonItem = document.createElement("div");
        skeletonItem.className = "skeleton_item";
        skeletonItem.innerHTML = `
            <div class="skeleton_img skeleton_animation"></div>
            <div class="skeleton_info skeleton_animation"></div>
        `
        fragment.appendChild(skeletonItem);
    })
    skeletonEl.appendChild(fragment);
}
function hideSkeleton(){
    skeletonEl.style.display = "none"
}
function showSkeleton(){
    skeletonEl.style.display = "grid"
}


function renderProductList(data) {
    const fragment = document.createDocumentFragment();
    data.forEach((elem) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <a href="#">${elem}</a>
        `
        fragment.appendChild(li);
    })
    collectionEl.appendChild(fragment);
}


// 10 tadan chiqishi:
const perPage = 10;


window.onload = () => {
    fetchData(`/products?limit=${perPage}&skip=0`, renderProduct, hideSkeleton);
    fetchData(`/products/category-list`, renderProductList, () => {});
    renderSkeleton(perPage);

    // fetchData(`/products?limit=${perPage}&skip=0`, amount);
}


// Category:
// let saveBtn = wrapperBtnEl.innerHTML;
collectionEl.addEventListener("click", (event) => {
    let linkName = event.target.tagName;
    itemsEl.innerHTML = null;
    if (linkName === "A") {
        let category = event.target.innerHTML;
        console.log(category);
        wrapperBtnEl.innerHTML = null;
        bannerEl.innerHTML = null;
        bannerEl.style.height = 0;
        fetchData(`/products/category/${category}`, renderProduct, hideSkeleton);

        // if (category === "All") {
        //     wrapperBtnEl.innerHTML = saveBtn;
        //     fetchData(`/products?limit=${perPage}&skip=0`, renderProduct); 
        // } else {
        //     wrapperBtnEl.innerHTML = null;
        //     // bannerEl.innerHTML = null;
        //     // bannerEl.style.height = 0;
        //     fetchData(`/products/category/${category}`, renderProduct);
        // }
    }
})


// showDetail
itemsEl.addEventListener("click", (event) => {
    let name  = event.target.name;
    if (name === "card-image") {
        const id = event.target.closest(".cheap_item").dataset.id;
        open(`/pages/product.html?q=${id}`, "_self");     
    }  
})


// showMore:
let offset = 0;
seeMoreEl.addEventListener("click", () => {
    showSkeleton();
    if (offset < 19) {     
        offset++;
        fetchData(`/products?limit=${perPage}&skip=${perPage * offset}`, renderProduct, hideSkeleton);
        if (offset === 19) {
            seeMoreEl.style.display = "none";
        }
    }
})
// function amount(data) {
//     let amount = Math.floor(data.total / 10); 
//     let offset = 0;
//     seeMoreEl.addEventListener("click", () => {
//         if (offset < amount) {     
//             offset++;
//             fetchData(`/products?limit=${perPage}&skip=${perPage * offset}`, renderProduct);
//             if (offset === amount) {
//                 seeMoreEl.style.display = "none";
//             }
//         }
//     })
// }



















