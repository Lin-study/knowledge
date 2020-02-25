// 判断是否为特定类型  is(Array, [1]); // true
const is = (type, val) => ![, null].includes(val) && val.constructor === type;
// 深度全等判断
const equals = (a, b) => {
  if (a === b) return true;
  if (a instanceof Date && b instanceof Date) return a.getTime() === b.getTime();
  if (!a || !b || (typeof a !== 'object' && typeof b !== 'object')) return a === b;
  if (a.prototype !== b.prototype) return false;
  let keys = Object.keys(a);
  if (keys.length !== Object.keys(b).length) return false;
  return keys.every(k => equals(a[k], b[k]));
};
// 返回值类型
const getType = v => v === undefined ? 'undefined' : v === null ? 'null' : v.constructor.name.toLowerCase()