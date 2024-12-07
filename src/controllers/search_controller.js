import { Api } from "../models/index.js";

const searchInput = document.querySelector('#search-input')
const moviesCardsElements = document.querySelectorAll('.movies-cards > .movie-card')

searchInput.addEventListener('input', (event) => {
    event.preventDefault();

    // if (!event.target.value.length > 0) return
    const movies = Api.getMovieBySearch(event.target.value)
    moviesCardsElements.forEach((element, index) => {
        const elementID = element.attributes.getNamedItem('data-movie-id').value
        const movie = movies.find((movie) => movie.id === elementID)
        element.style.display = movie ? 'revert' : 'none'

        // if (movie)
        //     element.style.display = 'none'
        // else
        //     element.style.display = 'revert'

    })

    // document.querySelector(`.movie-card[data-movie-id="${movie.id}"]`)


})

const movieSearchRender = (movie) => {
    return `<div class="movie">
                <a href="movie.html?id=${movie.id}">
                    <img src="${movie.img}" alt="">
                    <div class="info">
                        <h5>${movie.name}</h5>
                        <p>${movie.description}</p>
                    </div>
                </a>
            </div>`
}