const questions = [
    {
        question:'What is the closest Planet to the Sun?',
        answers:[
            {text: 'Mars',correct:false},
            {text:'Jupiter',correct:false},
            {text:'Earth',correct:false},
            {text:'Mercury',correct:true},
        ]
    },
    {
        question:'what is the geographical feature of a delta?',
        answers:[
            {text:'Low,flat land',correct:true},
            {text:'Dense forest',correct:false},
            {text:'Deep valley',correct:false},
            {text:'High Mountain Range',correct:false},
        ]
    },
    {
        question:'How many time Zones do Russia have?',
        answers:[
            {text:'10',correct:false},
            {text:'7',correct:false},
            {text:'9',correct:false},
            {text:'11',correct:true},
        ]
    },
    {
        question:'How many minutes are in a second',
        answers:[
            {text:'00',correct:true},
            {text:'01',correct:false},
            {text:'60',correct:false},
            {text:'3600',correct:false},
        ]
    },
    {
        question:'which is the largest animal in the world?',
        answers:[
            {text:'shark',correct:false},
            {text:'blue whale',correct:true},
            {text:'elephant',correct:false},
            {text:'giraffe',correct:false},
        ]
    },
    
];
const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = 'Next';
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + '.'+ currentQuestion.question; 
    
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerHTML = answer.text;
        button.classList.add('btn');
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer)
    })
}

 function resetState(){
     nextButton.style.display = "none";
     while(answerButtons.firstChild){
         answerButtons.removeChild(answerButtons.firstChild);
     }
 }

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct")
        score++;
    }else{
        selectedBtn.classList.add("incorrect")
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block"
};

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block"
}


function handleNextButton(){
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
};


nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});


startQuiz();