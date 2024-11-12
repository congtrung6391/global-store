import { useStore } from "@/store";
import { Todo } from "./types";
import { todoStore } from "./store";

const TodoListItem = ({ data }: { data: Todo }) => {
  const [store, setStore] = useStore(todoStore);

  return (
    <div style={{ border: '1px solid black', margin: '4px' }}>
      <h5>{data.title}</h5>
      {store.currentSelectedTodo?.id === data.id ? <p>this item is selected</p> : null}
      <button onClick={() => setStore({ currentSelectedTodo: data })}>select</button>
    </div>
  )

}

export default TodoListItem
