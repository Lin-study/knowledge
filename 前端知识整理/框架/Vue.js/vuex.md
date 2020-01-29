# vuex

> 不可以直接修改state下的数据

## 包含

``` JS

const store = new Vuex.Store({
  modules: {
    {
      // 数据存放处
      state: {
        editorDefinition: {},
      },
      // 类似于vuex的compouted数据
      getters: {
        definitions: state => state,
      },
      // 修改数据的方法，必须是同步的
      mutations: {
        [types.SET_EDITORDEF](state, def) {
          state.editorDefinition = def
        }
      },
      // 触发mutations中的方法（可以异步的触发mutations） 通过 store.dispatch('increment')
      actions: {
        [types.SET_EDITORDEF]: (commit) => {
          commit(types.SET_EDITORDEF)
        }
      }
    }
  }
})
```

## 执行流程

![](img/vuex.png)

