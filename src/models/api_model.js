import {calculateScore, debug} from "../lib";
import { Cache } from './index.js'
import axios from 'axios'

class Api {
    static URL = {
        base: 'https://europe-west3-gobelins-9079b.cloudfunctions.net',
        movies: '/api/v1/movies',
        categories: '/api/v1/categories'
    }

    constructor (config) {
        this.api = axios.create({
            baseURL: Api.URL.base
        });

        this.movies = []
        this.categories = []
    }

    async init(reset_cache = false) {
        const cache_movies = Cache.get('movies')
        const cache_categories = Cache.get('categories')

        if (cache_movies.date && cache_categories.date && !reset_cache) {
            this.movies = [...cache_movies.data]
            this.categories = [...cache_categories.data]
        } else {
            await Promise.all([this.updateMovies(), this.updateCategories()]) // launch at same time
        }

    }

    async updateMovies() {
        try {
            const response = await this.api.get(Api.URL.movies);
            debug('✅ Movies')
            this.movies = response.data;
            // this.saveLocalStorage('movies', this.movies)
            Cache.save('movies', this.movies)

        } catch (error) {
            debug(error)
        }


    }
    async updateCategories() {
        try {
            const response = await this.api.get(Api.URL.categories);
            debug('✅ Categories')
            this.categories = response.data;
            // this.saveLocalStorage('categories', this.movies)
            Cache.save('categories', this.categories)

        } catch (error) {
            debug(error)
        }


    }

    /**
     * @return {[{id: String, name: String, author: String, video: String, category: {id: string, name: String}, description: String, rating: Number, likes: Number,  dislikes: Number}] | []}
     * */
    get getMovies() {
        return this.movies.map(movie => {
            return {
                ...movie,
                category: this.getCategoryById(movie.category),
                rating: calculateScore(movie)
            }
        })
    }

    /**
     * @return {[{id: String, name: String}] | []}
     * */
    get getCategories() {
        return this.categories
    }

    /**
     * @return {{id: String, name: String} | {}}
     * */
    getCategoryById(id) {
        const category = this.getCategories.find(category => category.id === id)

        return category ? category : {}
    }

    /**
     * @return {{id: String, name: String, author: String, video: String, category: {id: string, name: String}, description: String,  likes: Number,  dislikes: Number} | null}
     * */
    getMovieById(id) {
        const movie = this.getMovies.find(movie => movie.id === id)

        return movie ? movie : null
    }

    // getMovieBySearch(search) {
    //     const format = (value) => value
    //             .normalize("NFD")
    //             .replace(/[\u0300-\u036f]/g, "")
    //             .replace(/[^a-zA-Z0-9\s]/g, "")
    //             .replace(/:/g, "")
    //             .replaceAll('  ', ' ')
    //             .toLowerCase()
    //             .trim()
    //     const filter = format(search)
    //
    //     return this.getMovies.filter(movie =>
    //             [movie.name, movie.description, movie.category.name, movie.author].some(value => format(value).indexOf(filter) > -1))
    // }

    static sortMoviesByRating(movies) {
        return movies.sort((a, b) => b.rating - a.rating)
    }

    filterMovies(filters) {
        return this.getMovies.filter(movie => filters.includes(movie.category.id))
    }

    async postNewMovie(movie) {
        const result = await this.api.post(Api.URL.movies, movie)

        init(true)
        return result
    }

    async likeMovie(movieId) {
        return await this.api.patch(`${Api.URL.movies}/${movieId}/like`)
    }

    async dislikeMovie(movieId) {
        return await this.api.patch(`${Api.URL.movies}/${movieId}/dislike`)
    }
}

const api = new Api()
await api.init()

debug(api.getMovies)
debug(api.getCategories)
// debug(await api.likeMovie('jBNOX18Gx5lYveIdICvx'))

// api.postNewMovie({
//     name: "Dune",
//     author: "Denis Villeneuve",
//     img: "https://fr.web.img5.acsta.net/c_310_420/pictures/21/08/10/12/20/4633954.jpg",
//     category: "mXpK90nl0fkY38dX2XIT",
//     description: "L'histoire de Paul Atreides, jeune homme aussi doué que brillant",
//     video: "https://www.youtube.com/embed/gHt8tCHbB2M?si=W7IPRKCn1FOGxtrJ"
// })



export { api }