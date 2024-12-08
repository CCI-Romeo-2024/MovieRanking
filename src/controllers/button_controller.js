import { Button, User } from '../models/index.js';

const buttons = {
    save: {
        id: 'save-btn',
        active: false,
        icons: {
            base: './public/svg/save/save.svg',
            fill: './public/svg/save/save-fill.svg',
        }
    },
    like: {
        id: 'like-btn',
        icons: {
            base: './public/svg/like-dislike/like.svg',
            fill: './public/svg/like-dislike/like-fill.svg',
        }
    },
    dislike: {
        id: 'dislike-btn',
        icons: {
            base: './public/svg/like-dislike/dislike.svg',
            fill: './public/svg/like-dislike/dislike-fill.svg',
        }
    }
}

const init = (movie) => {
    const userData = User.getMovie(movie.id)

    const updateLike = (e, btn, type) => {
        if (e) {
            if (type === 'like') {
                const res = User.likeMovie(movie.id)
                if (btn.status === res.like) return true;
            } else {
                const res = User.dislikeMovie(movie.id)
                if (btn.status === res.dislike) return true;
            }


            if (btn.status)
                btn.data -= 1
            else
                btn.data += 1
        }

        btn.element.querySelector('span').innerText = btn.data
    }

    const saveBtn = new Button(
            buttons.save.id,
            buttons.save.icons,
            userData.save,
            (e, btn) => {
                if (e) {
                    User.saveMovie(movie.id)

                    btn.element.querySelector('span').innerText = btn.status ? 'Enregister' : 'Enregisté'
                } else {
                    btn.element.querySelector('span').innerText = btn.status ? 'Enregisté' : 'Enregister'
                }
            })



    const likeBtn = new Button(
            buttons.like.id,
            buttons.like.icons,
            userData.like,
            (e, btn) => updateLike(e, btn, 'like'),
            movie.likes)

    const dislikeBtn = new Button(
            buttons.dislike.id,
            buttons.dislike.icons,
            userData.dislike,
            (e, btn) => updateLike(e, btn, 'dislike'),
            movie.dislikes)

    return {
        like: likeBtn,
        dislike: dislikeBtn,
        save: saveBtn
    }
}

export default init