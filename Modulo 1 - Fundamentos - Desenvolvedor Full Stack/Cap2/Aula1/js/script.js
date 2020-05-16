//console.log('Olá mundo');

//var title = document.querySelector('h1');
// title.textContent = 'Modificado por Cícero Rodrigues';

//var a = 5;
//var b = 6;
//if (a > b) {
//  console.log(a + 'é maior que ' + b);
//} else {
//  if (a < b) {
//    console.log(a + 'é menor que ' + b);
//  }
//}

var numeroAtual = 1;
var somatorio = 0;

while (numeroAtual <= 10) {
  somatorio += numeroAtual;
  numeroAtual++;
}
console.log('' + somatorio);

var numeroAtual = 1;
var somatorio = 0;
do {
  somatorio += numeroAtual;
  numeroAtual++;
} while (numeroAtual <= 10);

console.log('' + somatorio);

somatorio = 0;

for (numeroAtual = 1; numeroAtual < 10; numeroAtual++) {
  somatorio += numeroAtual;
}
console.log('' + somatorio);
