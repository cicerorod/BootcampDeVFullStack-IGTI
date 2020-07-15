window.addEventListener('load', () => {
  //fetch('https://api.github.com/users/cicerorod').then((res) => {

  Dofetch();
  DofetchAsyncAwait();

  //console.log(divisionPromese(10, 2));

  // divisionPromese(12, 6).then((res) => {
  //   console.log(res);
  // });

  // divisionPromese(12, 0)
  //   .then((res) => {
  //     console.log(res);
  //   })
  //   .catch((errorMessage) => {
  //     console.log('Falha na divisao ' + errorMessage);
  //   });

  executedivisionPromeseAsyncAwait();
});

function ShowData(data) {
  const user = document.querySelector('#user');
  user.textContent = data.login + ' ' + data.name;
}

function divisionPromese(a, b) {
  return new Promise((resolve, reject) => {
    if (b === 0) {
      reject('Não é possivel dividir por zero');
    }
    resolve(a / b);
  });
}

async function executedivisionPromeseAsyncAwait() {
  const division = await divisionPromese(12, 2);
  console.log(division);
}

////////////
function Dofetch() {
  fetch('https://api.github.com/users/rrgomide')
    .then((res) => {
      res.json().then((data) => {
        ShowData(data);
      });
    })
    .catch((error) => {
      console.log('erro de requisição da url');
    });
}

async function DofetchAsyncAwait() {
  const res = await fetch('https://api.github.com/users/rrgomide');
  const json = await res.json();

  const user2 = document.querySelector('#user2');
  user2.textContent = json.company;

  //console.log(json);
}

////////////
