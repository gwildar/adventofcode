#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const seats = fs.readFileSync(
  path.resolve(__dirname, "./data.txt"),
  "utf8"
);
const { compose } = require(path.resolve(__dirname, "./utility.js"));

const replacer = (string) => (match) =>  match === string ? 0 : 1;
 
const convertToBinary = (regex, replacer) => (string) =>  string.replace(regex, replacer);

const convertToDecimal = (string) => parseInt(string, 2);

const convertBF = replacer('F');
const convertLR = replacer('L');

const convertRow = compose( 
  convertToDecimal,
  convertToBinary(/B|F/g, convertBF)
);

const convertColumn = compose(
  convertToDecimal,
  convertToBinary(/R|L/g, convertLR)
);


const generateColumnsRows = (string) => {
  const seat = /([BF]{7})([LR]{3})/.exec(string);
  return ({ row: convertRow(seat[1]), column: convertColumn(seat[2]) });
}

const getHighestSeatId = (acc, seat) => {
  const seatID = (seat.row * 8) + seat.column;
  if(seatID > acc) {
    return seatID;
  }
  return acc;
}
 
const result = seats.split(/\n/)
                    .map(generateColumnsRows)
                    .reduce(getHighestSeatId, 0);

console.log(result);
// 953