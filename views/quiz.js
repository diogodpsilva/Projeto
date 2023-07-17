import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
const firebaseConfig = {
    apiKey: "AIzaSyDsYaqiGxGYpAt7Q9wuwjVAt7Js2Fu2xTM",
    authDomain: "projetofinal-69a61.firebaseapp.com",
    databaseURL: "https://projetofinal-69a61-default-rtdb.firebaseio.com",
    projectId: "projetofinal-69a61",
    storageBucket: "projetofinal-69a61.appspot.com",
    messagingSenderId: "374145700756",
    appId: "1:374145700756:web:c17e39f4574bf5af07b581",
    measurementId: "G-0H69VHNWS4"
};
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)

var questions = []

var currentQuestion = document.getElementById("currentQuestion")
var totalQuestion = document.getElementById("totalQuestion")
var question = document.getElementById("question")
var answerParent = document.getElementById("answerParent")

var indexNum = 0
var score = 0

function renderQuestions(){
    currentQuestion.innerHTML = indexNum + 1
    totalQuestion.innerHTML = questions.length
    var obj = questions[indexNum]
    question.innerHTML = obj.question
    answerParent.innerHTML = ''
    for(var i = 0; i < obj.options.length; i++){
        answerParent.innerHTML += `<div class="col-md-4">
        <div class="py-2">
            <button onclick="checkQuestion('${obj.options[i]}', '${obj.correctAnswer}')" class="btn btn-dark fs-4 rounded-pill w-100">
                ${obj.options[i]}
            </button>
        </div>
    </div>`
    }
}

renderQuestions()

function nextQuestion(){
    indexNum++
    renderQuestions()
}

function checkQuestion(a, b){
    if(a == b){
        score++
        console.log(score)
    }
    nextQuestion()
}