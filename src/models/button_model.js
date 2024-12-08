class Button {
    constructor(id, icons, status = false, callbackEvent, data) {
        this.id = id
        this.element = document.getElementById(id)
        this.status = status
        this.icons = icons
        this.data = data

        if (this.status)
            this.setActive()
        else
            this.setDisable()

        callbackEvent(null, this)

        this.element.addEventListener('click', (e) => {
            if (callbackEvent(e, this)) return

            if (this.status)
                this.setDisable()
            else
                this.setActive()
        })
    }

    setActive() {
        this.status = true
        this.element.querySelector('img').src = this.icons.fill
    }

    setDisable() {
        this.status = false
        this.element.querySelector('img').src = this.icons.base
    }
}

export default Button