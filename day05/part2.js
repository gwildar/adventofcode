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
  const row = convertRow(seat[1]);
  const column = convertColumn(seat[2]);
  return ({ row, column, seatId: (row * 8) + column});
}

const sortBySeatId = (a, b) => {
  return a.seatId - b.seatId;
};

const getSeatIds = (acc, seat) => {
  return [...acc, seat.seatId]
}

const findGaps = (seatId, i, array) =>  {
  const lower = array[i-1] !== (seatId-1) ? true : false;
  const upper = array[i+1] !== (seatId+1) ? true : false;
  if (lower !== upper) {
    return true;
  }
  return false;
}

const findMissingId = (acc, value, i, array) => {
  if(value - array[i-1] === 2) {
    acc = value-1
  }
  return acc
}

const result = seats.split(/\n/)
                    .map(generateColumnsRows)
                    .sort(sortBySeatId)
                    .reduce(getSeatIds, [])
                    .filter(findGaps)
                    .reduce(findMissingId)
           

console.log(result);
// 615