import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase, ref, orderByChild, query, get } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";
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

document.addEventListener('DOMContentLoaded', function() {
  var navLinks = document.querySelectorAll('.nav-linkprof');
  var containerProf = document.querySelector('.container-prof');

  // Function to load content from a file
  function loadContent(file) {
    fetch(file)
      .then(response => response.text())
      .then(data => {
        containerProf.innerHTML = data;
        getQuizzesFromUser();
      })
      .catch(error => console.error(error));
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

  function getQuizzesFromUser(){
    const listaQuizzes = [];
    const userId = getCookie('user');
    const utilizadorRef = ref(database, `users/${userId}/quizzes`);
    console.log(utilizadorRef);
    get(utilizadorRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        const quizzes = snapshot.val();
        console.log(quizzes);
        const selectElement = document.getElementById('listaquiz');
        selectElement.innerHTML = '';
        quizzes.forEach((quiz) => {
          const optionElement = document.createElement('option');
          optionElement.textContent = quiz;
          selectElement.appendChild(optionElement);
        });
      } else {
        console.log('Nenhum quiz encontrado para o utilizador:', userId);
      }
    })
    .catch((error) => {
      console.error('Erro ao obter quizzes do utilizador:', error);
    });
  }

  // Function to handle link clicks
  function handleLinkClick(event, link) {
    event.preventDefault();

    // Remove active class from all links
    navLinks.forEach(function(navLink) {
      navLink.classList.remove('active');
    });

    // Add active class to the clicked link
    link.classList.add('active');

    // Load content based on the link's data-file attribute
    var file = link.dataset.file;
    loadContent(file);
  }

  // Attach click event listeners to each link
  navLinks.forEach(function(link) {
    link.addEventListener('click', function(event) {
      handleLinkClick(event, link);
    });
  });

  // Load initial content and set active class on the first link
  var firstLink = navLinks[0];
  handleLinkClick(new Event('click'), firstLink);
});