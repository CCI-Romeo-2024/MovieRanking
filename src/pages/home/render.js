import { api } from "../../models/api_model.js";
const moviesCardsElements = document.querySelector("#app-movies > .movies-cards");

const movieCardHTML = (movie, index) => {
    return `<div class="movie-card" data-movie-id="${movie.id}" style="order: ${index+1}">
                <a href="./movie.html?id=${movie.id}">
                    <img src="${movie.img}" alt="">
                    <div class="movie-info">
                        <div class="movie-text">
                            <div class="movie-title">${movie.name}</div>
                            <div class="movie-author">${movie.author}</div>
                        </div>
                        <div class="movie-tags">
                            <div class="category tag">${movie.category.name}</div>
                            <div class="rate tag"><span class="tag-star">&#11088;</span>${(movie.rating)}/10</div>
                        </div>
                    </div>
                    <div class="movie-saved"></div>
                </a>
            </div>`
}

api.getMovies.forEach((movie) => {
    moviesCardsElements.innerHTML += movieCardHTML(movie)
})