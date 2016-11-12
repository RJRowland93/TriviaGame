// ====================================================
// Variables
// ====================================================
//questions
var questions = [{
	question: "What is Kenny's wrestling name?",
	choices:["Rad Russian", "El Pollo Loco", "Juggernaut", "Congo"],
	answer: "El Pollo Loco",
},{
	question:"Who delivers the Sword of a Thousand Truths?",
	choices: ["Cartman", "Nelson", "Randy", "Stan"],
	answer: "Randy",
},{
	question:"Satan has a love affair with __",
	choices: ["Mr. Garrison", "Saddam Hussein", "Phil Collins", "Mr. Hat"],
	answer: "Saddam Hussein",
},{
	question: "Who is Professor Chaos?",
	choices: ["Butters", "Cartman", "Stan", "Craig"],
	answer: "Butters",
},{
	question: "Stan has a crush on __",
	choices: ["Bebe", "Wendy", "Red", "Heidi"],
	answer: "Wendy",
},{
	question: "Cartman's father is __",
	choices: ["Mr. Garrison", "Big Gay Al", "Chef", "his mother"],
	answer: "his mother",
},{
	question: "When Kenny dies for good, who is his replacement?",
	choices: ["Token", "Butters", "Jimmy", "Clyde"],
	answer: "Butters",
},{
	question: "Who was abducted by aliens in the first episode?",
	choices: ["Cartman", "Chef", "Stan", "Kyle"],
	answer: "Cartman",
},{
	question: "What grade are Stan, Cartman, Kyle and Kenny in?",
	choices: ["3rd", "4th", "5th", "6th"],
	answer: "4th",
},{
	question: "What is the name of the boys' teacher?",
	choices: ["Randy", "Chef", "Mr. Mackey", "Mr. Garrison"],
	answer: "Mr. Garrison"
}];

//counters and messages
var correctAnswers = 0;
var wrongAnswers = 0;
var questionCounter = 0;
var timeCounter = 15;
var congrats = "Congratulations! You are correct!";
var whoops = "Uh oh. That isn't right!";
var timeOut = "Uh oh. You're out of time!";
var start;
var reset;
// ====================================================
// Functions
// ====================================================
//show countdown timer
function displayTimer() {
	time = setInterval(decrement, 1000);
}

function stop(){
	clearInterval(time);
}

function decrement() {
	timeCounter--;
	$("#timer").text(timeCounter);
	if(timeCounter <= 0) {
		$("#message").text(timeOut);
		wrongAnswers++;
		$("#choices").empty();
		displayAnswer();
	}
}
	
//show questions and answers
function displayQuestion() {
	timeCounter = 15;
	$("#message").empty();
	$("#questions").text(questions[questionCounter].question);
	displayChoices();
	displayTimer();
}

function displayChoices() {
	for (var i = 0; i < questions[questionCounter].choices.length; i++) {
		var choiceBtn = $("<button>");
		choiceBtn.addClass("answerBtn").data("data-choice", questions[questionCounter].choices[i]).text(questions[questionCounter].choices[i]);
		choiceBtn.appendTo("#choices");
	}	
}

//user answer is correct or wrong
function userChoice() {
	if ($(this).data("data-choice") === questions[questionCounter].answer) {
		$("#message").text(congrats);
		correctAnswers++;
	} else {
		$("#message").text(whoops);
		wrongAnswers++;
	}
	displayAnswer();
}

//show user message after their answer, interlude before next question
function displayAnswer() {
	stop();
	displayScore();
	$("#questions").text("The answer is: " + questions[questionCounter].answer);
	$("#choices").empty();
	questionCounter++;
	setTimeout(displayQuestion, 3 * 1000);
}

//end of quiz score
function displayScore() {
	if (questionCounter === (questions.length - 1)) {
	$("questions").empty();	
	$("#questions").text("Game Over!");
	$("#choices").empty();
	$("message").empty();
	$("#correct").text("Number of correct answers: " + correctAnswers); 
	$("#wrong").text("Number of wrong answers: " + wrongAnswers);
	}
}

//start game button
function startGame() {
//hide play button
	$("#play").addClass("hide");
	displayQuestion();
}

function reset() {
	correctAnswers = 0;
	wrongAnswers = 0;
	questionCounter = 0;
	$("#question").empty();
	$("#message").empty();
	$("#choices").empty();
	$("#correct").empty();
	$("#wrong").empty();
	$("#reset").removeClass("hide");
}


// ====================================================
// Logic
// ====================================================
$(document).ready(function() {
	$("#play").on("click", startGame);
$(document).on("click", ".answerBtn", userChoice);
	$("#reset").on("click", reset);
});