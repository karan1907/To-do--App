'use strict'

const todos = getSavedToDos()

const filters = {
    searchText : '',
    hideCompleted: false
}
renderTodos(todos, filters);

document.querySelector('#form').addEventListener('submit', function(e){
   const text = e.target.elements.toDo.value.trim()
    e.preventDefault()
    if(text.length > 0){
        todos.push({
            id: uuidv4(),
            text,
            isCompleted: false
        })
        saveToDo(todos)
        renderTodos(todos, filters)
        e.target.elements.toDo.value = ''
    }
})



const searchTodo = document.querySelector('#search');
searchTodo.addEventListener('input', function(e){
    filters.searchText = e.target.value;
    renderTodos(todos, filters);
})

document.querySelector('#hide-completed').addEventListener('change', function(e){
    filters.hideCompleted = e.target.checked
    renderTodos(todos, filters)
})