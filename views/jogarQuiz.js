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
  if (codigoSala) {
    const salaRef = ref(database, 'salas');
    console.log(salaRef);
    get(salaRef)
      .then((snapshot) => {
        const salas = snapshot.val();

        if (salas) {
          const salaId = Object.keys(salas)[0];
          const sala = salas[salaId];
          const nomeQuiz = sala.quiz;
          if (nomeQuiz) {
            const quizzesRef = ref(database, 'quizzes');

            get(quizzesRef)
              .then((quizSnapshot) => {
                const quizzes = quizSnapshot.val();
                if (quizzes) {
                  console.log(quizzes[nomeQuiz]);
                  document.getElementById('questionlength1').innerHTML =
                    Object.keys(quizzes[nomeQuiz]).length;
                    document.getElementById('questionlength2').innerHTML =
                    Object.keys(quizzes[nomeQuiz]).length;
                    document.getElementById('questionlength3').innerHTML =
                    Object.keys(quizzes[nomeQuiz]).length;
                    document.getElementById('questionlength4').innerHTML =
                    Object.keys(quizzes[nomeQuiz]).length;
                    document.getElementById('questionlength5').innerHTML =
                    Object.keys(quizzes[nomeQuiz]).length;
                  console.log(quizzes[nomeQuiz][quizzes[nomeQuiz]]);
                  const resultado = document.getElementById('resultado').value;
                  const quizId1 = Object.keys(quizzes[nomeQuiz])[0];
                  const quizId2 = Object.keys(quizzes[nomeQuiz])[1];
                  const quizId3 = Object.keys(quizzes[nomeQuiz])[2];
                  const quizId4 = Object.keys(quizzes[nomeQuiz])[3];
                  const quizId5 = Object.keys(quizzes[nomeQuiz])[4];
                  console.log(quizId1);
                  console.log(quizId2);
                  console.log(quizId3);
                  console.log(quizId4);
                  console.log(quizId5);

                  document.getElementById('nomequiz1').innerHTML = nomeQuiz;
                  document.getElementById('nomequiz2').innerHTML = nomeQuiz;
                  document.getElementById('nomequiz3').innerHTML = nomeQuiz;
                  document.getElementById('nomequiz4').innerHTML = nomeQuiz;
                  document.getElementById('nomequiz5').innerHTML = nomeQuiz;
                  document.getElementById('pergunta1opcao1').innerHTML =
                    quizzes[nomeQuiz][quizId1]['options'][0];
                  document.getElementById('pergunta1opcao2').innerHTML =
                    quizzes[nomeQuiz][quizId1]['options'][1];
                  document.getElementById('pergunta1opcao3').innerHTML =
                    quizzes[nomeQuiz][quizId1]['options'][2];

                  respostaCertas.push(
                    {
                      quiz: 'pergunta1',
                      correctAnswer:
                        quizzes[nomeQuiz][quizId1]['correctAnswer'],
                    },
                    {
                      quiz: 'pergunta2',
                      correctAnswer:
                        quizzes[nomeQuiz][quizId2]['correctAnswer'],
                    },
                    {
                      quiz: 'pergunta3',
                      correctAnswer:
                        quizzes[nomeQuiz][quizId3]['correctAnswer'],
                    },
                    {
                      quiz: 'pergunta4',
                      correctAnswer:
                        quizzes[nomeQuiz][quizId4]['correctAnswer'],
                    },
                    {
                      quiz: 'pergunta5',
                      correctAnswer:
                        quizzes[nomeQuiz][quizId5]['correctAnswer'],
                    }
                  );

                  if (quizzes[nomeQuiz][quizId1]['correctAnswer'] == 'a') {
                    document.getElementById('one-a').classList.add('correct');
                    document.getElementById('one-b').classList.add('wrong');
                    document.getElementById('one-c').classList.add('wrong');
                  }

                  if (quizzes[nomeQuiz][quizId1]['correctAnswer'] == 'b') {
                    document.getElementById('one-b').classList.add('correct');
                    document.getElementById('one-a').classList.add('wrong');
                    document.getElementById('one-c').classList.add('wrong');
                  }

                  if (quizzes[nomeQuiz][quizId1]['correctAnswer'] == 'c') {
                    document.getElementById('one-c').classList.add('correct');
                    document.getElementById('one-a').classList.add('wrong');
                    document.getElementById('one-b').classList.add('wrong');
                  }

                  if (quizzes[nomeQuiz][quizId2]['correctAnswer'] == 'a') {
                    document.getElementById('two-a').classList.add('correct');
                    document.getElementById('two-b').classList.add('wrong');
                    document.getElementById('two-c').classList.add('wrong');
                  }

                  if (quizzes[nomeQuiz][quizId2]['correctAnswer'] == 'b') {
                    document.getElementById('two-b').classList.add('correct');
                    document.getElementById('two-a').classList.add('wrong');
                    document.getElementById('two-c').classList.add('wrong');
                  }

                  if (quizzes[nomeQuiz][quizId2]['correctAnswer'] == 'c') {
                    document.getElementById('two-c').classList.add('correct');
                    document.getElementById('two-a').classList.add('wrong');
                    document.getElementById('two-b').classList.add('wrong');
                  }

                  if (quizzes[nomeQuiz][quizId3]['correctAnswer'] == 'a') {
                    document.getElementById('three-a').classList.add('correct');
                    document.getElementById('three-b').classList.add('wrong');
                    document.getElementById('three-c').classList.add('wrong');
                  }

                  if (quizzes[nomeQuiz][quizId3]['correctAnswer'] == 'b') {
                    document.getElementById('three-b').classList.add('correct');
                    document.getElementById('three-a').classList.add('wrong');
                    document.getElementById('three-c').classList.add('wrong');
                  }

                  if (quizzes[nomeQuiz][quizId3]['correctAnswer'] == 'c') {
                    document.getElementById('three-c').classList.add('correct');
                    document.getElementById('three-a').classList.add('wrong');
                    document.getElementById('three-b').classList.add('wrong');
                  }

                  if (quizzes[nomeQuiz][quizId4]['correctAnswer'] == 'a') {
                    document.getElementById('four-a').classList.add('correct');
                    document.getElementById('four-b').classList.add('wrong');
                    document.getElementById('four-c').classList.add('wrong');
                  }

                  if (quizzes[nomeQuiz][quizId4]['correctAnswer'] == 'b') {
                    document.getElementById('four-b').classList.add('correct');
                    document.getElementById('four-a').classList.add('wrong');
                    document.getElementById('four-c').classList.add('wrong');
                  }

                  if (quizzes[nomeQuiz][quizId4]['correctAnswer'] == 'c') {
                    document.getElementById('four-c').classList.add('correct');
                    document.getElementById('four-a').classList.add('wrong');
                    document.getElementById('four-b').classList.add('wrong');
                  }

                  if (quizzes[nomeQuiz][quizId5]['correctAnswer'] == 'a') {
                    document.getElementById('five-a').classList.add('correct');
                    document.getElementById('five-b').classList.add('wrong');
                    document.getElementById('five-c').classList.add('wrong');
                  }

                  if (quizzes[nomeQuiz][quizId5]['correctAnswer'] == 'b') {
                    document.getElementById('five-b').classList.add('correct');
                    document.getElementById('five-a').classList.add('wrong');
                    document.getElementById('five-c').classList.add('wrong');
                  }

                  if (quizzes[nomeQuiz][quizId5]['correctAnswer'] == 'c') {
                    document.getElementById('five-c').classList.add('correct');
                    document.getElementById('five-a').classList.add('wrong');
                    document.getElementById('five-b').classList.add('wrong');
                  }

                  document.getElementById('pergunta2opcao1').innerHTML =
                    quizzes[nomeQuiz][quizId2]['options'][0];
                  document.getElementById('pergunta2opcao2').innerHTML =
                    quizzes[nomeQuiz][quizId2]['options'][1];
                  document.getElementById('pergunta2opcao3').innerHTML =
                    quizzes[nomeQuiz][quizId2]['options'][2];

                  document.getElementById('pergunta3opcao1').innerHTML =
                    quizzes[nomeQuiz][quizId3]['options'][0];
                  document.getElementById('pergunta3opcao2').innerHTML =
                    quizzes[nomeQuiz][quizId3]['options'][1];
                  document.getElementById('pergunta3opcao3').innerHTML =
                    quizzes[nomeQuiz][quizId3]['options'][2];

                  document.getElementById('pergunta4opcao1').innerHTML =
                    quizzes[nomeQuiz][quizId4]['options'][0];
                  document.getElementById('pergunta4opcao2').innerHTML =
                    quizzes[nomeQuiz][quizId4]['options'][1];
                  document.getElementById('pergunta4opcao3').innerHTML =
                    quizzes[nomeQuiz][quizId4]['options'][2];

                  document.getElementById('pergunta5opcao1').innerHTML =
                    quizzes[nomeQuiz][quizId5]['options'][0];
                  document.getElementById('pergunta5opcao2').innerHTML =
                    quizzes[nomeQuiz][quizId5]['options'][1];
                  document.getElementById('pergunta5opcao3').innerHTML =
                    quizzes[nomeQuiz][quizId5]['options'][2];

                  console.log(quizzes[nomeQuiz][quizId1]['question']);
                  document.getElementById('pergunta1').innerHTML =
                    quizzes[nomeQuiz][quizId1]['question'];
                  document.getElementById('pergunta2').innerHTML =
                    quizzes[nomeQuiz][quizId2]['question'];
                  document.getElementById('pergunta3').innerHTML =
                    quizzes[nomeQuiz][quizId3]['question'];
                  document.getElementById('pergunta4').innerHTML =
                    quizzes[nomeQuiz][quizId4]['question'];
                  document.getElementById('pergunta5').innerHTML =
                    quizzes[nomeQuiz][quizId5]['question'];
                } else {
                  console.log('Nenhum quiz encontrado com o nome:', nomeQuiz);
                }
              })
              .catch((error) => {
                console.error('Erro ao obter o quiz:', error);
              });
          } else {
            console.log('Nenhum nome de quiz encontrado na sala');
          }
        } else {
          console.log('Nenhuma sala encontrada com o código:', codigoSala);
        }
      })
      .catch((error) => {
        console.error('Erro ao obter as salas:', error);
      });
  } else {
    console.log('Código da sala não encontrado no localStorage');
  }

  const btnSeguinte = document.querySelector('.clickUltimaPergunta');

  btnSeguinte.addEventListener('click', function () {
    submterResultados();
  });

  function submterResultados() {
    const nomeQuiz = document.getElementById('nomequiz1').textContent;
    const resultado = calcularResultado();
    const aluno = getCookie('user');
    const createdAt = new Date().toISOString();

    const quizzesResultsRef = ref(database, 'quizzesResults');
    const alunosRef = ref(database, 'alunos');

    // Atualizar tabela quizzesResults
    get(quizzesResultsRef)
      .then((snapshot) => {
        const quizzesResults = snapshot.val() || {};

        if (!quizzesResults[nomeQuiz]) {
          quizzesResults[nomeQuiz] = { quiz: nomeQuiz, resultados: [] };
        }

        const resultadosAnteriores = quizzesResults[nomeQuiz].resultados || [];
        const novoResultado = {
          aluno: aluno,
          resultado: resultado,
          createdAt: createdAt,
        };
        resultadosAnteriores.push(novoResultado);

        quizzesResults[nomeQuiz].resultados = resultadosAnteriores;

        set(quizzesResultsRef, quizzesResults)
          .then(() => {
            console.log(
              'Resultado do aluno guardado com sucesso na tabela quizzesResults!'
            );
          })
          .catch((error) => {
            console.error(
              'Erro ao salvar o resultado do aluno na tabela quizzesResults:',
              error
            );
          });
      })
      .catch((error) => {
        console.error(
          'Erro ao obter os resultados anteriores da tabela quizzesResults:',
          error
        );
      });

    // Atualizar tabela alunos
    get(alunosRef)
      .then((snapshot) => {
        const alunos = snapshot.val() || {};

        if (!alunos[aluno]) {
          alunos[aluno] = { quizzes: [] };
        }

        const quizzesAluno = alunos[aluno].quizzes || [];
        const novoQuiz = {
          quiz: nomeQuiz,
          resultado: resultado,
          createdAt: createdAt,
        };
        quizzesAluno.push(novoQuiz);

        alunos[aluno].quizzes = quizzesAluno;

        set(alunosRef, alunos)
          .then(() => {
            console.log(
              'Resultado do aluno guardado com sucesso na tabela alunos!'
            );
          })
          .catch((error) => {
            console.error(
              'Erro ao salvar o resultado do aluno na tabela alunos:',
              error
            );
          });
      })
      .catch((error) => {
        console.error(
          'Erro ao obter os dados anteriores da tabela alunos:',
          error
        );
      });
  }

  function calcularResultado() {
    let resultado = 0;

    // Verificar as respostas de cada pergunta
    const pergunta1Resposta = document.querySelector(
      'input[name="yes-1"]:checked'
    );
    const pergunta2Resposta = document.querySelector(
      'input[name="no-2"]:checked'
    );
    const pergunta3Resposta = document.querySelector(
      'input[name="no-3"]:checked'
    );
    const pergunta4Resposta = document.querySelector(
      'input[name="no-4"]:checked'
    );
    const pergunta5Resposta = document.querySelector(
      'input[name="yes-5"]:checked'
    );

    if (pergunta1Resposta && pergunta1Resposta.classList.contains('correct')) {
      resultado += 10;
    }

    if (pergunta2Resposta && pergunta2Resposta.classList.contains('correct')) {
      resultado += 10;
    }

    if (pergunta3Resposta && pergunta3Resposta.classList.contains('correct')) {
      resultado += 10;
    }

    if (pergunta4Resposta && pergunta4Resposta.classList.contains('correct')) {
      resultado += 10;
    }

    if (pergunta5Resposta && pergunta5Resposta.classList.contains('correct')) {
      resultado += 10;
    }

    document.getElementById('resultado').innerHTML = resultado;
    return resultado;
  }
});
