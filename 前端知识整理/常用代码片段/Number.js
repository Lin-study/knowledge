// 生成指定范围的随机整数
const randomIntegerInRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
// 生成指定范围的随机小数
const randomNumberInRange = (min, max) => Math.random() * (max - min) + min;
// 计算数字之和
const sum = (...arr) => [...arr].reduce((acc, val) => acc + val, 0);