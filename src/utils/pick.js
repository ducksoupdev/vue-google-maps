export default function(obj, arr) {
  var newObj = {};
  arr.forEach((key) => newObj[key] = obj[key]);
  return newObj;
};
