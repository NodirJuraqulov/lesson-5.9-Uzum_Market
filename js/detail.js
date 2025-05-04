
import { fetchData } from "./main.js";

const box = document.querySelector(".see_more");
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

window.onload = () => {
    const id = params.get("q");
    fetchData(`/products/${id}`, renderDetail, () => {})
}

















