var images = 5;

let img;
let dog;

var points = [];
var previous;
var first = true;

function setup() {
    createCanvas(window.innerWidth - 10, window.innerHeight - 20);
    dog = loadImage("img/" + (Math.floor(Math.random() * 5) + 1).toString() + ".png");
    img = createImage(window.innerWidth - 10, window.innerHeight - 20);
    img.loadPixels();
    for (let i = 0; i < img.width; i++) {
        for (let j = 0; j < img.height; j++) {
            img.set(i, j, color(150, 150, 150, 255));
        }
    }
    previous = [mouseX, mouseY];
}

function draw() {
    cursor(HAND);
    background(dog);
    if (!first) {
        gap();
    }
    else {
        previous = [mouseX, mouseY];
        first = false;
    }
    img.updatePixels();
    image(img, 0, 0);
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
        for (j = -5; j <= 5; j++) {
            for (k = -5; k <= 5; k++) {
                img.set(points[i][0] + j, points[i][1] + k, color(0, 0, 0, 0));
            }
        }
    }
    previous = [mouseX, mouseY];
}

