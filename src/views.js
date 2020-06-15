import { getFilters } from './filters';
import { getTodos, removeTodo, toggleTodo } from './todos';

const renderTodos = () => {
  const todoList = document.querySelector('#todos');
  const { searchText, hideCompleted } = getFilters();
  const filteredTodos = getTodos().filter((element) => {
    const searchTextMatch = element.text.toLowerCase().includes(searchText.toLowerCase());
    const hideCompletedMatch = !hideCompleted || !element.completed;
    return searchTextMatch && hideCompletedMatch;
  });

  const incompleteTodos = filteredTodos.filter(todo => !todo.completed);

  todoList.innerHTML = '';
  todoList.appendChild(generateSummaryDOM(incompleteTodos));

  if (filteredTodos.length > 0) {
    filteredTodos.forEach(element => {
      todoList.appendChild(generateTodoDOM(element));
    });
  } else {
    const message = document.createElement('p');
    message.classList.add('empty-message');
    message.textContent = 'No To-Do to Show';
    todoList.appendChild(message);
  }
};

const generateTodoDOM = (element) => {
  //Create Container To Append ToDo Items.
  const list = document.createElement('label');
  const container = document.createElement('div');
  const listText = document.createElement('span');
  const listInput = document.createElement('input');
  const listBtn = document.createElement('button');

  listInput.setAttribute('type', 'checkbox');
  listInput.checked = element.completed;
  container.appendChild(listInput);
  listInput.addEventListener('change', (e) => {
    toggleTodo(element.id);
    renderTodos();
  });

  list.classList.add('list-item');
  container.classList.add('list-item__container');
  list.appendChild(container);

  listText.textContent = element.text;
  container.appendChild(listText);

  listBtn.textContent = 'Remove';
  listBtn.classList.add('button', 'button--text');
  listBtn.addEventListener('click', () => {
    removeTodo(element.id);
    renderTodos();
  });
  list.appendChild(listBtn);


  return list;
};

const generateSummaryDOM = (incompletedTodos) => {
  const message = document.createElement('h1');
  const todoSize = getTodos().length;
  message.classList.add('list-title');
  message.textContent = `You have ${incompletedTodos.length} ${(todoSize !== 1 || todoSize === 0) ? 'todos' : 'todo'} left!`;
  return message;
};

export { renderTodos, generateSummaryDOM, generateTodoDOM };