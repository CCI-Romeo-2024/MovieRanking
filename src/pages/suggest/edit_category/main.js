import { renderCategories } from '@renders/category_option.js';
import Form from '@controllers/form_controller.js'
import { updateValueForm } from '@lib/index.js';
import {Api, Engine} from '@models/index.js'
import '@controllers/menu_controller.js';


const movieSelect = document.getElementById('category-select')
const deleteBtn = document.querySelector('button.delete')
const submitBtn = document.querySelector('button.submit')


renderCategories(Api.getCategories.sort(Engine.ESort.azName), '#category-select')


// Form Submit Event
const form = new Form('form.form', async (e, data) => {
    const category = {
        name: data.get('name')
    }

    submitBtn.classList.add('progress')

    const res = await Api.updateCategory(data.get('category'), category)

    submitBtn.classList.remove('progress')

    if (res.data)
        window.location.href = `../index.html?f=${res.data.id}`
})


// Set category value and disable delete button if movie is associated with movie
movieSelect.addEventListener('change', e => {
    const moviesWithThisCategory = Api.getMovies.filter((movie) => movie.category.id === e.target.value)

    deleteBtn.disabled = !!moviesWithThisCategory.length;

    updateValueForm.input(form.form, 'name', Api.getCategoryById(e.target.value).name)
})


// Delete selected category is not associated with movie
deleteBtn.addEventListener('click', async (e) => {
    const moviesWithThisCategory = Api.getMovies.filter((movie) => movie.category.id === e.target.value)
    if (moviesWithThisCategory.length) return

    deleteBtn.classList.add('progress')

    const res = await Api.deleteCategory(movieSelect.value)

    deleteBtn.classList.remove('progress')

    window.location.href = `../index.html`
})