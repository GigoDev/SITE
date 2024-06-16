'use strict'

function renderGallery() {
    const elGallery = document.querySelector('.gallery')

    gImgs.forEach(({ url, id }) => {
        const elImg = new Image()
        elImg.src = url
        elImg.onload = () => {
            elGallery.appendChild(elImg)
        }
        elImg.dataset.id = id
        elImg.addEventListener("click", function () { onImgSelect(this.dataset.id) })
        elImg.addEventListener("click", function () { onShowEditor() })
    });
}

function onImgSelect(id) {
    setImg(id)
    renderMeme()
}