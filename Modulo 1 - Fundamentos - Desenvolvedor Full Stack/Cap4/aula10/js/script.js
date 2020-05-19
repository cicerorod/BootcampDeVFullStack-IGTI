'use script' // o javascript acusa mais erros

// var x let

console.log('ola');

function withVar() {
  for (var i = 0; i < 10; i++) {
    console.log('Var' + i);
  }
  i = 20;
  console.log(i);
}

function withLef() {
  for (let i = 0; i < 10; i++) {
    console.log('let' + i);
  }
  //i = 20;
  //console.log(i);
}

withVar();
withLef();

const c = 10;
//c = 20;
const d = [];
console.log(d);
d.push(1);
console.log(d);

function sum(a, b) {
  return a + b;

}

// função anonima
const sum2 = function (a, b) {
  return a + b;
}

// arrow function
const sum3 = (a, b) => {
  return a + b;
}


// arrow funcion reduzida

const sum4 = (a, b) => a + b;

console.log(sum(2, 2));
console.log(sum2(2, 3));
console.log(sum3(2, 4));
console.log(sum4(2, 5));

// template literals

const name = 'Cícero';
const surName = 'Rodrigues';
const text1 = 'Meu nome é ' + name + ' ' + surName;
const text2 = `Meu nome é ${name} ${surName}`;
console.log(text1);
console.log(text2)

const sum5 = (a = 2, b = 6) => a + b;

console.log(sum5(2, 10));