const { data } = require('./data.js');
const { compose } = require('./utility.js');
const test = ['ffffffffffffffhf'];

function splitString(string) {
  return string.split(' ');
}

const isInRange = ({low, high, value}) =>    
  value >= low && value <= high ?  true : false;



const containsChars = ({char, low, high, password}) => {
  const array = password.split('');
  const first = !(array[low - 1] === char)
  const second = !(array[high - 1] === char)
  if (first !== second) {
    return true;
  }
  return false;
}

const createAttr = (array) => {
  // This would be much nicer using ^(\d+)-(\d+) (.): (.+)$ from Simon
  const range = array[0].split('-');
  const char = array[1].slice(0, 1);
  const password = array[2];
  return {
    char,
    low: range[0],
    high: range[1],
    password
  }
}

const isPassword = (func) => (array) => {
  const attr = createAttr(array);
  const regex = new RegExp(`${attr.char}`, 'g');
  const result = attr.password.match(regex);
  if(!result) {
    return false;
  }
  return isInRange({...attr, value: result.length})
}


const isSecondPassword = (func) => (array) => {
  const attr = func(array);
  return containsChars(attr);
}

function isTrue(boolean) {
  return boolean === true;
}

const result = data
                  .map(splitString)
                  .flatMap(isPassword(createAttr))
                  .filter(isTrue)

console.log(result.length);


//Part 2

const result2 = data
                  .map(splitString)
                  .flatMap(isSecondPassword(createAttr))
                  .filter(isTrue)

console.log(result2.length)


