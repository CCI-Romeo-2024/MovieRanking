import renderOptionFilter from '../../renders/category_option.js'

const renderCategories = (categories) => {
    const selectElement = document.querySelector("#filter-select");

    categories.forEach((category) => {
        selectElement.innerHTML += renderOptionFilter(category)
    })
}

export { renderCategories }