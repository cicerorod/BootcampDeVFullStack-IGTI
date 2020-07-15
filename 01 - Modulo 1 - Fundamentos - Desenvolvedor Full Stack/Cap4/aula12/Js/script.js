window.addEventListener('load', () => {
  DoSpread();
  DoRest();
  DoDestructuring();
});

function DoSpread() {
  const marrieMen = people.results.filter(
    (person) => person.name.title === 'Mr'
  );
  const marrieWomen = people.results.filter(
    (person) => person.name.title === 'Ms'
  );

  console.log(marrieMen);
  console.log(marrieWomen);

  const resultado = [...marrieWomen, ...marrieMen];

  console.log(resultado);
}

function DoRest() {
  console.log(infiniteSum(1, 10));
}

function infiniteSum(...numbers) {
  return numbers.reduce((acc, curr) => acc + curr, 0);
}
function DoDestructuring() {
  const first = people.results[0];

  //const username = first.login.username;
  //const password = first.login.password;

  const { username, password } = first.login;

  console.log(username);
  console.log(password);
}
