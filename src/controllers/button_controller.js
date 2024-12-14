import { Button, User } from '@models/index.js';

import saveIcon from '@svg/save/save.svg'
import saveIconFill from '@svg/save/save-fill.svg'

import likeIcon from '@svg/like-dislike/like.svg'
import likeIconFill from '@svg/like-dislike/like-fill.svg'

import dislikeIcon from '@svg/like-dislike/dislike.svg'
import dislikeIconFill from '@svg/like-dislike/dislike-fill.svg'



const buttons = {
    save: {
        id: 'save-btn',
        active: false,
        icons: {
            base: saveIcon,
            fill: saveIconFill,
        }
    },
    like: {
        id: 'like-btn',
        icons: {
            base: likeIcon,
            fill: likeIconFill,
        }
    },
    dislike: {
        id: 'dislike-btn',
        icons: {
            base: dislikeIcon,
            fill: dislikeIconFill,
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