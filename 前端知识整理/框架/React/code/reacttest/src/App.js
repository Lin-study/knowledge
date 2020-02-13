import React from 'react';
import Header from './HeaderUI'
import ListItem from './ListItem'
import { bindToThis } from './util'

class App extends React.Component {
  constructor(props) {
    super(props)
    bindToThis.call(this, ['addTodoListItem', 'deleteListItem', 'overListItem'])
    this.state = {
      toDoList: [],
      overList: []
    }
  }
  render() {
    return (
      <div className="App">
        <Header addTodoListItem={this.addTodoListItem} />
        <ListItem title='正在进行' list={this.state.toDoList} itemBtnName='完成' itemBtnClick={this.overListItem} />
        <ListItem title='已完成' list={this.state.overList} itemBtnName='删除' itemBtnClick={this.deleteListItem} />
      </div>
    );
  }
  addTodoListItem(v) {
    this.setState((preState) => {
      return {
        toDoList: [...preState.toDoList, v]
      }
    })
  }
  deleteListItem(index) {
    this.setState((preState) => {
      const overList = [...preState.overList]
      overList.splice(index, 1)
      return {
        overList
      }
    })
  }
  overListItem(index, item) {
    this.setState((preState) => {
      const toDoList = [...preState.toDoList]
      toDoList.splice(index, 1)
      return {
        toDoList,
        overList: [...preState.overList, item]
      }
    })
  }
}

export default App;
