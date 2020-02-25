// 每个单词的首字母大写
const capitalizeEveryWord = str => str.replace(/\b[a-z]/g, char => char.toUpperCase())
// 从正则表达式中清除 HTML 标签
const stripHTMLTags = str => str.replace(/<[^>]*>/g, '');