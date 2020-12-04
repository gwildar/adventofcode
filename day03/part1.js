const { data } = require('./data.js'); 

const getRowInfo = (row, i) => {
  return row.charAt(i*3%row.length);
};


const isTree = (step) => step === '#';

const result = data
                .map(getRowInfo)
                .filter(isTree);

console.log(result.length);


