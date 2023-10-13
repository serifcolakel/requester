import Button from '@components/Button';
import useTodos from '@hooks/useTodos';
import CheckBox from '@components/CheckBox';

function App() {
  const { loading, todos, toggleTodo, removeTodo, updateTodoTitle } =
    useTodos();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <ul className="mt-4 grid lg:grid-cols-3 md:grid-cols-2 gap-y-2 h-[50vh] overflow-y-scroll border p-2 rounded-lg shadow-sm">
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
    </main>
  );
}

export default App;
