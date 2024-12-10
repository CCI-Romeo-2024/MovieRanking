import renderMovieCard from "../renders/movie_card.js";
import renderCategoryFilter from "../renders/category_filter.js";
// imp

class Engine {
    static pageSize = 10
    static ESort = {
        azName: (a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }),
        zaName: (a, b) => b.name.localeCompare(a.name, undefined, { sensitivity: 'base' }),
        azAuthor: (a, b) => a.author.localeCompare(b.author, undefined, { sensitivity: 'base' }),
        zaAuthor: (a, b) => b.author.localeCompare(a.author, undefined, { sensitivity: 'base' }),
        upLikes: (a, b) => b.rating - a.rating,
        downLikes: (a, b) => a.rating - b.rating
    }

    constructor(movies, categories) {
        this.movies = movies
        this.categories = categories

        // Filters
        this.selectedCategory = null
        // Search
        this.searchInput = ""
        // Sort
        this.currentSort = Engine.ESort.azName

        this.currentPage = 1
    }

    setCategory(categoryID) {
        if (!this.categories.find((c) => c.id === categoryID)) return false

        this.selectedCategory = (categoryID)
        this.renderMovies(1)
        this.renderFilter()

        return true
    }

    changeSort(key) {
        if (!Engine.ESort.hasOwnProperty(key)) return
        this.currentSort = Engine.ESort[key]

        this.renderMovies(1)
    }

    removeCategory() {
        this.selectedCategory = null

        this.renderMovies(1)
        this.renderFilter()
        return true
    }

    setSearchInput(value) {
        this.searchInput = value

        this.renderMovies(1)
    }

    get getFilteredMovies() {
        const searchFilter = Engine.formatSearch(this.searchInput)

        let movies = this.movies

        if (searchFilter.length > 0)
            movies = movies.filter(movie =>
                    [movie.name, movie.description, movie.category.name, movie.author].some(value => Engine.formatSearch(value).indexOf(searchFilter) > -1)
            )

        if (this.selectedCategory)
            movies = movies.filter(movie => movie.category.id === this.selectedCategory)

        movies.sort(this.currentSort)

        return movies
    }

    /**
     * @param {Number} page - from 0 to X
     * */
    renderMovies(page) {
        const moviesCardsElements = document.querySelector("#app-movies > .movies-cards");
        moviesCardsElements.innerHTML = ''

        const movies = this.getFilteredMovies
        // const NMovies = movies.length

        movies.forEach((movie, i) => {
            moviesCardsElements.innerHTML += renderMovieCard(movie, i)
        })

                // .filter((movie, i) => Engine.pageSize * page < i && i < Engine.pageSize * page-1)


    }

    renderFilter() {
        const filterParent = document.querySelector('.filters-active > .custom');
        const filterAll = document.querySelector('#filter-all');

        if (this.selectedCategory) {
            filterAll.classList.remove('active')
            filterParent.innerHTML = renderCategoryFilter(this.categories.find(category => category.id === this.selectedCategory))
        } else {
            filterAll.classList.add('active')
            filterParent.innerHTML = ''
        }

        // this.selectedCategory

        // this
    }

    static formatSearch = (value) => value
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-zA-Z0-9\s]/g, "")
            .replace(/:/g, "")
            .replaceAll('  ', ' ')
            .toLowerCase()
            .trim()
}

export default Engine