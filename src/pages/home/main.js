import { Api, Engine } from '../../models/index.js';
import { renderCategories } from './render.js';


const movies = Api.getMovies
const categories = Api.getCategories

const searchEngine = new Engine(movies, categories)

// First Render
searchEngine.renderMovies(1)
renderCategories(categories)



import '../../controllers/filter_controller.js'
import '../../controllers/search_controller.js'


// import './load.js' // en dev

export { searchEngine }