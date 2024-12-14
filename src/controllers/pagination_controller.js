export default (searchEngine) => {
    searchEngine.nextBtn.addEventListener('click', (event) => {
        event.preventDefault();

        searchEngine.nextPage()
    });

    searchEngine.prevBtn.addEventListener('click', (event) => {
        event.preventDefault();

        searchEngine.prevPage()
    });
}