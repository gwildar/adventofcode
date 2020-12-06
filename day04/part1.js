#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { difference } = require(path.resolve(__dirname, "./utilty.js"));
const passports = fs.readFileSync(
  path.resolve(__dirname, "./data.txt"),
  "utf8"
);

const keys = new Set(["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"]);

const checkPassport = (count, passport) => {
  const attrs = passport.map((attr) => attr.slice(0, 3));
  const attrSet = new Set(attrs);
  const diff = difference(keys, attrSet);
  if (diff.size === 0) {
    count++;
  }
  return count;
};

const valid = passports
  .split(/\n\n/)
  .map((passport) => passport.split(/\s/))
  .reduce(checkPassport, 0);

console.log(valid);
//109
