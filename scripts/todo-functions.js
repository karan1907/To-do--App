'use strict'

// Read existing todo from local storage

const getSavedToDos = () => {
    const todoJSON = localStorage.getItem('todo')
    try{
        return todoJSON ? JSON.parse(todoJSON) : []
    }catch (e){
        return []
    } 
}

// Save ToDOs to local Storage

const saveToDo = (todos) => {
    localStorage.setItem('todo', JSON.stringify(todos))
}

// Remove Todos from local Storage by id
const removeTodo = (id) => {
    const todoIndex = todos.findIndex((todo) => todo.id === id)
    if(todoIndex > -1){
        todos.splice(todoIndex, 1)
    }
}

// Toggle the completed value for a given todo
const toggleTodo = (id) => {
    const todo = todos.find((todo) => todo.id === id)

    if(todo){
        todo.isCompleted = !todo.isCompleted
    }
}

// Render application todos based on filter

const renderTodos = (todos, filters) => {
    const todoEl = document.querySelector('#todos')
    let filteredTodos = todos.filter((todo) => todo.text.toLowerCase().includes(filters.searchText.toLowerCase()))

    filteredTodos = filteredTodos.filter((todo) => {
        if (filters.hideCompleted) {
            return !todo.isCompleted
        }else{
            return true
        }
    })

    const inCompleteTodos = filteredTodos.filter((todo) => !todo.isCompleted)

    todoEl.innerHTML = ''


    todoEl.append(generateSummaryDOM(inCompleteTodos));

    
    if(filteredTodos.length > 0){
        filteredTodos.forEach((todo) => {
        todoEl.appendChild(generateToDoDOM(todo));
        })
    } else {
        const messageEl = document.createElement('p')
        messageEl.classList.add('empty-message')
        messageEl.textContent = 'No to-dos to show'
        todoEl.appendChild(messageEl)
    }
}

//Generate the DOM elements for an individual todo

const generateToDoDOM = function(todo){
      const todoEl = document.createElement('label')
      const containerEl = document.createElement('div')
      const checkbox = document.createElement('input')
      const todoText = document.createElement('span')
      const removeButton = document.createElement('button')


      //Setup todo checkbox
      checkbox.setAttribute('type', 'checkbox')
      checkbox.checked = todo.isCompleted
      containerEl.appendChild(checkbox)
      checkbox.addEventListener('change', () => {
            toggleTodo(todo.id)
            saveToDo(todos)
            renderTodos(todos, filters)
      })

      //Setup the todo text
      todoText.textContent = todo.text
      containerEl.appendChild(todoText)

      //Setup container
      todoEl.classList.add('list-item')
      containerEl.classList.add('list-item__container')
      todoEl.appendChild(containerEl)

      //Setup the remove button
      removeButton.textContent = 'Remove'
      removeButton.classList.add('button', 'button--text')
      todoEl.appendChild(removeButton)
      removeButton.addEventListener('click', () => {
          removeTodo(todo.id)
          saveToDo(todos)
          renderTodos(todos, filters)
      })

      

      return todoEl
}

//Get the DOM elements for list summary

const generateSummaryDOM = (inCompleteTodos) => {
    const summary = document.createElement('h2')
    const plural = inCompleteTodos.length === 1 ? '' : 's'
    summary.textContent = `You have ${inCompleteTodos.length} todo${plural} left.`
    summary.classList.add('list-title')
    return summary
}