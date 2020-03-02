# DOM-diff

1. 用JS对象模拟DOM（虚拟DOM）
2. 把此虚拟DOM转成真实DOM并插入页面中（render）
3. 如果有事件发生修改了虚拟DOM，比较两棵虚拟DOM树的差异，得到差异对象（diff）
4. 把差异对象应用到真正的DOM树上（patch）

# diff算法

给定两颗树，采用**先序深度优先遍历算法**找到最少的转换步骤

dom-diff比较两个虚拟 DOM 的区别，也就是比较两个对象的区别

**作用： 根据两个虚拟对象创建出补丁，描述改变的内容，将补丁用来更新 DOM**

## 实现

1. 新的DOM节点不存在{type: 'REMOVE', index}
2. 文本的变化{type: 'TEXT', text: 1}
3. 当节点类型相同时，去看一下属性是否相同，产生一个属性的补丁包{type: 'ATTR', attr: {class: 'list-group'}}
4. 节点类型不相同，直接采用替换模式{type: 'REPLACE', newNode}

``` JS
function diff(oldTree, newTree) {
  // 声明变量patches用来存放补丁的对象
  let patches = {};
  // 第一次比较应该是树的第0个索引
  let index = 0;
  // 递归树 比较后的结果放到补丁里
  walk(oldTree, newTree, index, patches);

  return patches;
}

function walk(oldNode, newNode, index, patches) {
  // 每个元素都有一个补丁
  let current = [];
  if (!newNode) { // rule1
    current.push({
      type: 'REMOVE',
      index
    });
  } else if (isString(oldNode) && isString(newNode)) {
    // 判断文本是否一致
    if (oldNode !== newNode) {
      current.push({
        type: 'TEXT',
        text: newNode
      });
    }

  } else if (oldNode.type === newNode.type) {
    // 比较属性是否有更改
    let attr = diffAttr(oldNode.props, newNode.props);
    if (Object.keys(attr).length > 0) {
      current.push({
        type: 'ATTR',
        attr
      });
    }
    // 如果有子节点，遍历子节点
    diffChildren(oldNode.children, newNode.children, patches);
  } else { // 说明节点被替换了
    current.push({
      type: 'REPLACE',
      newNode
    });
  }
  // 当前元素确实有补丁存在
  if (current.length) {
    // 将元素和补丁对应起来，放到大补丁包中
    patches[index] = current;
  }
}

function isString(obj) {
  return typeof obj === 'string';
}

function diffAttr(oldAttrs, newAttrs) {
  let patch = {};
  // 判断老的属性中和新的属性的关系
  for (let key in oldAttrs) {
    if (oldAttrs[key] !== newAttrs[key]) {
      patch[key] = newAttrs[key]; // 有可能还是undefined
    }
  }
  for (let key in newAttrs) {
    // 老节点没有新节点的属性
    if (!oldAttrs.hasOwnProperty(key)) {
      patch[key] = newAttrs[key];
    }
  }
  return patch;
}
// 所有都基于一个序号来实现
let num = 0;

function diffChildren(oldChildren, newChildren, patches) {
  // 比较老的第一个和新的第一个
  oldChildren.forEach((child, index) => {
    walk(child, newChildren[index], ++num, patches);
  });
}
// 默认导出
export default diff;
```

## walk方法都做了什么？

* 每个元素都有一个补丁，所以需要创建一个放当前补丁的数组
* 如果没有new节点的话，就直接将type为REMOVE的类型放到当前补丁里
* 如果新老节点是文本的话，判断一下文本是否一致，再指定类型TEXT并把新节点放到当前补丁
* 如果新老节点的类型相同，那么就来比较一下他们的属性props
  + diffChildren（如果有子节点，遍历子节点）
  + 遍历oldChildren，然后递归调用walk再通过child和newChildren[index]去diff
  + diffAttr（比较属性是否有更改）
  + 去比较新老Attr是否相同
  + 把newAttr的键值对赋给patch对象上并返回此对象
  + 属性比较
  + 然后如果有子节点的话就再比较一下子节点的不同，再调一次walk
* 上面三个如果都没有发生的话，那就表示节点单纯的被替换了，type为REPLACE，直接用newNode替换即可
* 当前补丁里确实有值的情况，就将对应的补丁放进大补丁包里

# 补丁更新

* 用一个变量来得到传递过来的所有补丁allPatches
* patch方法接收两个参数(node, patches)
  + 在方法内部调用walk方法，给某个元素打上补丁
* walk方法里获取所有的子节点
  + 给子节点也进行先序深度优先遍历，递归walk
  + 如果当前的补丁是存在的，那么就对其打补丁(doPatch)
* doPatch打补丁方法会根据传递的patches进行遍历
  + 判断补丁的类型来进行不同的操作
    - 属性ATTR for in去遍历attrs对象，当前的key值如果存在，就直接设置属性setAttr；如果不存在对应的key值那就直接删除这个key键的属性
    - 文字TEXT 直接将补丁的text赋值给node节点的textContent即可
    - 替换REPLACE 新节点替换老节点，需要先判断新节点是不是Element的实例，是的话调用render方法渲染新节点；
    - 不是的话就表明新节点是个文本节点，直接创建一个文本节点就OK了。
    - 之后再通过调用父级parentNode的replaceChild方法替换为新的节点
    - 删除REMOVE 直接调用父级的removeChild方法删除该节点
* 将patch方法默认导出方便调用

``` JS
import {
  Element,
  render,
  setAttr
} from './element';

let allPatches;
let index = 0; // 默认哪个需要打补丁

function patch(node, patches) {
  allPatches = patches;
  // 给某个元素打补丁
  walk(node);
}

function walk(node) {
  let current = allPatches[index++];
  let childNodes = node.childNodes;
  // 先序深度，继续遍历递归子节点
  childNodes.forEach(child => walk(child));
  if (current) {
    doPatch(node, current); // 打上补丁
  }
}

function doPatch(node, patches) {
  // 遍历所有打过的补丁
  patches.forEach(patch => {
    switch (patch.type) {
      case 'ATTR':
        for (let key in patch.attr) {
          let value = patch.attr[key];
          if (value) {
            setAttr(node, key, value);
          } else {
            node.removeAttribute(key);
          }
        }
        break;
      case 'TEXT':
        node.textContent = patch.text;
        break;
      case 'REPLACE':
        let newNode = patch.newNode;
        newNode = (newNode instanceof Element) ? render(newNode) : document.createTextNode(newNode);
        node.parentNode.replaceChild(newNode, node);
        break;
      case 'REMOVE':
        node.parentNode.removeChild(node);
        break;
      default:
        break;
    }
  });
}
export default patch;
```

