import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase, set, ref, push, get, update } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

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
const database = getDatabase(app)
const auth = getAuth()

document.addEventListener("DOMContentLoaded", () => {
    var selectedOptionIndex = null;
    //var optionsParent = document.getElementById("optionsParent");

    function adicionarOpcao() {
        var optionsParent = document.getElementById("optionsParent");
        var option = document.getElementById("option").value
        var listItem = document.createElement("li");
        listItem.textContent = option;
        listItem.addEventListener("click", selectOption);
        optionsParent.appendChild(listItem);
    }

    const selectOption = (event) => {
        var options = document.querySelectorAll("#optionsParent li");
        var clickedOption = event.target;
        if (clickedOption.classList.contains("selected")) {
            clickedOption.classList.remove("selected");
            clickedOption.style.backgroundColor = "";
            clickedOption.style.listStyleType = "decimal";
            selectedOptionIndex = null;
        }
        else {
            for (var i = 0; i < options.length; i++) {
                options[i].classList.remove("selected");
                options[i].style.backgroundColor = "";
                options[i].style.listStyleType = "decimal";
            }

            event.target.classList.add("selected");
            selectedOptionIndex = Array.from(options).indexOf(event.target);
            event.target.style.backgroundColor = "green";
            clickedOption.style.listStyleType = "decimal";
        }
    }

    function getCookie(name) {
        const cookies = document.cookie.split(';');

        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();

            if (cookie.startsWith(`${name}=`)) {
                return cookie.substring(name.length + 1);
            }
        }

        return null;
    }

    function submeterQuestao() {
        const userId = getCookie('user');
        if (userId) {
            var question = document.getElementById("question").value
            var nomequiz = document.getElementById("nomequiz").value
            var options = Array.from(document.querySelectorAll("#optionsParent li")).map((li) => li.textContent)
            var correctAnswer = options[selectedOptionIndex] || "";


            const quizRef = ref(database, `quizzes/${nomequiz}`);
            const newQuestionRef = push(quizRef);
            set(newQuestionRef, {
                question: question,
                options: options,
                correctAnswer: correctAnswer
            })
                .then(() => {
                    console.log('Question submitted successfully!');
                    document.getElementById("nomequiz").value = "";
                    document.getElementById("optionsParent").innerHTML = ""
                    document.getElementById("question").value = "";
                    document.getElementById("option").value = "";
                    selectedOptionIndex = null;

                    const userRef = ref(database, `users/${userId}`);
                    let users;
                    let quizzes = [];
                    console.log(userRef);
                    get(userRef)
                        .then((snapshot) => {
                            console.log(snapshot.val());
                            users = snapshot.val();
                            quizzes = users.quizzes || [];
                            if(quizzes.includes(nomequiz)){
                                console.log("Quiz já existe na lista dos utilizadores");
                                return;
                            }
                            console.log(users)
                            quizzes.push(nomequiz);
                            update(userRef, { quizzes: quizzes })
                                .then(() => {
                                    console.log('User quizzes array updated successfully!');
                                })
                                .catch((error) => {
                                    console.error('Error updating user quizzes array:', error);
                                });
                        })
                        .catch((error) => {
                            console.error('Error getting user data:', error);
                        });
                })
                .catch((error) => {
                    console.error('Error submitting question:', error);
                });
        }
        else {
            console.log("User is not logged in.");
        }
    }



    document.addEventListener("click", function (event) {
        if (event.target.id === "adicionarOp") {
            adicionarOpcao();
        }
        else if (event.target.id === "submeterQuestion") {
            submeterQuestao();
        }
    });
})