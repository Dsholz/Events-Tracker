const filters = {
  searchText: '',
  hideCompleted: false
};

//Exposes filters object to the module
const getFilters = () => filters;

//Updates the filters object.
const setFilters = ({ searchText, hideCompleted }) => {
  if (typeof searchText === 'string') {
    filters.searchText = searchText;
  }
  if (typeof hideCompleted === 'boolean') {
    filters.hideCompleted = hideCompleted;
  }
};

// Make sure to set up the exports
export { getFilters, setFilters };