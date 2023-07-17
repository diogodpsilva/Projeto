document.addEventListener('DOMContentLoaded', function() {
    var navLinks = document.querySelectorAll('.nav-link');
    var containerHome = document.querySelector('.container-home');
  
    function loadContent(file) {
      fetch(file)
      .then(response => response.text())
      .then(data => {
        containerHome.innerHTML = data;
      })
      .catch(error => console.error(error));
    }
  
    function handleLinkClick(event, link) {
      event.preventDefault();
  
      navLinks.forEach(function(navLink) {
        navLink.classList.remove('active');
      });
  
      link.classList.add('active');
  
      var file = link.dataset.file;
      loadContent(file);

      var target = link.getAttribute('href');
      window.history.pushState(null, '', target);
    }
  
    navLinks.forEach(function(link) {
      link.addEventListener('click', function(event) {
        handleLinkClick(event, link);
      });
    });
    
    var firstLink = navLinks[0];
    handleLinkClick(new Event('click'), firstLink);
});