window.addEventListener('load', start);

function start() {
  console.log('aula 04');
  console.log('Pagina carregada');

  var nameInput = document.querySelector('#nameInput');
  nameInput.addEventListener('keyup', countName);
  var form = document.querySelector('form');
  form.addEventListener('submit', preventSubmit);
}

function countName(event) {
  var count = 1;
  var count = event.target.value;

  var span = document.querySelector('#nameLength');
  span.textContent = count.length;
}

function preventSubmit(event) {
  event.preventDefault();
  var nameInput = document.querySelector('#nameInput');
  alert(nameInput.value + ' Cadastrado');
}
