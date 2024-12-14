import {Api, Engine} from '../../../models/index.js'
import { renderCategories } from '../../../renders/category_option.js'
import Form from '../../../controllers/form_controller.js'
import { Youtube } from '../../../lib/index.js'

const categories = Api.getCategories
renderCategories(categories.sort(Engine.ESort.azName), '#category-select')

const form = new Form('form.form', async (e, data) => {
    const movie = {
        name: data.get('name'),
        description: data.get('description'),
        category: data.get('category'),
        author: data.get('author'),
        img: data.get('img'),
        video: Youtube(data.get('video')),
    }

    const res = await Api.createMovie(movie)

    console.log(res.data)

    if (res.data)
        window.location.href = `../movie.html?id=${res.data.id}`
})