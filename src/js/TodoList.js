import React from "react"
import { observer } from "mobx-react"


@observer
export default class TodoList extends React.Component {
  createNew(e) {
    if (e.which === 13) {
      this.props.store.createTodo(e.target.value)
      e.target.value = ""
    }
  }

  filter(e) {
    this.props.store.filter = e.target.value
  }

  toggleComplete(todo) {
    todo.complete = !todo.complete
  }

  addToDo() {
    this.props.store.addToDo(this.refs.title.value);
    this.refs.title.value = "";
    }

    selectAll() {
      this.props.store.selectAll()
    }


  render() {
    const { selectAll, addToDo, removeComplete, filter, filteredTodos, todos } = this.props.store
       const todoList = filteredTodos.map(todo => (
      <li key={todo.id}>
       <input type="checkbox" onChange={this.toggleComplete.bind(this, todo)} value={todo.complete} checked={todo.complete} />
       <span>{todo.value}</span>
      </li>
    ))
       const selectAllButton = filteredTodos.length > 1 ? <button className="button3" onClick={this.selectAll.bind(this)}>Select All</button> : "";
    
    return <div>
      <h1>Todo List</h1>
      <h3>Add todos by pressing the Enter key or the Add button</h3>
      <input ref="title" className="new" placeholder="Add new todo" onKeyPress={this.createNew.bind(this)} />
      <input className="filter" placeholder="Filter by word" value={filter} onChange={this.filter.bind(this)} />
      <ul>{todoList}</ul>
      <button onClick={this.addToDo.bind(this)}>Add</button>
      <button className="button2" onClick={removeComplete}>Remove selected todos</button>
      {selectAllButton}
      
    </div>
  }
}
