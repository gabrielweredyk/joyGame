var time = 100;
var first = true;
var score = 0;
var finished = false;

var jump = true;

var selected = 0;

var rounds = 10;

var animals = ["baby", "balloons", "bird", "bubbles", "butterfly", "cocktails", "confetti", "cupcakes", "fireworks", "flowers", "icecream", "kittens", "marbles", "parrot", "penguin", "pinwheel", "puppies", "rainbow", "sunset"];

var stage = Math.floor(Math.random() * animals.length);

function ScoreDecreaser() {
    if (!finished) {
        if (score + time > 0) {
            time -= 4;
            document.getElementById("score").innerHTML = (score + time).toString();
        }
        if (time / 4 >= 0) {
            document.getElementById("hidden-img").style.filter = "blur(" + (time / 4).toString() + "px)";
        }
        setTimeout("ScoreDecreaser()", 500);
    }
}

function CorrectGuess() {
    var inputs = document.getElementById("inputs");
    var img = document.getElementById("hidden-img");


    stage = Math.floor(Math.random() * animals.length);

    while (inputs.children.length != 0) {
        inputs.removeChild(inputs.children[0]);
    }

    for (i = 0; i < animals[stage].length; i++) {
        let input = document.createElement("INPUT");
        input.setAttribute("type", "text");
        input.setAttribute("autocomplete", "off");
        input.setAttribute("oninput", "WordCheck(" + i.toString() + ")");
        input.setAttribute("maxlength", "1");
        input.setAttribute("id", i.toString());
        inputs.appendChild(input);
    }

    inputs.children[0].focus();

    rounds--;
    img.setAttribute("src", "img/" + animals[stage] + ".jpg");
    img.style.filter = "blur(25px)";
    if (0 > rounds) {
        finished = true;
        document.getElementById("score-type").innerHTML = "Final Score:";
        img.style.visibility = "hidden";
        while (inputs.children.length != 0) {
            inputs.removeChild(inputs.children[0]);
        }
    }
    else if (first) {
        ScoreDecreaser();
        first = false;
    }
    else {
        score += time;
        time = 100;
    }
}

function WordCheck(x) {

    var inputs = document.getElementById("inputs");
    var guess = "";

    if (x != inputs.children.length - 1) {
        if (jump) {
            inputs.children[x + 1].focus();
        }
        else {
            jump = true;
        }
    }
    for (i = 0; i < inputs.children.length; i++) {
        guess += inputs.children[i].value;
    }
    if (guess == animals[stage]) {
        CorrectGuess();
    }
}

document.addEventListener("keydown", function (event) {
    var inputs = document.getElementById("inputs");
    var active = document.activeElement.id;

    if (!isNaN(parseInt(active))) {
        selected = parseInt(active);
    }
        
    if (finished) { return; }
    if (event.keyCode === 8) {
        if (inputs.children[selected].value == "") {
            let temp = inputs.children[selected - 1].value;
            console.log(temp);
            inputs.children[selected - 1].focus();
            inputs.children[selected - 1].value = temp;
            jump = false;
        }
        else {
            inputs.children[selected].value = "";
        }
    }
    else if (event.keyCode === 37) {
        if (selected != 0) {
            inputs.children[selected - 1].focus();
        }
        jump = false;
    }
    else if (event.keyCode === 39) {
        if (selected != inputs.children.length - 1) {
            inputs.children[selected + 1].focus();
        }
        jump = false;
    }
});