export default (searchEngine) => {
    const searchInput = document.querySelector('#search-input')


    searchInput.addEventListener('input', (event) => {
        event.preventDefault();

        searchEngine.setSearch(event.target.value);
    })
}