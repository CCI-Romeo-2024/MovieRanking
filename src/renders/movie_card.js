import { User } from '/src/models/index.js';

/**
 * @param {Object} movie
 * @param {Number} index
 * @param {String} search
 * */
const card = (movie, index, search = '') => {
    const highlight = (text) => {
        if (!search || !text) return text;

        const searchRegex = new RegExp(`(${search})`, 'gi');
        return text?.replace(searchRegex, '<span class="highlight">$1</span>');
    };

    return `<div class="movie-card" data-movie-id="${movie.id}" style="order: ${index + 1}">
            <a href="./movie.html?id=${movie.id}">
                <img src="${movie.img}" alt="">
                <div class="movie-info">
                    <div class="movie-text">
                        <div class="movie-title">${highlight(movie.name)}</div>
                        <div class="movie-author">${highlight(movie.author)}</div>
                    </div>
                    <div class="movie-tags">
                        <div class="category tag">${highlight(movie.category.name)}</div>
                        <div class="rate tag"><span class="tag-star">&#11088;</span>${(movie.rating)}/10</div>
                    </div>
                </div>
                <div class="movie-saved ${User.getMovie(movie.id).save ? 'active' : ''}"></div>
            </a>
        </div>`
}

export default card