import { Api, Engine, User } from '../../models/index.js';
import { renderCategories } from '../../renders/category_option.js';


const movies = Api.getMovies.filter((movie) => User.getMovie(movie.id).save)
const categories = Api.getCategories

const searchEngine = new Engine(movies, categories)

export { searchEngine }

// First Render
searchEngine.loadParams()

searchEngine.renderMovies()
renderCategories(categories, '#filter-select')


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
