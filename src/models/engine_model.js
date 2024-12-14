import renderMovieCard from '@renders/movie_card.js';
import renderCategoryFilter from '@renders/category_filter.js';

class Engine {
    static pageSize = 20
    static ESort = {
        azName: (a, b) => a.name.localeCompare(b.name, undefined, {sensitivity: 'base'}),
        zaName: (a, b) => b.name.localeCompare(a.name, undefined, {sensitivity: 'base'}),
        azAuthor: (a, b) => a.author.localeCompare(b.author, undefined, {sensitivity: 'base'}),
        zaAuthor: (a, b) => b.author.localeCompare(a.author, undefined, {sensitivity: 'base'}),
        upLikes: (a, b) => b.rating - a.rating,
        downLikes: (a, b) => a.rating - b.rating
    }

    constructor(movies, categories) {
        this.movies = movies
        this.categories = categories

        // Filters
        this.selectedCategory = ''
        this.categoriesSelect = document.querySelector('.filters-active > .custom');

        // Search
        this.search = ''
        this.searchInput = document.querySelector('#search-input')

        // Sort
        this.currentSortName = 'azName'
        this.sortSelect = document.querySelector('#sort-select')

        // Pagination
        this.currentPage = 1
        this.maxPages = 1

        this.prevBtn = document.getElementById('pagination-controls-previous-btn')
        this.nextBtn = document.getElementById('pagination-controls-next-btn')
        this.currentPageElement = document.getElementById('pagination-controls-current-page')
    }

    setCategory(categoryID) {
        if (!this.categories.find((c) => c.id === categoryID)) return false

        this.selectedCategory = (categoryID)
        this.renderMovies()
        this.renderFilter()

        return true
    }

    changeSort(key) {
        if (!Engine.ESort.hasOwnProperty(key)) return
        // this.currentSort = Engine.ESort[key]
        this.currentSortName = key

        this.renderMovies()
    }

    removeCategory() {
        this.selectedCategory = ''

        this.renderMovies()
        this.renderFilter()
        return true
    }

    setSearch(value) {
        this.search = value
        this.renderMovies()
    }

    get getFilteredMovies() {
        const searchFilter = Engine.formatSearch(this.search)

        let movies = this.movies

        if (searchFilter)
            movies = movies.filter(movie =>
                    [
                        movie.name || '',
                        movie.description || '',
                        movie.category?.name || '',
                        movie.author || ''
                    ].some(value => Engine.formatSearch(value).indexOf(searchFilter) > -1)
            )


        if (this.selectedCategory)
            movies = movies.filter(movie => movie.category.id === this.selectedCategory);

        movies.sort(Engine.ESort[this.currentSortName])

        return movies
    }

    nextPage() {
        if (this.currentPage + 1 > this.maxPages) return

        this.currentPage++
        this.renderMovies()
    }

    prevPage() {
        if (this.currentPage - 1 < 0) return

        this.currentPage--
        this.renderMovies()
    }

    updatePagination() {
        this.prevBtn.disabled = this.currentPage === 1
        this.nextBtn.disabled = this.currentPage === this.maxPages

        this.currentPageElement.textContent = this.currentPage
    }

    updateSort() {
        this.sortSelect.value = this.currentSortName
    }

    updateSearch() {
        this.searchInput.value = this.search
    }

    updateParams() {
        const params = {q: this.search, s: this.currentSortName, p: this.currentPage, f: this.selectedCategory, fs: 0}

        const currentUrl = new URL(window.location.href);

        for (const key in params) {
            if (params[key])
                currentUrl.searchParams.set(key, params[key]);
            else
                currentUrl.searchParams.delete(key)
        }

        history.pushState(null, '', currentUrl);
    }

    loadParams() {
        const currentUrl = new URL(window.location.href);

        const search = currentUrl.searchParams.get('q') || '';
        const sortBy = currentUrl.searchParams.get('s') || 'azName';
        const currentPage = parseInt(currentUrl.searchParams.get('p')) || 1;
        const selectedCategory = currentUrl.searchParams.get('f') || '';
        const focusSearch = parseInt(currentUrl.searchParams.get('fs')) || 0;

        if (search) {
            this.search = search;
            this.updateSearch()
        }

        if (sortBy) {
            this.currentSortName = sortBy;
            this.updateSort()
        }

        if (currentPage) {
            this.currentPage = currentPage;
            this.updatePagination()
        }

        if (selectedCategory) {
            this.selectedCategory = selectedCategory;
            this.renderFilter()
        }

        if (focusSearch === 1) {
            this.searchInput.focus();
        }
    }

    renderMovies() {
        const moviesCardsElements = document.querySelector("#app-movies > .movies-cards");
        moviesCardsElements.innerHTML = ''

        const movies = this.getFilteredMovies
        const NMovies = movies.length

        movies
                .filter((movie, i) => i >= Engine.pageSize * (this.currentPage - 1) && i < Engine.pageSize * this.currentPage)
                .forEach((movie, i) => {
                    moviesCardsElements.innerHTML += renderMovieCard(movie, i, this.search)
                })

        this.maxPages = Math.ceil(NMovies / Engine.pageSize)

        this.updatePagination()
        this.updateParams()
    }


    renderFilter() {
        const filterAll = document.querySelector('#filter-all');

        if (this.selectedCategory) {
            filterAll.classList.remove('active')
            this.categoriesSelect.innerHTML = renderCategoryFilter(this.categories.find(category => category.id === this.selectedCategory))
        } else {
            filterAll.classList.add('active')
            this.categoriesSelect.innerHTML = ''
        }
    }

    static formatSearch = (value) => value
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-zA-Z0-9\s-]/g, "")
            .replace(/\s+/g, " ")
            .toLowerCase()
            .trim();
}

export default Engine