import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase, set, ref, push } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";
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

    function submeterSala() {
        const codigoSala = document.getElementById("codsala").value;
        console.log(codigoSala);
        const quizSelecionado = document.getElementById("listaquiz").value;
        console.log(quizSelecionado);
        const userId = getCookie('user');

        console.log(userId);
        if (userId && codigoSala && quizSelecionado) {
            const salaRef = ref(database, 'salas');
            const novaSalaRef = push(salaRef);
            set(novaSalaRef, {
                utilizadorId: userId,
                quiz: quizSelecionado,
                codigo: codigoSala
            })
                .then(() => {
                    console.log('Sala submetida com sucesso!');
                    document.getElementById('codsala').value = '';
                })
                .catch((error) => {
                    console.error('Erro ao submeter a sala:', error);
                });
        }
        else {
            console.log("User is not logged in.");
        }
    }

    document.addEventListener("click", function (event) {
        if (event.target.id === "submeterSala") {
            submeterSala();
        }
    });
})