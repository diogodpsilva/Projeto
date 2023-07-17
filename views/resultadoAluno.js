import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js';
import {
  getDatabase,
  set,
  ref,
  push,
  get,
  update,
  orderByChild,
} from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js';

const firebaseConfig = {
  apiKey: 'AIzaSyDsYaqiGxGYpAt7Q9wuwjVAt7Js2Fu2xTM',
  authDomain: 'projetofinal-69a61.firebaseapp.com',
  databaseURL: 'https://projetofinal-69a61-default-rtdb.firebaseio.com',
  projectId: 'projetofinal-69a61',
  storageBucket: 'projetofinal-69a61.appspot.com',
  messagingSenderId: '374145700756',
  appId: '1:374145700756:web:c17e39f4574bf5af07b581',
  measurementId: 'G-0H69VHNWS4',
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();

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

document.addEventListener('DOMContentLoaded', function () {
  const respostaCertas = [];
  const userId = getCookie('user');
  console.log(userId);
  const codigoSala = localStorage.getItem('codSala');
  console.log(codigoSala);

  function getAlunoData(userId) {
    const alunoRef = ref(database, `alunos/${userId}`);

    get(alunoRef)
      .then((snapshot) => {
        const alunoData = snapshot.val();
        if (alunoData) {
          const alunoEmailElement = document.getElementById('aluno-email');
          alunoEmailElement.textContent = alunoData.email;

          const quizzesResultsBody = document.getElementById(
            'quizzes-results-body'
          );
          alunoData.quizzes.forEach((quizResult) => {
            const row = document.createElement('tr');
            const quizCell = document.createElement('td');
            quizCell.textContent = quizResult.quiz;
            const resultadoCell = document.createElement('td');
            resultadoCell.textContent = quizResult.resultado;
            const createdAtCell = document.createElement('td');
            createdAtCell.textContent = quizResult.createdAt
              ? formatarData(quizResult.createdAt)
              : '-';
            row.appendChild(quizCell);
            row.appendChild(resultadoCell);
            row.appendChild(createdAtCell);
            quizzesResultsBody.appendChild(row);
          });
        }
      })
      .catch((error) => {
        console.error('Erro ao buscar os dados do aluno:', error);
      });
  }

  getAlunoData(userId);

  function formatarData(data) {
    const opcoes = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    return new Date(data).toLocaleString('pt-BR', opcoes);
  }

  getAlunoData();
});
