import {searchEngine} from "../pages/home/main.js";


const searchInput = document.querySelector('#search-input')


searchInput.addEventListener('input', (event) => {
    event.preventDefault();

    searchEngine.setSearchInput(event.target.value);
})