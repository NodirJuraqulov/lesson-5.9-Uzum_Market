
import { fetchData } from "./main.js";

const box = document.querySelector(".see_more");
const detailSkeletonEl = document.querySelector(".detail_skeleton");
let params = new URLSearchParams(location.search);

function renderDetail(data) {
    box.innerHTML = `
        <div class="detail_page">
            <div class="detail">
                <div class="product_img">
                    <img src=${data.images[0]} alt="">
                </div>  

                <div class="product_about">
                    <h2>${data.title}</h2>
                    <p>${data.description}</p>
                    <div class="brand">
                        <p>category: <span>${data.category}</span></p>
                        <p>brand: <span>${data.brand}</span></p>
                    </div>  
                    <div class="price">
                        <p>rating: <span>${data.rating}</span></p>
                        <p>price: <span>${data.price}</span></p>
                    </div>
                </div>
            </div   

            <div class="reviews">
                <div class="pp">
                    <div class="review">
                        <p>rating: <span>${data.reviews[0].rating}</span></p>
                        <p>${data.reviews[0].comment}</p>
                        <p>${data.reviews[0].reviewerName}</p>
                        <p>${data.reviews[0].reviewerEmail}</p>
                        <p>${data.reviews[0].date}</p>
                    </div>
                    <div class="review">
                        <p>rating: <span>${data.reviews[0].rating}</span></p>
                        <p>${data.reviews[1].comment}</p>
                        <p>${data.reviews[1].reviewerName}</p>
                        <p>${data.reviews[1].reviewerEmail}</p>
                        <p>${data.reviews[1].date}</p>
                    </div>
                    <div class="review">
                        <p>rating: <span>${data.reviews[0].rating}</span></p>
                        <p>${data.reviews[2].comment}</p>
                        <p>${data.reviews[2].reviewerName}</p>
                        <p>${data.reviews[2].reviewerEmail}</p>
                        <p>${data.reviews[2].date}</p>
                    </div>
                </div>
            </div>
        </div>  

    `
}

function renderDetailSkeleton(count) {
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
    detailSkeletonEl.appendChild(fragment);
}
function hideSkeleton(){
    detailSkeletonEl.style.display = "none"
}
function showSkeleton(){
    detailSkeletonEl.style.display = "grid"
}

window.onload = () => {
    const id = params.get("q");
    fetchData(`/products/${id}`, renderDetail, hideSkeleton)
}

















