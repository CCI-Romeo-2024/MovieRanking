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
import '../../controllers/filter_controller.js'
import '../../controllers/search_controller.js'
import '../../controllers/pagination_controller.js'
