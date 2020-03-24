var images = 9;

var img;
var hiddenImg;

var points = [];
var previous;
var first = true;
var size = 0;

var tints = ["#B67856", "#BCBCBC", "#BCBCBC", "#BCBCBC", "#BCBCBC", "#E2CC99", "#D9CA8F", ];
var selected = [1, 0, 0, 0, 0, 0, 0];
var sizes = [37.5, 41.75, 35.25, 47.75, 60.25, 52.15, 47.5];
//           2     3       1      4      6       5      4
var pen_sizes = [2, 4, 2, 6, 10, 8, 6];
var names = ["Penny", "Nickel", "Dime", "Quarter", "Half Dollar", "Dollar", "Half Euro"];

var colors = [Math.floor(Math.random() * 128), Math.floor(Math.random() * 128), Math.floor(Math.random() * 128)];

function setup() {
    createCanvas(800, 700);
    hiddenImg = loadImage("img/" + (Math.floor(Math.random() * 5) + 1).toString() + ".jpg");
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
    coin();
    img.updatePixels();
    image(img, 0, 0);
    if (first) {
        textAlign(CENTER, CENTER);
        textSize(32);
        fill("white");
        noStroke();
        text("Move your mouse to reveal what's underneath!", 400, 300);
    }
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
        for (j = -pen_sizes[size]; j <= pen_sizes[size]; j++) {
            for (k = -pen_sizes[size]; k <= pen_sizes[size]; k++) {
                img.set(points[i][0] + j, points[i][1] + k, color(0, 0, 0, 0));
            }
        }
    }
    previous = [mouseX, mouseY];
}

function coin() {
    textAlign(CENTER, CENTER);
    for (i = 0; i < tints.length; i++) {
        fill("white");
        textSize(14);
        text(names[i], (i * 100) + 50, 645 - (sizes[i] / 2));
        fill(tints[i])
        circle((i * 100) + 50, 660, sizes[i] + selected[i]);
    }
    fill("white");
    text("Select a coin!", 730, 650);
}

function mousePressed() {

    if (mouseY < 600) { return; }
    selected = [0, 0, 0, 0, 0, 0, 0];
    let distances = [];
    for (i = 0; i < 7; i++) {
        distances.push([distance((i * 100) + 50, 660, mouseX, mouseY), i]);
    }
    distances.sort(function (a, b) { return a[0] - b[0] });
    size = distances[0][1];
    selected[distances[0][1]] = 5;
    console.log(size);
}

function distance(x1, y1, x2, y2) {
    return Math.sqrt(((y2 - y1) ** 2) + ((x2 - x1) ** 2));
}