class Cache_model {
    /**
     * @param {String} key
     * @param {[Object]} value
     * */
    static save(key, value) {
        sessionStorage.setItem(key, JSON.stringify(value))
        sessionStorage.setItem(this.getKeyTime(key), Date.now().toString())
    }

    /**
     * @param {String} key
     * */
    static destroy(key) {
        sessionStorage.removeItem(key)
        sessionStorage.removeItem(this.getKeyTime(key))
    }

    /**
     * @param {String} key
     * @return {{data: Object[], date: Number}}
     * */
    static get(key) {
        const data = JSON.parse(sessionStorage.getItem(key))
        const date = sessionStorage.getItem(this.getKeyTime(key))
        return Array.isArray(data) ? {data, date: parseInt(date)} : {data: [], date: null}
    }

    static getKeyTime(key) {
        return `${key}-time`
    }
}

export default Cache_model