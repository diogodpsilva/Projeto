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

  function getQuizzesResults() {
    const quizzesRef = ref(database, 'quizzesResults');
    const alunosRef = ref(database, 'alunos');

    const quizzesResultsContainer = document.getElementById(
      'quizzes-results-container'
    );

    Promise.all([get(quizzesRef), get(alunosRef)])
      .then(([quizzesSnapshot, alunosSnapshot]) => {
        const quizzesData = quizzesSnapshot.val();
        const alunosData = alunosSnapshot.val();
        console.log('Dados dos quizzes:', quizzesData);
        console.log('Dados dos alunos:', alunosData);

        if (quizzesData && alunosData) {
          Object.entries(quizzesData).forEach(([quiz, resultado]) => {
            const quizTitle = document.createElement('h3');
            const totalAlunos = resultado.resultados.length;
            quizTitle.textContent = `${quiz} (${totalAlunos} alunos)`;

            const table = document.createElement('table');
            const thead = document.createElement('thead');
            const tbody = document.createElement('tbody');

            const headerRow = document.createElement('tr');
            const alunoHeader = document.createElement('th');
            alunoHeader.textContent = 'Aluno';
            const emailHeader = document.createElement('th');
            emailHeader.textContent = 'Email';
            const resultadoHeader = document.createElement('th');
            resultadoHeader.textContent = 'Resultado';
            const dataJogoHeader = document.createElement('th');
            dataJogoHeader.textContent = 'Data do Jogo';

            headerRow.appendChild(alunoHeader);
            headerRow.appendChild(emailHeader);
            headerRow.appendChild(resultadoHeader);
            headerRow.appendChild(dataJogoHeader);
            thead.appendChild(headerRow);
            table.appendChild(thead);
            table.appendChild(tbody);

            resultado.resultados.forEach((res) => {
              const row = document.createElement('tr');

              const alunoCell = document.createElement('td');
              const alunoID = res.aluno;
              const alunoName = alunosData[alunoID].username;
              alunoCell.textContent = alunoName;
              row.appendChild(alunoCell);

              const emailCell = document.createElement('td');
              const alunoEmail = alunosData[alunoID].email;
              emailCell.textContent = alunoEmail;
              row.appendChild(emailCell);

              const resultadoCell = document.createElement('td');
              resultadoCell.textContent = res.resultado || '-';
              row.appendChild(resultadoCell);

              const dataJogoCell = document.createElement('td');
              dataJogoCell.textContent = res.createdAt
                ? new Date(res.createdAt).toLocaleDateString('pt-BR')
                : '-';
              row.appendChild(dataJogoCell);

              tbody.appendChild(row);
            });

            const quizContainer = document.createElement('div');
            quizContainer.appendChild(quizTitle);
            quizContainer.appendChild(table);
            quizzesResultsContainer.appendChild(quizContainer);
          });
        }
      })
      .catch((error) => {
        console.error('Erro ao buscar os dados dos quizzes e alunos:', error);
      });
  }

  // Chamar a função para buscar os resultados dos quizzes
  getQuizzesResults();

  console.log('resultado aluno');

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
});
