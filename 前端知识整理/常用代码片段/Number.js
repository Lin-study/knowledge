// 生成指定范围的随机整数
const randomIntegerInRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
// 生成指定范围的随机小数
const randomNumberInRange = (min, max) => Math.random() * (max - min) + min;
// 计算数字之和
const sum = (...arr) => [...arr].reduce((acc, val) => acc + val, 0);
// 快速取整
const floor = (num) => num | 0
// 四舍五入
const round = (num) => (num + 0.5) | 0
// 计算两点之间的距离
const distance = (x0, y0, x1, y1) => Math.hypot(x1 - x0, y1 - y0);

// 将标准的度数，转换成弧度。
const degreesToRads = deg => (deg * Math.PI) / 180.0;