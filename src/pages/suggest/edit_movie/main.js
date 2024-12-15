import { renderCategories } from '@renders/category_option.js'
import {updateValueForm, Youtube} from '@lib/index.js'
import Form from '@controllers/form_controller.js'
import {Api, Engine} from '@models/index.js'
import '@controllers/menu_controller.js';

renderCategories(Api.getMovies.sort(Engine.ESort.azName), '#movie-select')
renderCategories(Api.getCategories.sort(Engine.ESort.azName), '#category-select')



const movieSelect = document.getElementById('movie-select')
const deleteMovieBtn = document.querySelector('button.submit')
const submitBtn = document.querySelector('button.submit')



const form = new Form('form.form', async (e, data) => {
    const movie = {
        name: data.get('name'),
        description: data.get('description'),
        category: data.get('category'),
        author: data.get('author'),
        img: data.get('img'),
        video: Youtube(data.get('video')),
    }

    submitBtn.classList.add('progress')

    const res = await Api.updateMovie(data.get('movie'), movie)

    submitBtn.classList.remove('progress')

    console.log(res.data)

    if (res.data)
        window.location.href = `../movie.html?id=${res.data.id}`
})


movieSelect.addEventListener('change', e => {
    deleteMovieBtn.disabled = false

    const movie = Api.getMovieById(movieSelect.value)

    updateValueForm.input(form.form, 'name', movie.name)
    updateValueForm.input(form.form, 'description', movie.description)
    updateValueForm.select(form.form, 'category', movie.category.id)
    updateValueForm.input(form.form, 'author', movie.author)
    updateValueForm.input(form.form, 'img', movie.img)
    updateValueForm.input(form.form, 'video', movie.video)
})


deleteMovieBtn.addEventListener('click', async (e) => {
    const formValues = new FormData(form.form)
    if (!formValues.get('movie')) return

    deleteMovieBtn.classList.add('progress')

    const res = await Api.deleteMovie(formValues.get('movie'))

    deleteMovieBtn.classList.remove('progress')

    window.location.href = `../index.html`
})

