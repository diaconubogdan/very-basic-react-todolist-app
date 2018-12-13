import { computed, observable } from "mobx"

class Todo {
  @observable value
  @observable id
  @observable complete

  constructor(value) {
    this.value = value
    this.id = Date.now()
    this.complete = false
  }
}

export class TodoStore {
  @observable todos = []
  @observable filter = ""
  @computed get filteredTodos() {
    var matchesFilter = new RegExp(this.filter, "i")
    return this.todos.filter(todo => !this.filter || matchesFilter.test(todo.value))
  }

  createTodo(value) {
    if(value) this.todos.push(new Todo(value))
  }

  removeComplete = () => {
    const incompleteTodos = this.todos.filter(todo => !todo.complete)
    this.todos.replace(incompleteTodos)
  }

  addToDo(value) {
    if(value) this.todos.push(new Todo(value));
  }

  selectAll() {
    this.todos.forEach(todo => todo.complete = true);
  }

}

export default new TodoStore

