#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const data = fs.readFileSync(
  path.resolve(__dirname, "./data.txt"),
  "utf8"
);

const intersection = (setA, setB) => {
  let intersection = new Set()
  for (let elem of setB) {
      if (setA.has(elem)) {
          intersection.add(elem)
      }
  }
  return intersection
}

const collectCorrectAnswers = (answer) => {
  let letters = new Set();
  for (let letter of answer) {
    if(letter !== '\n') {
      letters.add(letter);
    }
  }
  return letters.size;
}

const collectLetters = sets => answer => {
  let letters = new Set();
  for (let letter of answer) {  
    letters.add(letter);
  }
  sets.push(letters); 
}

const findIntersections = (acc, set) => {
  return intersection(acc, set);
}

const collectAllCorrectAnswers = answers => {
    const individualAnswers = answers.split(/\n/);
    const sets = [];
    individualAnswers.forEach(collectLetters(sets));
    const allCorrect = sets.reduce(findIntersections);
    return allCorrect.size;
}

const addTotal = (acc, count) => acc + count

const result = data.split(/\n\n/)
                   .map(collectAllCorrectAnswers)
                   .reduce(addTotal, 0);

console.log(result);

