const render = (category) =>
        `<option value="${category.id}">${category.name}</option>`


const renderCategories = (categories, querySelector) => {
    const selectElement = document.querySelector(querySelector);

    categories.forEach((category) => {
        selectElement.innerHTML += render(category)
    })
}

export {render , renderCategories}