var time = 100;
var first = true;
var score = 0;
var finished = false;

var rounds = 10;

var animals = [
    ["bunny", "rabbit"],
    ["cat", "kitten", "kitty"],
    ["chick", "duck", "bird"],
    ["dog", "puppy"],
    ["hedgehog", "porcupine"],
    ["lizard", "newt"],
    ["penguin"],
    ["pony", "horse"],
    ["seal"],
    ["squirrel", "chipmunk"]
];

var stage = Math.floor(Math.random() * 10);

function ScoreDecreaser() {
    if (!finished) {
        if (time > 4) {
            time -= 4;
            document.getElementById("score").innerHTML = (score + time).toString();
            document.getElementById("hidden-img").style.filter = "blur(" + (time / 4).toString() + "px)";
        }
        setTimeout("ScoreDecreaser()", 500);
    }
}

function CorrectGuess() {

    time = 100;
    rounds--;
    stage = Math.floor(Math.random() * 10);
    document.getElementById("hidden-img").setAttribute("src", "img/" + animals[stage][0] + ".png");
    document.getElementById("hidden-img").style.filter = "blur(25px)";
    document.getElementById("input").value = "";
    document.getElementById("input").focus();
    if (0 > rounds) {
        finished = true;
        document.getElementById("score-type").innerHTML = "Final Score:";
        document.getElementById("hidden-img").style.visibility = "hidden";
        document.getElementById("input").style.visibility = "hidden";
    }
    else if (first) {
        ScoreDecreaser();
        first = false;
    }
    else {
        score += time;
    }
}

function WordCheck() {
    if (finished) {
        document.getElementById("input").value = "";
    }
    else {
        var input = document.getElementById("input").value;
        console.log(input);
        for (i = 0; i < animals[stage].length; i++) {
            console.log(animals[stage][i]);
            if (input == animals[stage][i]) {
                CorrectGuess();
                break;
            }
        }
    }
}