class Form {
    constructor(querySelector, callback) {
        this.form = document.querySelector(querySelector);

        this.form.addEventListener('submit', async (e) => {
            e.preventDefault();
            await callback(e, new FormData(e.target));
        })
    }
}

export default Form