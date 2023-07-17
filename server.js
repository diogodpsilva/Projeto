const express = require('express');
const path = require('path');
const app = express();
const cookieParser = require('cookie-parser');

const { initializeApp } = require('firebase/app');
const { getDatabase, ref, set, update } = require('firebase/database');
const {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} = require('firebase/auth');

const bodyParser = require('body-parser');

app.use(cookieParser());

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

const firebaseapp = initializeApp(firebaseConfig);
const database = getDatabase(firebaseapp);
const auth = getAuth();

app.use(express.static('views'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/registoprofessor', (req, res) => {
  const { email, password, username } = req.body;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      const userRef = ref(database, 'users/' + user.uid);
      set(userRef, {
        username: username,
        email: email,
        login: 0,
      })
        .then(() => {
          console.log('User registered');
          res.redirect('/loginprofessor');
        })
        .catch((error) => {
          console.error('Error writing user data to the database', error);
          res.redirect('/registoprof');
        });
    })
    .catch((error) => {
      console.error('Error creating user with email and password', error);
      res.redirect('/registoprof');
    });
});

app.post('/registoaluno', (req, res) => {
  const { email, password, username } = req.body;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      const userRef = ref(database, 'alunos/' + user.uid);
      set(userRef, {
        username: username,
        email: email,
        login: 0,
      })
        .then(() => {
          console.log('Aluno registered');
          res.redirect('/loginaluno');
        })
        .catch((error) => {
          console.error('Error writing aluno data to the database', error);
          res.redirect('/registoal');
        });
    })
    .catch((error) => {
      console.error('Error creating aluno with email and password', error);
      res.redirect('/registoal');
    });
});

app.post('/loginprofessor', (req, res) => {
  const { email, password } = req.body;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      update(ref(database, 'users/' + user.uid), {
        login: 1,
      })
        .then(() => {
          res.cookie('user', user.uid);
          res.redirect(`/menuprofessor`);
        })
        .catch((error) => {
          console.error('Error updating user login status', error);
          res.redirect('/loginprofessor');
        });
    })
    .catch((error) => {
      console.error('Error creating user with email and password', error);
      res.redirect('/loginprofessor');
    });
});

app.post('/loginaluno', (req, res) => {
  const { email, password } = req.body;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      update(ref(database, 'alunos/' + user.uid), {
        login: 1,
      })
        .then(() => {
          res.cookie('user', user.uid);
          res.redirect('/juntarSala');
        })
        .catch((error) => {
          console.error('Error updating user login status', error);
          res.redirect('/loginaluno');
        });
    })
    .catch((error) => {
      console.error('Error creating user with email and password', error);
      res.redirect('/loginaluno');
    });
});

app.post('/logoutprofessor', (req, res) => {
  const user = auth.currentUser;
  signOut(auth)
    .then(() => {
      update(ref(database, 'users/' + user.uid), {
        login: 0,
      })
        .then(() => {
          res.redirect('/');
        })
        .catch((error) => {
          console.error('Error updating user login status', error);
          res.redirect('/menuprofessor');
        });
    })
    .catch((error) => {
      console.error('Error logging out User', error);
      res.redirect('/menuprofessor');
    });
});

app.post('/logoutaluno', (req, res) => {
  const user = auth.currentUser;
  signOut(auth)
    .then(() => {
      update(ref(database, 'alunos/' + user.uid), {
        login: 0,
      })
        .then(() => {
          res.redirect('/');
        })
        .catch((error) => {
          console.error('Error updating aluno login status', error);
          res.redirect('/quiz');
        });
    })
    .catch((error) => {
      console.error('Error logging out User', error);
      res.redirect('/quiz');
    });
});

app.get('/', (req, res) => {
  const filePath = path.join(__dirname, 'views', 'index.html');
  res.sendFile(filePath);
});

app.get('/paginainicial', (req, res) => {
  const filePath = path.join(__dirname, 'views', 'inicio.html');
  res.sendFile(filePath);
});

app.get('/login', (req, res) => {
  const filePath = path.join(__dirname, 'views', 'login.html');
  res.sendFile(filePath);
});

app.get('/loginaluno', (req, res) => {
  const filePath = path.join(__dirname, 'views', 'loginaluno.html');
  res.sendFile(filePath);
});

app.get('/juntarSala', (req, res) => {
  const filePath = path.join(__dirname, 'views', 'juntarSala.html');
  res.sendFile(filePath);
});

app.get('/resultadoAluno', (req, res) => {
  const filePath = path.join(__dirname, 'views', 'resultadosAluno.html');
  res.sendFile(filePath);
});

app.get('/todosResultados', (req, res) => {
  const filePath = path.join(__dirname, 'views', 'todosResultados.html');
  res.sendFile(filePath);
});

app.get('/loginprofessor', (req, res) => {
  const filePath = path.join(__dirname, 'views', 'loginprofessor.html');
  res.sendFile(filePath);
});

app.get('/registo', (req, res) => {
  const filePath = path.join(__dirname, 'views', 'registo.html');
  res.sendFile(filePath);
});

app.get('/registoprof', (req, res) => {
  const filePath = path.join(__dirname, 'views', 'registoprofessor.html');
  res.sendFile(filePath);
});

app.get('/registoal', (req, res) => {
  const filePath = path.join(__dirname, 'views', 'registoaluno.html');
  res.sendFile(filePath);
});

app.get('/menuprofessor', (req, res) => {
  const filePath = path.join(__dirname, 'views', 'menuprofessor.html');
  res.sendFile(filePath);
});

app.get('/menuprofessor/comecar', (req, res) => {
  const filePath = path.join(__dirname, 'views', 'comecar.html');
  res.sendFile(filePath);
});

app.get('/menuprofessor/criar', (req, res) => {
  const filePath = path.join(__dirname, 'views', 'criar.html');
  res.sendFile(filePath);
});

app.get('/menuprofessor/resultados', (req, res) => {
  const filePath = path.join(__dirname, 'views', 'resultados.html');
  res.sendFile(filePath);
});

app.get('/quiz', (req, res) => {
  const filePath = path.join(__dirname, 'views', 'quiz.html');
  res.sendFile(filePath);
});

const port = 3000;

app.listen(port, '0.0.0.0', () => {
  console.log(`Servidor ativo no URL: http://192.168.1.112:${port}/`);
});
