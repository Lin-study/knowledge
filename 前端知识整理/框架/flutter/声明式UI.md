# 声明式UI

从 win 到 WEB 到 android 和 ios 通常使用命令式的 UI 编程风格（手动构建全功能的 UI 实体），然后再 UI 更改时使用方法对其进行变更。

## 更改 Widget

更改 UI 会触发自身重建，而不是再 UI 更改的时候改变旧实例 b。flutter 使用 RenderObjects 管理传统 UI 对象。当改变的使用 widgets 告诉框架在状态之间的改变，Flutter会处理其余部分。

```
return viewB {
  color: red,
  child: viewC()
}
```