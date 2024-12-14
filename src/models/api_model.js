import { calculateScore, debug } from "../lib";
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

    async init() {
        const cache_movies = Cache.get('movies')
        const cache_categories = Cache.get('categories')

        const promise = []

        if (cache_movies.date)
            this.movies = [...cache_movies.data]
        else
            promise.push(this.updateMovies())

        if (cache_categories.date)
            this.categories = [...cache_categories.data]
        else
            promise.push(this.updateCategories())

        if (promise.length)
            await Promise.all(promise)
    }

    clearAllCache() {
        Cache.destroy('movies')
        Cache.destroy('categories')
    }

    clearMoviesCache() {
        Cache.destroy('movies')
    }

    clearCategoriesCache() {
        Cache.destroy('categories')
    }

    async updateMovies() {
        try {
            const response = await this.api.get(Api.URL.movies);
            debug('✅ Movies')
            this.movies = response.data;

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

            Cache.save('categories', this.categories)

        } catch (error) {
            debug(error)
        }
    }

    /**
     * @return {[{id: String, name: String, author: String, video: String, category: {id: String, name: String}, description: String, rating: Number, likes: Number,  dislikes: Number}] | []}
     * */
    get getMovies() {
        return this.movies.map(movie => ({
            ...movie,
            category: this.getCategoryById(movie.category),
            rating: calculateScore(movie)
        }))
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
     * @return {{id: String, name: String, author: String, video: String, category: {id: String, name: String}, description: String,  likes: Number,  dislikes: Number} | null}
     * */
    getMovieById(id) {
        const movie = this.getMovies.find(movie => movie.id === id)

        return movie ? movie : null
    }

    /**
     * @param {{name: String, author: String, img: String, category: String, description: String, video: String}} movie
     * */
    async createMovie(movie) {
        const result = await this.api.post(Api.URL.movies, movie)

        this.clearMoviesCache()
        return result
    }

    /**
     * @param {String} id
     * @param {{name: String, author: String, img: String, category: String, description: String, video: String}} movie
     * */
    async updateMovie(id, movie) {
        const result = await this.api.patch(`${Api.URL.movies}/${id}`, movie)

        this.clearMoviesCache()
        return result
    }

    /**
     * @param {String} id
     */
    async deleteMovie(id) {
        const result = await this.api.delete(`${Api.URL.movies}/${id}`)

        this.clearMoviesCache()
        return result
    }

    async createCategory(category) {
        const result = await this.api.post(Api.URL.categories, category)

        this.clearCategoriesCache()
        return result
    }

    async updateCategory(id, category) {
        const result = await this.api.put(`${Api.URL.categories}/${id}`, category)

        this.clearCategoriesCache()
        return result
    }

    async deleteCategory(id) {
        const result = await this.api.delete(`${Api.URL.categories}/${id}`)

        this.clearCategoriesCache()
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