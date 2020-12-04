// Part 2
const { data } = require("./data.js");

const getRowInfo = (shift) => (down) => (result, row, i) => {
  const char = (i * (shift / down)) % row.length;
  const item = row.charAt(char);
  if (i % down === 0) {
    result.push(item);
  }
  return result;
};

const getTotal = (acc, val) => acc * val.length;

const isTree = (down) => down === "#";

const getResults = ({ shift, down }) =>
  data.reduce(getRowInfo(shift)(down), []).filter(isTree);

const types = [
  { shift: 1, down: 1 },
  { shift: 3, down: 1 },
  { shift: 5, down: 1 },
  { shift: 7, down: 1 },
  { shift: 1, down: 2 },
];

const results = types.map(getResults).reduce(getTotal, 1);

console.log(results);
//9354744432
