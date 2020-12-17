/* -------------------------------------------------------------------------- */
/*                                  quiz app                                  */
/* -------------------------------------------------------------------------- */



/* ---------------------------- get data from API --------------------------- */

// import Questions from "/Questions.js";

class Questions {
     static async getQuestions() {
     const url = "https://opentdb.com/api.php?amount=5&type=multiple";
     const devurl = "data.json"

     const response = await fetch(devurl);
     const responseData = await response.json();
     return responseData;
 }
}

/* --------------------------- get data from fetch -------------------------- */

function getNewQuestions() {
    Questions.getQuestions()
    .then(res => {
        makeQuestions(res)
    })
    .catch(err => console.log(err));
}

/* --------------------- make array of all the questions -------------------- */

let questionsArray = [];

function makeQuestions(res) {
    for (let i = 0; i < res.results.length; i++) {
        questionsArray.push(new CreateAQuestion(res, i));
    }
    console.log(questionsArray)
    paintUI(questionsArray, 3)
}

/* ----------------- invoke the function that gets the data ----------------- */

getNewQuestions();

/* --------- method for generating a random permutation of an array --------- */

class RandomizeQuestions {
    static getRandomizedArray(array) {
        let randomizedArray = array

            // the first step is to convert each item in the array to an object that
            // holds {sort: a random value, value: the original item}
            .map((a) => ({sort: Math.random(), value: a}))

            // we then compare each object using its random key (a.sort, b.sort)
            // by using the function a.sort - b.sort we can get 3 different outcomes:

            // a is greater than b, so (a - b) will be a positive value
            //// outcome: b will be sorted with a lower index than a

            // b is greater than a, so (a - b) will be a negative value
            //// outcome: a will be sorted with a lower index than b

            // a is equal to b, so (a - b) will be 0
            //// outcome: a and b remain unchanged
            .sort((a, b) => a.sort - b.sort)

            // finally we reverse the first .map by setting a to the object value
            // like we're "unmapping" the initial .map
            .map((a) => a.value)
        return randomizedArray;
    }
}

/* -------------------- create a question and its answers ------------------- */

class CreateAQuestion {
    constructor(newQuestion, i) {
        this.question = newQuestion.results[i].question
        this.answers = RandomizeQuestions.getRandomizedArray([
            {
                answer: newQuestion.results[i].correct_answer, isCorrect: true
            },
            {
                answer: newQuestion.results[i].incorrect_answers[0], isCorrect: false
            },
            {
                answer: newQuestion.results[i].incorrect_answers[1], isCorrect: false
            },
            {
                answer: newQuestion.results[i].incorrect_answers[2], isCorrect: false
            }
        ]);
    }
}

/* -------------------------- paint user interface -------------------------- */

function paintUI(array, i) {
    container = document.querySelector(".container");
    const output = [];

    output.push(`
    <div class="question">
                <h1>${array[i].question}</h1>
            </div>
            <div class="question-number">
                <p>This is question ${i+1} of ${array.length}</p>
            </div>
            <div class="progress">
                <div class="progress-bar" style="width: ${((i+1)*100)/array.length}%">              
                </div>
            </div>
            <div class="btn option option-1 option-selected">
                ${array[i].answers[0].answer}
            </div>
            <div class="btn option option-2">
                ${array[i].answers[1].answer}
            </div>
            <div class="btn option option-3">
                ${array[i].answers[2].answer}
            </div>
            <div class="btn option option-4">
                ${array[i].answers[3].answer}
            </div>
            <div class="navigation">
                <div class="btn nav-btn next">
                    Next
                </div>
                <div class="btn nav-btn restart">
                    Restart
                </div>
            </div>
          </div>
          `)
          container.innerHTML = output.join('\n');
}

