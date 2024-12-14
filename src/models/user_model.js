import {debug, haveSameStructure} from '../lib/index.js';
import { Api } from "./index.js";

class User {
    static KEY = 'user'
    static STRUCTURE_USER = {
        username: '',
        movies: {}
    }

    static STRUCTURE_MOVIE = {
        like: false,
        dislike: false,
        save: false
    }

    /**
     * @return {{username: String, movies: {[{like: Boolean, dislike: Boolean, save: Boolean}]}}}
     * */
    static get() {
        const data = JSON.parse(localStorage.getItem(this.KEY))

        return data ? data : this.STRUCTURE_USER
    }

    /**
     * @return {{like: Boolean, dislike: Boolean, save: Boolean}}
     * */
    static getMovie(id) {
        const movie = this.get().movies[id]

        return movie ? movie : this.STRUCTURE_MOVIE
    }

    /**
     * @return {{like: Boolean, dislike: Boolean, save: Boolean}}
     * */
    static setMovie(id, newValues) {
        const user = this.get()
        const movie ={...this.getMovie(id), ...newValues}

        user.movies[id] = {...movie}

        localStorage.setItem(this.KEY, JSON.stringify(user))
        return movie
    }

    static likeMovie(id) {
        const movie = this.getMovie(id)

        if (movie.like || movie.dislike) return movie

        Api.likeMovie(id);

        return this.setMovie(id, { like: true })
    }

    static dislikeMovie(id) {
        const movie = this.getMovie(id)

        if (movie.like || movie.dislike) return movie

        Api.dislikeMovie(id);

        return this.setMovie(id, { dislike: true })
    }

    static saveMovie(id) {
        const movie = this.getMovie(id)
        const newMovie = this.setMovie(id, { save: !movie.save })

        return {...newMovie}
    }

}

export default User