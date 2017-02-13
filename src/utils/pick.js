export default function(obj, arr) {
  var newObj = {};
  arr.forEach((key) => obj[key] = obj[key]);
  return newObj;
};
