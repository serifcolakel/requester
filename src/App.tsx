/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable max-len */
import Button from '@components/Button';
import useTodos from './useTodos';
import CheckBox from './components/CheckBox';

function App() {
  const { loading, todos, toggleTodo, removeTodo, updateTodoTitle } =
    useTodos();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h1 className="text-4xl text-red-600">Todo List</h1>
      <ul className="grid grid-cols-3 gap-y-2 h-[50vh] overflow-y-scroll">
        {todos.map((todo) => (
          <li
            className="flex flex-row items-center justify-center gap-x-4"
            key={todo.id}
          >
            <input
              className="h-8 border-2 border-gray-400 rounded-md"
              onChange={(e) => updateTodoTitle(todo.id, e.target.value)}
              type="text"
              value={todo.title}
            />
            <CheckBox
              checked={todo.completed}
              intent="danger"
              onChange={toggleTodo(todo.id)}
              rounded="sm"
              value={todo.id}
            />
            <Button buttonType="error" onClick={removeTodo(todo.id)}>
              Delete
            </Button>
          </li>
        ))}
      </ul>
      <div className="relative">
        <input
          className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          id="floating_filled"
          placeholder=""
          type="text"
        />
        <label
          className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
          htmlFor="floating_filled"
        >
          Floating filled
        </label>
      </div>
    </>
  );
}

export default App;
