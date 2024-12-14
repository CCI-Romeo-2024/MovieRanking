import { Api, Engine } from '../../models/index.js';
import { renderCategories } from '../../renders/category_option.js';
import './load.js'


const movies = Api.getMovies
const categories = Api.getCategories

const searchEngine = new Engine(movies, categories)

export { searchEngine }

// First Render
searchEngine.loadParams()

searchEngine.renderMovies()
renderCategories(categories.sort(Engine.ESort.azName), '#filter-select')


// Controller
import filter_controller from '../../controllers/filter_controller.js';
import search_controller from '../../controllers/search_controller.js';
import pagination_controller from '../../controllers/pagination_controller.js';

const controllers = [
    filter_controller,
    search_controller,
    pagination_controller
];

controllers.forEach(controller => controller(searchEngine));
