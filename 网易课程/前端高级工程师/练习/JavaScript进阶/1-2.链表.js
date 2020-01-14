/**
 * 链表
 *
 * 在React中的Fiber中采用链表树的数据结构来解决主线程阻塞的问题，
 * 我们一起来试着遍历一个简单的链表结构试试
 */

/**
 * 遍历链表数据结构
 */
function traversal(linkedList, callback) {
  let node = linkedList.head
  while(node !== null) {
    callback(node.value)
    node = node.next
  }
}

const NodeD = {
  value: 4,
  next: null
};

const NodeC = {
  value: 3,
  next: NodeD
};

const NodeB = {
  value: 2,
  next: NodeC
};

const NodeA = {
  value: 1,
  next: NodeB
};

const LinkedList = {
  head: NodeA
};
let sum = 0
traversal(LinkedList, current => (sum += current));
console.log(sum)
// describe("遍历链表节点并对每一个节点的value值求和", () => {
//   let sum = 0;
//   it("求和值为10", () => {
//     traversal(LinkedList, current => (sum += current));
//     expect(sum).toBe(10);
//   });
// });
