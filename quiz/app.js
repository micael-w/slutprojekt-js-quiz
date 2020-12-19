/* -------------------------------------------------------------------------- */
/*                                  quiz app                                  */
/* -------------------------------------------------------------------------- */

/* -------------------------- import other modules -------------------------- */

import Questions from "./questions.js";
import CreateAQuestion from "./createaquestion.js"
import UI from "./ui.js"

/* ------------------ declare globally accessible variables ----------------- */

let questionsArray = [];
let currentQuestion = 0;
let userAnswer = 0;
let currentUserScore = [];
let correctAnswers = [];
let currentCorrectAnswer;

/* --------------------------- get data from fetch -------------------------- */

function getNewQuestions(index) {
    Questions.getQuestions()
    .then(res => {
        makeQuestions(res, index)
    })
    .catch(err => console.log(err));
}

/* --------------------- make array of all the questions -------------------- */

function makeQuestions(res, index) {
    // let questionsArray = [];
    for (let i = 0; i < res.results.length; i++) {
        questionsArray.push(new CreateAQuestion(res, i));
    }
    console.log(questionsArray)
    UI.paintUI(questionsArray, index)
    // console.log(CorrectAnswer.getCorrectAnswer(questionsArray, currentQuestion))
}

/* ---------------- class that checks which answer is correct --------------- */

class CorrectAnswer {
    static getCorrectAnswer(array, index) {
        // currentCorrectAnswer = 0;
        array[index].answers.forEach((elem, i) => {
            if (elem.isCorrect) {
                currentCorrectAnswer = (i+1)
            }
        });
        return currentCorrectAnswer;
    }
}

/* --------------------- class that holds the user score -------------------- */

class Score {

    static async userScore(currentQuestion, userAnswer, correctAnswer) {
        currentUserScore.push({currentQuestion, userAnswer, correctAnswer})
        return this.currentUserScore;
    }

}

/* ----------------- invoke the function that gets the data ----------------- */

window.addEventListener("DOMContentLoaded", getNewQuestions(currentQuestion));
document.querySelector(".container").addEventListener("click", (e) => userSubmit(e));

function userSubmit(e) {
    e.preventDefault();

/* ---------------------------- select an answer ---------------------------- */

    if (e.target.classList.contains("option")) {
       e.target.parentElement.children[7].children[0].classList.remove("next-disabled");
        for (let i = 3; i < 7; i++) {
            e.target.parentElement.children[i].classList.remove("option-selected");
        }
        e.target.classList.toggle("option-selected")
        userAnswer = parseInt(e.target.classList[2].slice(7, 8))
    }

/* ------------------------------- click next ------------------------------- */

    if (e.target.classList.contains("next") && (userAnswer != 0)) {
        currentQuestion++
        Score.userScore(currentQuestion, userAnswer, CorrectAnswer.getCorrectAnswer(questionsArray, (currentQuestion-1)));
        console.log(currentUserScore)
        UI.paintUI(questionsArray, currentQuestion)
        userAnswer = 0;
    }

/* ------------------------------ click restart ----------------------------- */

    if (e.target.classList.contains("restart")) {
        console.log("restart")
        currentQuestion = 0;
        userAnswer = 0;
        questionsArray = [];
        currentUserScore = [];
        getNewQuestions(currentQuestion);
    }
}



