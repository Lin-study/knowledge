// 测试一个数组内的所有元素是否都能通过某个指定函数的测试
const all = (arr, fn = Boolean) => arr.every(fn);
// 获取平均数
const average = (...nums) => nums.reduce((acc, val) => acc + val, 0) / nums.length;
// 将所有转换成数组
const castArray = val => (Array.isArray(val) ? val : [val]);
// 去除数组中无效值（排除 false、null、undefined、0、NaN）
const compact = arr => arr.filter(Boolean);
// 检测某值在数组中出现的次数
const countOccurrences = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0);
// 数组扁平化处理   [1, [2], [[3], 4], 5] => [1,2,3,4,5]
const deepFlatten = arr => [].concat(...arr.map(v => (Array.isArray(v) ? deepFlatten(v) : v)));
// 指定深度的进行扁平化处理
const flatten = (arr, depth = 1) => arr.reduce((a, v) => a.concat(depth > 1 && Array.isArray(v) ? flatten(v, depth - 1) : v), []);
// 寻找两个数组的差异  ([1, 2, 3], [1, 2, 4]); // [3]
const difference = (a, b) => {
  const s = new Set(b);
  return a.filter(x => !s.has(x));
};
// 寻找两个数组的交集
const intersection = (a, b) => {
  const s = new Set(b);
  return a.filter(x => s.has(x));
};
// 将数组打乱排序（洗牌算法）
const shuffle = ([...arr]) => {
  let m = arr.length;
  while (m) {
    const i = Math.floor(Math.random() * m--);
    [arr[m], arr[i]] = [arr[i], arr[m]];
  }
  return arr;
};
/*******************************  根据`parent_id`生成树结构  *****************************************************/
const nest = (items, id = null, link = 'parent_id') =>
  items
    .filter(item => item[link] === id)
    .map(item => ({ ...item, children: nest(items, item.id) })); 