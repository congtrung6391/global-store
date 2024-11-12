import { useStore } from "@/store"
import { todoStore } from "./store"
import TodoListItem from "./TodoListItem";

const TodoList = () => {
  const [todoList] = useStore(todoStore);

  return (
    <div>
      {todoList.todoListData.map(item => (
        <TodoListItem key={item.id} data={item} />
      ))}
    </div>
  )
};

export default TodoList;
