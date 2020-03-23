import React from 'react'
import { bindToThis } from './util'

class Header extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      inputValue: ''
    }
    bindToThis.call(this, ['addTodoListItem', 'changeValue'])
  }

  addTodoListItem() {
    const { inputValue } = this.state
    this.props.addTodoListItem(inputValue)
  }
  changeValue(e) {
    const value = e.target.value
    this.setState(() => ({ inputValue: value }))
  }
}

export default Header