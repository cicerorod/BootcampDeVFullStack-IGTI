window.addEventListener('load', () => {
  const timer = document.querySelector('#timer');
  let count = 0;
  const internalo = setInterval(() => {
    timer.textContent = ++count;
    if (count === 10) {
      this.clearInterval(internalo);
      return;
    }

    if (count % 5 === 0) {
      setTimeout(() => {
        timer.textContent = count + ',5';
      }, 500);
    }
  }, 1000);
});
