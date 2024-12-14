const input = (form, name, value) => {
    form.querySelector(`input[name="${name}"]`).value = value
}

const select = (form, name, value) => {
    form.querySelector(`select[name="${name}"]`).value = value
}

export default {input, select}