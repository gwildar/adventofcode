#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const data = fs.readFileSync(
  path.resolve(__dirname, "./data.txt"),
  "utf8"
);


const collectCorrectAnswers = (answer) => {
  let letters = new Set();
  for (const letter of answer) {
    if(letter !== '\n') {
      letters.add(letter);
    }
  }
  return letters.size;
}

const addTotal = (acc, count) => acc + count


const result = data.split(/\n\n/)
                   .map(collectCorrectAnswers)
                   .reduce(addTotal, 0);

console.log(result);
