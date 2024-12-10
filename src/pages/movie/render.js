import { Api } from '../../models/index.js'
import initButtons from '../../controllers/button_controller.js'
import renderMovieView from '../../renders/movie_view.js'

const searchParams = new URLSearchParams(window.location.search)

if (!searchParams.get('id')) history.back()

const movie = Api.getMovieById(searchParams.get('id'))

if (!movie) history.back()

document.getElementById('app-movie').innerHTML = renderMovieView(movie)

const buttons = initButtons(movie)