export default (searchEngine) => {

    const filterSelect = document.querySelector('#filter-select')


    filterSelect.addEventListener('change', (event) => {
        searchEngine.setCategory(event.target.value)

        event.target.value = '' // cancel event
    })


    document.addEventListener('click', (event) => {
        if (!event.target.classList.contains('filter')) return;

        searchEngine.removeCategory()
    })


    const sortSelect = document.querySelector('#sort-select')


    sortSelect.addEventListener('change', (event) => {
        searchEngine.changeSort(event.target.value)

    })
}