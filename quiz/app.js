class Questions {
      static async getQuestions() {
        const url = "https://opentdb.com/api.php?amount=5&type=multiple";
        const devurl = "data.json"

        const response = await fetch(devurl);
        const responseData = await response.json();
        return responseData;
    }
}

function getNewQuestions() {
    Questions.getQuestions()
    .then(res => {
        console.log(res);
    })
    .catch(err => console.log(err));
}

getNewQuestions();

class RandomizeQuestions {
    static getRandomizedArray(array) {
        console.log("array: " + array);
        let randomizedArray = [];
        array.forEach(elem => {
            randomizedArray.push(array.splice(Math.ceil(Math.random)*array.length), 1);
            console.log("e: " + elem);
        });
        return randomizedArray;
    }
}

console.log(RandomizeQuestions.getRandomizedArray([1, 2, 3, 4]))
console.log(RandomizeQuestions.getRandomizedArray([1, 2, 3, 4]))
console.log(RandomizeQuestions.getRandomizedArray([1, 2, 3, 4]))
console.log(RandomizeQuestions.getRandomizedArray([1, 2, 3, 4]))