// 浏览器是否到达底部
const bottomVisible = () => document.documentElement.clientHeight + window.scrollY >= (document.documentElement.scrollHeight || document.documentElement.clientHeight);
// 返回当前链接`url`
const currentURL = () => window.location.href;
// `HTTP` 跳转 `HTTPS`
const httpsRedirect = () => {
  if (location.protocol !== 'https:') location.replace('https://' + location.href.split('//')[1]);
};
// 当前tab页是否活动
const isBrowserTabFocused = () => !document.hidden;
// 平滑滚动至顶部
const scrollToTop = () => {
  const c = document.documentElement.scrollTop || document.body.scrollTop;
  if (c > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, c - c / 8);
  }
};
// 滚动到指定元素区域
const smoothScroll = element => document.querySelector(element).scrollIntoView({ behavior: 'smooth' });
// 返回当前的滚动位置
const getScrollPosition = (el = window) => ({
  x: el.pageXOffset !== undefined ? el.pageXOffset : el.scrollLeft,
  y: el.pageYOffset !== undefined ? el.pageYOffset : el.scrollTop
});


