/**
 * @param {Object} movie
 * */
const view = (movie) => `
        <div class="movie-header flex">
            <h1>${movie.name}</h1>
            <div class="movie-rating flex">
                <img src="/public/svg/star.svg" alt="">
                <div class="rating flex">
                    <span>${movie.rating}</span>
                    <span>/10</span>
                </div>
            </div>
        </div>
        <div class="movie-content flex">
            <div class="movie-poster-tags flex">
                <img src="${movie.img}" alt="">
                <div class="tags">
                    <div class="tag">${movie.category.name}</div>
                    <div class="tag flex"><span class="tag-star">&#11088;</span><span class="tag-rating">${movie.rating}</span>/10</div>
                </div>
            </div>
            <div class="movie-trailer flex">
                <iframe src="${movie.video}" frameborder="0" allowfullscreen></iframe>
                <div class="buttons flex">
                    <div class="save">
                        <button class="flex" id="save-btn" title="Enregistrer a plus tard">
                            <img src="" alt="save-icon">
                            <span>xxx</span>
                        </button>
                    </div>
                    <div class="rating flex" title="noter ce film">
                        <button class="like flex" title="Je recomande ce film" id="like-btn">
                            <img src="" alt="like-icon">
                            <span>XX</span>
                        </button>
                        <div class="v-separator"></div>
                        <button class="dislike flex" title="Je ne recomande pas ce film" id="dislike-btn">
                            <span>XX</span>
                            <img src="" alt="dislike-icon">
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="movie-info">
            <div class="movie-description">
                ${movie.description}
            </div>
            <hr>
            <div class="movie-author">
                <span>Réalisation : </span>
                <span>${movie.author}</span>
            </div>
        </div>

`

export default view