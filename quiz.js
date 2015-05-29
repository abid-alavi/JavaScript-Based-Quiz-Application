/**
 * Created by Abid on 3/12/2015.
 */
var name;
var students = [];

var getName = function () {
    name = document.getElementsByName("getName")[0].value;
    students.push(name);
    //alert(students[0]);
    if(name != "") {
        document.getElementById("nextPage").href = "index.html";
    }
    else {
        alert("Please Enter Your Name");
        //return false;
    }
};




var quiz = [
    {
        "question" : " What is the full form of IP ? ",
        "choices" : [ "Internet Provider", "Internet Port", "Internet Protocol" ],
        "correct" : "Internet Protocol"
    },
    {
        "question" : " JavaScript is _______ language ? ",
        "choices" : [ "Scripting", "None of these", "Application", "Programming Language" ],
        "correct" : "Scripting"
    },
    {
        "question" : " What is the full form of HTML ? ",
        "choices" : [ "Hyper Type Mass Language", "HyperText MarkUp Language", "High Tech MarkUp Language" ],
        "correct" : "HyperText MarkUp Language"
    },
    {
        "question" : " JavaScript can be written - ",
        "choices" : [ "directly on the server script", "None of these", "directly into JS file and included into HTML", "directly into HTML pages" ],
        "correct" : [ "directly into JS file and included into HTML", "directly into HTML pages" ]
    },
    {
        "question" : " What is the full form of CSS ? ",
        "choices" : [ "Cascading Style Sheets", "Centralize Style Sheets", "Cascading Style Storage" ],
        "correct" : "Cascading Style Sheets"
    },
    {
        "question" : " Who is the founder of Microsoft ? ",
        "choices" : [ "Bill Gates", "Steve Jobs", "Steve Wozniak" ],
        "correct" : "Bill Gates"
    }
];

var zero = 0;
var current = 0;
var score = 0;
var percent;
var seconds = 120;
var yourTime;

var setQuestion = function () {

    document.getElementById("student-name").innerHTML = name;
    document.getElementById("test-status").innerHTML = "<h2>Question " + (current + 1) + " of " + quiz.length + "</h2>";
    document.getElementById("ques").innerHTML = "<h4>" + quiz[current].question + "</h4>" + "<br>";

        if (typeof(quiz[current].correct) !== "object") {
            for (var j = 0; j < quiz[current].choices.length; j++) {
                document.getElementById("ques").innerHTML += "<label class= 'label-set'>" + "<input class = 'answer-option' name = 'check' type = 'radio' value = '" + quiz[current].choices[j] + "' />" + quiz[current].choices[j] + "</label>" + "<br />";
            }
        }
        else {
            for (var j = 0; j < quiz[current].choices.length; j++) {
            document.getElementById("ques").innerHTML += "<label class= 'label-set'>" + "<input class = 'answer-option' name = 'check' type = 'checkbox' value = '" + quiz[current].choices[j] + "' />" + quiz[current].choices[j] + "</label>" + "<br/>"
        }
    }
};
setQuestion();

    var checkAnswer = function () {
        var correct = quiz[current].correct;
        var options = document.querySelectorAll('input[name="check"]:checked');
        var selected = [];
        for(i=0; i<options.length; i++) {
            selected.push(options[i].value);
        }
        selected.join(', ');
        selected = selected.toString();
        correct = correct.toString();
        if(selected != "") {
            current++;
        }
        else if (selected === correct) {
            score++;
            percent = (score / quiz.length) * 100;
            if (percent < 100) {
                percent = percent.toFixed(2);
            }
            else {
                percent = percent.toFixed(0);
            }
        }
        else if (current >= quiz.length || seconds == 0) {
            clearInterval(countdownTimer);
            document.getElementById('countdown').innerHTML = "Time" + " / " + "00:00";
            result();
        }
        else
            setQuestion();
    };

    var result = function () {
        document.getElementById("ques").innerHTML = "<h1> You got " + score + " of " + quiz.length + " questions correct. " + percent + "%" + "<br>" + "<br>" + "Your time left " + yourTime + "</h1>";
        document.getElementById("test-status").innerHTML = "<h2>Test Completed</h2>";
        document.getElementsByName("submit")[0].style.display = "none";
    };



    function timeLeft() {
        var minutes = Math.round((seconds - 30)/60);
        var remainingSeconds = seconds % 60;
        if (remainingSeconds < 10) {
            remainingSeconds = zero + remainingSeconds;
        }
        document.getElementById('countdown').innerHTML = "Time left" + " / " + minutes + ":" + remainingSeconds;
        else if (seconds == 0) {
            clearInterval(countdownTimer);
            document.getElementById('countdown').innerHTML = "Time" + " / " + "00:00";
            result();
        }
        else {
            seconds--;
        }
        yourTime = minutes + ":" + remainingSeconds;
    }
    timeLeft();
    var countdownTimer = setInterval('timeLeft()', 1000);
