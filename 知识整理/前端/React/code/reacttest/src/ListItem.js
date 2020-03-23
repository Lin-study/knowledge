import React from 'react'
import { bindToThis } from './util'

class ListItem extends React.Component {
  constructor(props) {
    super(props)
    bindToThis.call(this, ['getItemForList'])
  }
  render() {
    return (
      <div>
        <h2>{this.props.title}</h2>
        <ul>
          {this.getItemForList()}
        </ul>
      </div>
    )
  }
  getItemForList() {
    return this.props.list.map((item, index) => {
      return (
        <li key={index}>{item}<button onClick={() => this.props.itemBtnClick(index, item)}>{this.props.itemBtnName}</button></li>
      )
    })
  }
}

export default ListItem