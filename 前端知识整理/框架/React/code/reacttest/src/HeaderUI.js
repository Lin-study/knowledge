import './Header.css'
import React from 'react'
import Header from './Header'

class HeaderUI extends Header {

  render() {
    const { addTodoListItem, changeValue } = this
    return (
      <div className="Header-bg">
        <input
          value={this.state.inputValue}
          onChange={changeValue}
          ref={(input) => { this.input = input }}
        />
        <button onClick={addTodoListItem}>添加</button>
      </div>
    )
  }
}

export default HeaderUI