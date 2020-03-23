export function bindToThis(arr) {
  arr.forEach(a => {
    this[a] = this[a].bind(this)
  })
}