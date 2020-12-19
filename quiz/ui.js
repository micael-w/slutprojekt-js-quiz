class UI {

    static async paintUI(array, i) {
        let container = document.querySelector(".container");
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
                <div class="btn option option-1">
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
                    <div class="btn nav-btn next next-disabled">
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

}

export default UI