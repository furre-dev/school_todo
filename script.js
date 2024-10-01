const todosUl = document.getElementById('todos-list')
const input = document.getElementById('todo-input')
const button = document.getElementById('add-btn')

button.addEventListener('click', () => {
  addTodo(input.value)
  input.value = ''
})

function addTodo (task) {
  const id = Date.now()
  let todos = JSON.parse(localStorage.getItem('todos')) || []
  todos.push({
    name: task,
    id: id,
    checked: false
  })
  localStorage.setItem('todos', JSON.stringify(todos))

  updateTodoList()
}

function updateTodoList () {
  const todos = JSON.parse(localStorage.getItem('todos')) || [] // Get todos from localStorage
  todosUl.innerHTML = ''

  todos.forEach(todo => {
    const li = document.createElement('li')
    li.innerHTML = `
      <p>${todo.name}</p>
      <input id="${todo.id}" type="checkbox" ${todo.checked ? 'checked' : ''} />
    `
    todosUl.appendChild(li)

    const checkbox = li.querySelector('input[type="checkbox"]')
    checkbox.addEventListener('change', () => {
      changeStatus(todo.id, checkbox.checked)
    })
  })
}

function changeStatus (id, checked) {
  const todos = JSON.parse(localStorage.getItem('todos'))
  const currentTodo = todos.find(obj => obj.id === id)
  currentTodo.checked = checked

  console.log(checked)

  localStorage.setItem('todos', JSON.stringify(todos))
}

updateTodoList()
