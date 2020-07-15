window.addEventListener('load', () => {
  // DoMap();
  // DoFilter();
  // DoForEach();
  // DoReduce();
  // DoFind();
  // DoSome();
  // DoEvery();
  DoSort();
});

function DoMap() {
  const nomeEmail = people.results.map((person) => {
    return {
      name: person.name,
      email: person.email,
    };
  });
  console.log(nomeEmail);
  return nomeEmail;
}

function DoFilter() {
  const retorno = people.results.filter((person) => {
    return person.dob.age > 50;
  });
  console.log(retorno);
}

function DoForEach() {
  const mappedPeaple = DoMap();
  mappedPeaple.forEach((person) => {
    person.nameSize =
      person.name.title.length +
      person.name.first.length +
      person.name.last.length;
  });
  console.log(mappedPeaple);
}

function DoReduce() {
  //  conta os valores dentro do array
  const totalAges = people.results.reduce((accumulator, current) => {
    return accumulator + current.dob.age;
  }, 0);
  console.log(totalAges);
}

function DoFind() {
  console.log('Medoto Find');
  const primeiroItem = people.results.find((person) => {
    return person.location.state === 'Minas Gerais';
  });
  console.log(primeiroItem);
}

function DoSome() {
  console.log('Medoto Some');
  const some = people.results.some((person) => {
    return person.location.state === 'Amazonasasadf';
  });
  console.log(some);
}

function DoEvery() {
  // todos os itens atendem a uma regra
  console.log('Metodo Every');
  const resultado = people.results.every((person) => {
    return person.nat === 'US';
  });
  console.log(resultado);
}

function DoSort() {
  console.log('Metodo Sort');
  const resultado = people.results
    .map((person) => {
      return { name: person.name.first };
    })
    .filter((person) => person.name.startsWith('A'))
    .sort((a, b) => {
      //return a.name.localeCompare(b.name); // Por nome
      return a.name.length - b.name.length;
    });
  console.log(resultado);
}

// function DoFilterComMap() {
//   console.log('Iniciando o filto com 50 e todos os campos');
//   const retorno = people.results.filter((person) => {
//     return person.dob.age > 50;
//   });

//   console.log(retorno);
//   console.log('Iniciando o filto com 50 apenas alguns campos');

//   const nomeEmail = retorno.map((person) => {
//     return {
//       name: person.name,
//       email: person.email,
//       idade: person.dob.age,
//     };
//   });

//   console.log(nomeEmail);
// }

//console.log(peaple);
