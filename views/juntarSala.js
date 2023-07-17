import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase, set, ref, push, get, update, orderByChild } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";
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

function juntarSala() {
    const userId = getCookie('user');
    const codSala = document.getElementById("codSala").value;
    const salaRef = ref(database, 'salas');
    console.log(salaRef);
    get(salaRef)
        .then((snapshot) => {
            if (snapshot.exists()) {
                let salaId = null;
                snapshot.forEach((childSnapshot) => {
                    const sala = childSnapshot.val();
                    if (sala.codigo === codSala) {
                        salaId = childSnapshot.key;
                        return;
                    }
                });
                if (salaId) {
                    const salaAlunosRef = ref(database, `salas/${salaId}`);

                    // Atualizar o campo alunos da sala
                    update(salaAlunosRef, { alunos: [userId] })
                        .then(() => {
                            console.log('Utilizador adicionado à sala com sucesso!');
                            localStorage.setItem('codSala', codSala);
                            window.location.href='/quiz';
                        }).catch((error) => {
                            console.error('Erro ao adicionar utilizador à sala:', error);
                        });
                } else {
                    console.log('Nenhuma sala encontrada com o código:', codSala);
                }
            } else {
                console.log('Nenhuma sala encontrada.');
            }
        })
        .catch((error) => {
            console.error('Erro ao obter salas:', error);
        });
}

document.addEventListener("click", function (event) {
    if (event.target.id === "juntarSala") {
        juntarSala();
    }
});