/**
 * 冒泡排序
 *
 * 冒泡排序（Bubble Sort）也是一种简单直观的排序算法。它重复地走访过要排序的数列，
 * 一次比较两个元素，如果他们的顺序错误就把他们交换过来。走访数列的工作是重复地进行
 * 直到没有再需要交换，也就是说该数列已经排序完成。这个算法的名字由来是因为越小的
 * 元素会经由交换慢慢"浮"到数列的顶端。
 *
 * 可以参考：https://www.runoob.com/w3cnote/bubble-sort.html
 */
function bubbleSort(src) {
  let arr = [...src];
  let length = arr.length
  for (let i = 0; i < length - 1; i += 1) {
    for (let j = 0; j < length - 1 - i; j += 1) {
      let item = arr[j]
      let nextItem = arr[j + 1]
      if (nextItem < item) {
        arr[j] = nextItem
        arr[j + 1] = item
      }
    }
  }
  return arr;
}

const array = [1, 3, 2, 6, 4, 5, 9, 8, 7];

const sort = (arr) => {
  let result = [...arr];
  let temp;
  for(let i = 0; i < result.length; i++){
    for(let j = i + 1; j < result.length; j++){
      if(result[i] > result[j]){
        temp = result[i];
        result[i] = result[j];
        result[j] = temp;
      }
    }
  }

  return result;
}

const newArr = sort(array);
console.log(newArr); // [1, 2, 3, 4, 5, 6, 7, 8, 9]


/**
 * 插入排序
 *
 * 插入排序的代码实现虽然没有冒泡排序和选择排序那么简单粗暴，但它的原理应该是最容易
 * 理解的了，因为只要打过扑克牌的人都应该能够秒懂。插入排序是一种最简单直观的排序算法，
 * 它的工作原理是通过构建有序序列，对于未排序数据，在已排序序列中从后向前扫描，找到相应位置并插入。
 *
 * 可以参考：https://www.runoob.com/w3cnote/insertion-sort.html
 */
function insertionSort(src) {
  let arr = [...src];
  let length = arr.length
  for (let i = 1; i < length; i += 1) {
    // 记录要插入的数据
    const item = arr[i]
    // 从已经排序的序列最右边的开始比较，找到比其小的数
    let index = i - 1
    while (index >= 0 &&  item < arr[index]) {
      // 值向后移动一位
      arr[index + 1] = arr[index]
      index -= 1
    }
    // 存在比item小的值
    if (index !== i - 1) {
      arr[index + 1] = item
    }
  }
  return arr;
}


const array = [1, 3, 2, 6, 4, 5, 9, 8, 7];

const sort = (arr) => {
  let result = [...arr];
  let temp;
  for(let i = 0; i < result.length; i++){
    let j = i;
    while(result[j - 1] > result[j] && j>=0){
      temp = result[j - 1];
      result[j - 1] = result[j];
      result[j] = temp;
      j--;
    }
  }

  return result;
}

const newArr = sort(array);
console.log(newArr); // [1, 2, 3, 4, 5, 6, 7, 8, 9]


// 二分查找版
const array = [1, 3, 2, 6, 4, 5, 9, 8, 7];

const sort = (arr) => {
  let result = [...arr];
  let i = 0;
  let length = result.length;
  for(i; i < length; i++) {
    let left = 0;
    let right = i - 1;
    let current = result[i];

    // 找目标位置, 最终的left就是目标位置
    while(left <= right) {
      let middle = parseInt((left + right) / 2);
      if(current < result[middle]){
        right = middle - 1
      } else {
        left = middle + 1;
      }
    }

    // 将目标位置后面的元素全部后移一个，位置让出来
    for(let j = i - 1; j >= left; j--){
      result[j+1] = result[j];
    }

    // 最后将当前值插入到正确位置
    result[left] = current;
  }

  return result;
}

const newArr = sort(array);
console.log(newArr); // [1, 2, 3, 4, 5, 6, 7, 8, 9]

const samples = [{
    src: [1, 3, 2, 6, 4, 5, 9, 8, 7],
    dst: [1, 2, 3, 4, 5, 6, 7, 8, 9]
  },
  {
    src: [9, 8, 7, 6, 5, 4, 3, 2, 1],
    dst: [1, 2, 3, 4, 5, 6, 7, 8, 9]
  },
  {
    src: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    dst: [1, 2, 3, 4, 5, 6, 7, 8, 9]
  }
];

samples.forEach(({
  src
}) => console.log(bubbleSort(src)));

// describe("bubbleSort()", () => {
//   it("应该正确地排序", () => {
//     samples.forEach(({ src, dst }) => expect(bubbleSort(src)).toEqual(dst));
//   });
// });

// describe("insertionSort()", () => {
//   it("应该正确地排序", () => {
//     samples.forEach(({ src, dst }) => expect(insertionSort(src)).toEqual(dst));
//   });
// });