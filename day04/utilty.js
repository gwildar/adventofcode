function difference(setA, setB) {
  let difference = new Set(setA);
  for (let elem of setB) {
    difference.delete(elem);
  }
  return difference;
}

exports.difference = difference;
