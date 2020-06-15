import uuidv4 from 'uuid';

let todos = [];

//Loads stored todos array from localStorage.
const loadTodos = () => {
  const data = localStorage.getItem('todos');
  try {
    todos = data ? JSON.parse(data) : [];
  } catch (e) {
    todos = [];
  }
};

//Saves todos array to localStorage.
const saveTodos = () => {
  localStorage.setItem('todos', JSON.stringify(todos));
};

//Exposes todos array to the module.
const getTodos = () => todos;

const createTodo = (text) => {
  todos.push({
    id: uuidv4(),
    text,
    completed: false
  });
  saveTodos();
};


//Removes a todo from the todos array by cross-checking the todo
//id.
const removeTodo = (id) => {
  const todoIndex = getTodos().findIndex((todo) => todo.id === id);

  if (todoIndex > -1) {
    getTodos().splice(todoIndex, 1);
    saveTodos();
  }
};

//Toggles a todo item completed property between True or False.
const toggleTodo = (id) => {
  const findMatch = todos.find((todo) => todo.id === id);

  if (findMatch) {
    findMatch.completed = !findMatch.completed;
  }
  saveTodos();
};

loadTodos();

export { getTodos, loadTodos, removeTodo, toggleTodo, createTodo, saveTodos };