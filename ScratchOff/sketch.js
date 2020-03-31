var images = 9;

var img;
var hiddenImg;

var points = [];
var canvas;

var previous;
var first = true;
var size = 10;

var imag = 0;

var colors = [Math.floor(Math.random() * 128), Math.floor(Math.random() * 128), Math.floor(Math.random() * 128)];

function setup() {
    canvas = createCanvas(800, 600);
    canvas.parent('canvas');
    imag = (Math.floor(Math.random() * images) + 1).toString();
    hiddenImg = loadImage("img/" + imag + ".jpg");
    console.log(imag);
    //hiddenImg = loadImage("https://cdn1.creativecirclemedia.com/liherald/original/20191114-115356-89714%20A%20MER%20WILD%20ART%20AS%2011_14_NORMAL_CMYK.jpg");
    img = createImage(800, 600);
    img.loadPixels();
    for (let i = 0; i < img.width; i++) {
        for (let j = 0; j < img.height; j++) {
            img.set(i, j, color(colors[0], colors[1], colors[2], 255));
        }
    }
    previous = [mouseX, mouseY];
}

function draw() {
    cursor(HAND);
    background(50);
    image(hiddenImg, 0, 0, 800, 600);
    if (!first) {
        gap();
    }
    else {
        previous = [mouseX, mouseY];
    }
    if (mouseX != 0 && mouseY != 0) {
        if (first) {
            console.log(mouseX);
            console.log(mouseY);
        }
        first = false;
    }
    img.updatePixels();
    image(img, 0, 0);
    //if (first) {
    //    textAlign(CENTER, CENTER);
    //    textSize(32);
    //    fill("white");
    //    noStroke();
    //    text("Move your mouse to reveal what's underneath!", 400, 300);
    //}
}

function gap() {
    points = [];
    let mouse = [mouseX, mouseY];
    var slope = (mouse[1] - previous[1]) / (mouse[0] - previous[0]);
    if (isNaN(slope) || !isFinite(slope)) {
        slope = 1;
    }
    let intercept = mouse[1] - (slope * mouse[0]);
    if (previous[0] < mouse[0]) {
        for (i = previous[0]; i <= mouse[0]; i++) {
            points.push([i, Math.round((i * slope) + intercept)]);
        }
    }
    else {
        for (i = mouse[0]; i <= previous[0]; i++) {
            points.push([i, Math.floor((i * slope) + intercept)]);
        }

    }
    for (i = 0; i < points.length; i++) {
        for (j = -size; j <= size; j++) {
            for (k = -size; k <= size; k++) {
                img.set(points[i][0] + j, points[i][1] + k, color(0, 0, 0, 0));
            }
        }
    }
    previous = [mouseX, mouseY];
}