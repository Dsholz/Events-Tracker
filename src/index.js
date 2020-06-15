import { setFilters } from './filters';
import { createTodo, loadTodos } from './todos';
import { renderTodos } from './views';

renderTodos();

document.querySelector('#search-text').addEventListener('input', (e) => {
  setFilters({
    searchText: e.target.value
  });
  renderTodos();
});

document.querySelector('#hide').addEventListener('change', (e) => {
  setFilters({
    hideCompleted: e.target.checked
  });
  renderTodos();
});

document.querySelector('#new-todo').addEventListener('submit', (e) => {
  e.preventDefault();
  const todoTitle = e.target.elements[0].value.trim();

  if (todoTitle.length > 0) {
    createTodo(todoTitle);
    renderTodos();
    e.target.elements.todoText.value = '';
  }
});

window.addEventListener('storage', (e) => {
  if (e.key === 'todos') {
    loadTodos();
    renderTodos();
  }
});