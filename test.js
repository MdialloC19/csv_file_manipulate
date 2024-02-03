let counter = (function () {
  let k = 0;
  return () => k++;
})();
console.log(counter());
console.log(counter());
console.log(counter());
