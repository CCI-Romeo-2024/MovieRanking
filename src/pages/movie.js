import { Api, User } from '../models/index.js'

const searchParams = new URLSearchParams(window.location.search)

if (!searchParams.get('id')) history.back()

const movie = Api.getMovieById(searchParams.get('id'))

if (!movie) history.back()

document.title = `Film - ${movie.name} - ${movie.author}`

const movieElement = document.getElementById('movie')
movieElement.innerHTML = `
            <h2 class="name">${movie.name}</h2>
            <p class="description">${movie.description}</p>
            <a class="category-id" href="category.html?id=${movie.category.id}">#<span class="category-name">${movie.category.name}</span></a>
            <p>Likes: <span class="likes">${movie.likes}</span><button id="like">Like</button></p>
            <p>Dislikes: <span class="dislikes">${movie.dislikes}</span><button id="dislike">Dislike</button></p>`

document.querySelector('#like').addEventListener('click', (e) => {
    e.preventDefault()


})


function getLikeHTML(value) {
    return ``
}