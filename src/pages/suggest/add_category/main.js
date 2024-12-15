import Form from '@controllers/form_controller.js'
import '@controllers/menu_controller.js';
import { Api } from '@models/index.js'

const form = new Form('form.form', async (e, data) => {
    const category = {
        name: data.get('name')
    }

    const res = await Api.createCategory(category)

    console.log(res.data)

    if (res.data)
        window.location.href = `../index.html?f=${res.data.id}`
})