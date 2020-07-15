let globalNames = ['um', 'dois', 'tres', 'quatro'];
let inputName = null;
let isEditing = false;
let currenteIdenx = null;

window.addEventListener('load', () => {
  preventFormSubmit();
  inputName = document.querySelector('#inputName');
  activateInput();
  render();
});

function preventFormSubmit() {
  function handleFormsubmit() {
    event.preventDefault();
  }

  var form = document.querySelector('form');
  form.addEventListener('submit', handleFormsubmit);
}

function activateInput() {
  function insertName(newName) {
    //globalNames.push(newName);
    globalNames = [...globalNames, newName];
  }

  function updateName(newName) {
    console.log(newName);
    console.log(currenteIdenx);

    globalNames[currenteIdenx] = newName;
  }

  function handletyping(event) {
    if (event.key === 'Enter') {
      if (isEditing) {
        updateName(event.target.value);
      } else {
        insertName(event.target.value);
      }

      render();
      isEditing = false;
      clearInput();
    }
  }

  inputName.addEventListener('keyup', handletyping);
  inputName.focus();
}

function render() {
  function createDeleteButton(index) {
    function deleteName() {
      //globalNames.splice(index, 1);
      // globalNames = globalNames.filter((name, i) => {
      //   // if (i === index) {
      //   //   return false;
      //   // }
      //   // return true;
      //   return i !== index;
      // });
      globalNames = globalNames.filter((name, i) => i !== index);
      render();
    }
    var button = document.createElement('button');
    button.classList.add('deleteButton');
    button.textContent = 'x';
    button.addEventListener('click', deleteName);
    return button;
  }

  function createSpan(name, index) {
    function editItem() {
      inputName.value = name;
      inputName.focus();
      isEditing = true;
      currenteIdenx = index;
    }

    var span = document.createElement('span');
    span.classList.add('clickable');
    span.textContent = name;
    span.addEventListener('click', editItem);
    return span;
  }

  var divNames = document.querySelector('#names');
  divNames.innerHTML = '';

  //divNames.innerHTML = '<ul><li>Nome 1</li><li>Nome 2</li></ul>'
  var ul = document.createElement('ul');
  for (var i = 0; i < globalNames.length; i++) {
    var currentName = globalNames[i];

    var button = createDeleteButton(i);
    var li = document.createElement('li');
    var span = createSpan(currentName, i);

    li.appendChild(button);
    li.appendChild(span);

    ul.appendChild(li);
  }

  divNames.appendChild(ul);
  clearInput();
}

// function clearInput() {
//   inputName.value = '';
//   inputName.focus();
// }

const clearInput = () => {
  inputName.value = '';
  inputName.focus();
};
