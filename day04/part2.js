#!/usr/bin/env node


const fs = require('fs');
const path = require('path');
const { difference } = require(path.resolve(__dirname, './utilty.js'));

const passports = fs.readFileSync(path.resolve(__dirname, './data.txt'), 'utf8')

const keys = new Set(["byr","iyr","eyr","hgt","hcl","ecl","pid"]);

const formatPassports = (passport) =>  
  passport.split(/\s/)
          .reduce(createKeyValuePair, {})

const createKeyValuePair = (acc ,attr) => {
  const keyValue = /^([a-z]{3}):(.+)$/.exec(attr);
  const values = {[keyValue[1]]: keyValue[2]};
  return ({...acc, ...values});
}


const validator = {
  byr: (isValidBirth = (value) => {
    // byr (Birth Year) - four digits; at least 1920 and at most 2002.
    return /^(19[2-9]\d|200[0-2])$/.test(value);
  }),
  iyr: (isValidYear = (value) => {
    // iyr (Issue Year) - four digits; at least 2010 and at most 2020.
    return /^(20[1][0-9])|2020$/.test(value);
  }),
  eyr: (isValidExpiredYear = (value) => {
    //eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
    return /^(20[2][0-9])|2030$/.test(value);
  }),

  hgt: (isValidHeight = (value) => {
    /*hgt (Height) - a number followed by either cm or in:
    If cm, the number must be at least 150 and at most 193.
    If in, the number must be at least 59 and at most 76.
    */
   return /^(1[5-8][0-9]cm|19[0-3]cm)|([5-6][0-9]in|7[0-6]in)$/.test(value)
  }),
  hcl: (value) => {
    // hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
    return /^#[\da-f]{6}$/.test(value);
  },
  ecl: (value) => {
    //ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
    return /^(amb|blu|brn|gry|grn|hzl|oth)$/.test(value);
  },
  pid: (value) => {
    //pid (Passport ID) - a nine-digit number, including leading zeroes.
    return /^\d{9}$/.test(value);
  },
  cid: () => true
};

const checkKeys = (passport) => {
  const set = new Set(Object.keys(passport))
  const diff = difference(keys, set);
  return diff.size === 0 ? true : false;
}

const validPassportCount = (count, passport) =>  {
  const test = Object.keys(passport).every(key => validator[key](passport[key]));
  if (test === true) {
    count++
  }
  return count;
}

const valid = passports
                .split(/\n\n/)
                .map(formatPassports)
                .filter(checkKeys)
                .reduce(validPassportCount, 0)
            
console.log(valid);
//109