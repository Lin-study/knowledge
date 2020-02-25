// 检查是否包含子元素
const elementContains = (parent, child) => parent !== child && parent.contains(child);
// 返回指定元素的生效样式
const getStyle = (el, ruleName) => getComputedStyle(el)[ruleName];
// 校验元素是否包含 class 名称
const hasClass = (el, className) => el.classList.contains(className);
// 转义`HTML`   防XSS攻击
const escapeHTML = str =>
  str.replace(
    /[&<>'"]/g,
    tag =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag)
  );