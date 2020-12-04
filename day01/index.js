const { data } = require('./data.js');

const possibleNumber = data
  .map(number => (2020 - number))
  .filter(number => data.includes(number))
  .reduce((a, b) => a * b)


console.log(possibleNumber);


// terrrible
/*
for(i = 0; i < data.length; i++) {
  for(j = 0; j < data.length; j++) { 
    for(k = 0; k < data.length; k++) {
    if(data[i] + data[j] + data[k] === 2020) {
      console.log(`first number ${data[i]}, second number ${data[j]}`);
      console.log(data[i] * data[j] * data[k]);
    }
    }
  }
}

*/