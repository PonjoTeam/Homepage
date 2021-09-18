"use strict";

const COLOR_SCHEMES = {
    ' LGBTQ+': ['#e50000', '#ff8d00', '#ffee00', '#008121', '#004cff', '#760188'],
    ' Abrosexual': ['#46D294', '#91e6c0', '#ffffff', '#fcaecb', '#EE1766'],
    ' Agender': ['#000000', '#BABABA', '#FFFFFF', '#BAF584'],
    ' Aromantic': ['#009933', '#33cc33', '#ffffff', '#828282', '#000000'],
    ' Asexual': ['#000000', '#a4a4a4', '#ffffff', '#81047f'],
    ' Bigender': ['#F6EA65', '#FFFFFF', '#F9AFC0', '#A8E2EF', '#BF97E0', '#000000'],
    ' Bisexual': ['#D00070', '#8C4799', '#0032A0'],
    ' Demiboy': ['#7F7F7F', '#C4C4C4', '#FFFFFF', '#9AD9EB'],
    ' Demigirl': ['#7F7F7F', '#C4C4C4', '#FFFFFF', '#FFAEC9'],
    ' Gay': ['#078D70', '#26CEAA', '#99E8C2', '#EFEFFF', '#7BADE3', '#5049CB', '#3E1A78'],
    ' Genderfluid': ['#FF76A4', '#FFFFFF', '#C011D7', '#000000', '#2F3CBE'],
    ' Intersex': ['#FFD800', '#7902AA'],
    ' Lesbian': ['#D62900', '#FF9B55', '#FFFFFF', '#D461A6', '#A50062'],
    ' Non-binary': ['#b67fdb', '#ffffff', '#478121'],
    ' Omnisexual': ['#FE9ACE', '#FF53BF', '#000000', '#6760FE', '#8EA6FF'],
    ' Pansexual': ['#ff1e8c', '#fed818', '#1fb2fd'],
    ' Polysexual': ['#F714BA', '#01D66A', '#1594F6'],
    ' Transgender': ['#5bcffa', '#f5abb9', '#ffffff', '#f5abb9', '#5bcffa'],
};

const $ = (selector) => document.querySelector(selector);
const canvas = $('#canvas');
const ctx = canvas.getContext("2d");
const scale = $('#scale');
const rotate = $('#rotate');
const download = $('#download');
const form = $("form");
ctx.resetTransform = () => ctx.setTransform(1, 0, 0, 1, 0, 0);

(() => {
    const template = $('#color-radio')
    const list = $('#colors');
    Object.keys(COLOR_SCHEMES).forEach((name, i) => {
        const clone = document.importNode(template.content, true);
        const input = clone.querySelector('input');
        const label = clone.querySelector('label');
        input.value = name;
        input.checked = i === 1;
        input.addEventListener("change", redraw);
        label.appendChild(document.createTextNode(name));
        list.appendChild(clone);
    });
})();

const reader = new FileReader();
const image = new Image();
reader.onload = () => image.src = reader.result.toString();
image.onload = redraw;

$('#file').addEventListener("change", event => {
    reader.readAsDataURL(event.target.files[0])
});
scale.addEventListener("change", redraw);
rotate.addEventListener("change", redraw);

function onDrop(event) {
    event.preventDefault();
    const files = event.dataTransfer.files;
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.type.startsWith("image/")) {
            reader.readAsDataURL(file);
            break;
        }
    }
}

function redraw() {
    const halfWidth = canvas.width / 2;
    ctx.restore();
    ctx.save();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const color = $('input[name=color]:checked').value || 'standard';
    const colors = COLOR_SCHEMES[color];
    const radians = rotate.value * Math.PI / 180;
    const rainbowWidth = canvas.width / colors.length;
    const rainbowWidthExtra = rainbowWidth * Math.abs(Math.sin(radians * 2)) * 0.5;
    ctx.translate(halfWidth, halfWidth);
    ctx.rotate(radians);
    ctx.translate(-canvas.width, -canvas.width);
    colors.forEach((color, i) => {
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, canvas.width * 2, canvas.width);
        if (i === 0)
            ctx.translate(0,
                halfWidth + rainbowWidth -
                (rainbowWidthExtra * (colors.length - 2) / 2)
            );
        else
            ctx.translate(0, rainbowWidth + rainbowWidthExtra);
    });
    ctx.resetTransform();
    const MARGIN = 30;
    ctx.translate(halfWidth, halfWidth);
    ctx.beginPath()
    ctx.arc(0, 0, halfWidth - MARGIN, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();
    ctx.resetTransform();
    const dimension = Math.min(image.width, image.height) * scale.value;
    const xOffset = (image.width - dimension) / 2;
    const yOffset = (image.height - dimension) / 2;
    ctx.drawImage(
        image, xOffset, yOffset, dimension, dimension,
        0, 0, canvas.width, canvas.height
    );
    download.href = canvas.toDataURL();
}

redraw();