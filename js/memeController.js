'use strict'
let gElCanvas
let gCtx
let gSrokeColor = 'black'
let gFillColor = 'white'
let gSize = 30
const PADDING = 5


/////////////Rendering:

function renderMeme() {
    const meme = getMeme()
    const { lines, selectedImgId, selectedLineIdx } = meme

    drawImg(selectedImgId, () => {
        lines.forEach(line => drawText(line))

        drawRect(lines[selectedLineIdx].pos)
    })

}

function drawImg(id, callback) {
    const elImg = new Image()
    elImg.src = `img/${id}.jpg`
    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
        callback()
    }
}

function drawText({ txt, size, fillColor, strokeColor, pos }) {
    const { x, y } = pos

    gCtx.lineWidth = size / 20
    gCtx.strokeStyle = strokeColor
    gCtx.fillStyle = fillColor
    gCtx.font = `${size}px Arial`
    gCtx.textAlign = 'start'
    // gCtx.textBaseline = 'middle'
    gCtx.fillText(txt, x, y)
    gCtx.strokeText(txt, x, y)
}

function drawRect({ x, y }) {
    const { width, height } = getTxtMeasurement()

    gCtx.strokeStyle = 'white'
    gCtx.lineWidth = 2
    gCtx.strokeRect(x - PADDING, y - height + PADDING, width + PADDING * 2, height)

}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetHeight
    renderMeme()
}

////////////////////User inputs:

function onImgSelect(elImg) {
    coverCanvasWithImg(elImg)
}

function onGetUserText(text) {
    setLineTxt(text)
    renderMeme()
}

function onSetColor() {
    gSrokeColor = document.querySelector('.stroke-color').value
    gFillColor = document.querySelector('.fill-color').value
    setColor()
    renderMeme()
}

function onSetTxtSize(diff) {
    gSize += diff
    setTxtSize()
    renderMeme()
}

function onAddLine() {
    addLine()
    renderMeme()
}

function onSwitchLine() {
    switchLine()
    renderMeme()
    setTxtInput(gMeme)
}

function onSelectLine(ev) {
    const { offsetX, offsetY } = ev
    const clickedLineIdx = gMeme.lines.findIndex(({ pos },idx) => {
        const { width, height } = getTxtMeasurement(idx)

        return offsetX >= pos.x - PADDING && offsetX <= pos.x + width + PADDING &&
            offsetY >= pos.y - height && offsetY <= pos.y
    })
    if (clickedLineIdx!== -1){
    selectLine(clickedLineIdx)
    renderMeme()
    setTxtInput(gMeme)
    }
}

function onDeleteLine() {
    removeLine()
    switchLine()
    renderMeme()
}

function setTxtInput({lines,selectedLineIdx}) {
   let elInput = document.querySelector('.txt-input') 
   console.log( gMeme)
   elInput.value =  lines[selectedLineIdx].txt
   elInput.focus()
}

// Files:

function onDownloadImg(elLink) {
    var imgContent = gElCanvas.toDataURL();
    elLink.href = imgContent
}