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

/* class Questions {
     static async getQuestions() {
     const url = "https://opentdb.com/api.php?amount=5&type=multiple";
     const devurl = "data.json"

     const response = await fetch(devurl);
     const responseData = await response.json();
     return responseData;
 }
} */

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
        for (let i = 3; i < 7; i++) {
            e.target.parentElement.children[i].classList.remove("option-selected");
        }
        e.target.classList.toggle("option-selected")
        userAnswer = parseInt(e.target.classList[2].slice(7, 8))
    }

/* ------------------------------- click next ------------------------------- */

    if (e.target.classList.contains("next") && (userAnswer != 0)) {
        currentQuestion++
        Score.userScore(currentQuestion, userAnswer, 3);
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

/* --------- method for generating a random permutation of an array --------- */

// class RandomizeQuestions {
//     static getRandomizedArray(array) {
//         let randomizedArray = array

//             // the first step is to convert each item in the array to an object that
//             // holds {sort: a random value, value: the original item}
//             .map((a) => ({sort: Math.random(), value: a}))

//             // we then compare each object using its random key (a.sort, b.sort)
//             // by using the function a.sort - b.sort we can get 3 different outcomes:

//             // a is greater than b, so (a - b) will be a positive value
//             //// outcome: b will be sorted with a lower index than a

//             // b is greater than a, so (a - b) will be a negative value
//             //// outcome: a will be sorted with a lower index than b

//             // a is equal to b, so (a - b) will be 0
//             //// outcome: a and b remain unchanged
//             .sort((a, b) => a.sort - b.sort)

//             // finally we reverse the first .map by setting a to the object value
//             // like we're "unmapping" the initial .map
//             .map((a) => a.value)
//         return randomizedArray;
//     }
// }

/* -------------------- create a question and its answers ------------------- */

// class CreateAQuestion {
//     constructor(newQuestion, i) {
//         this.question = newQuestion.results[i].question
//         this.answers = RandomizeQuestions.getRandomizedArray([
//             {
//                 answer: newQuestion.results[i].correct_answer, isCorrect: true
//             },
//             {
//                 answer: newQuestion.results[i].incorrect_answers[0], isCorrect: false
//             },
//             {
//                 answer: newQuestion.results[i].incorrect_answers[1], isCorrect: false
//             },
//             {
//                 answer: newQuestion.results[i].incorrect_answers[2], isCorrect: false
//             }
//         ]);
//     }
// }

/* -------------------------- paint user interface -------------------------- */

// function paintUI(array, i) {
//     // console.log(array, i)
//     // container = document.querySelector(".container");
//     const output = [];

//     output.push(`
//     <div class="question">
//                 <h1>${array[i].question}</h1>
//             </div>
//             <div class="question-number">
//                 <p>This is question ${i+1} of ${array.length}</p>
//             </div>
//             <div class="progress">
//                 <div class="progress-bar" style="width: ${((i+1)*100)/array.length}%">              
//                 </div>
//             </div>
//             <div class="btn option option-1 option-selected">
//                 ${array[i].answers[0].answer}
//             </div>
//             <div class="btn option option-2">
//                 ${array[i].answers[1].answer}
//             </div>
//             <div class="btn option option-3">
//                 ${array[i].answers[2].answer}
//             </div>
//             <div class="btn option option-4">
//                 ${array[i].answers[3].answer}
//             </div>
//             <div class="navigation">
//                 <div class="btn nav-btn next">
//                     Next
//                 </div>
//                 <div class="btn nav-btn restart">
//                     Restart
//                 </div>
//             </div>
//           </div>
//           `)
//           container.innerHTML = output.join('\n');
// }

