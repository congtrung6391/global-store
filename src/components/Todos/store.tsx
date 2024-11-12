'use client';

import { createStore } from "@/store";
import { Todo } from "./types";

type TodoStore = {
  todoListData: Todo[];
  currentSelectedTodo: null | Todo;
};

const mockTodoList: Todo[] = [{
  id: '1',
  title: 'todo 1',
}, {
    id: '2',
    title: 'todo 2',
  }, {
    id: '3',
    title: 'todo 3',
  }]

export const todoStore = createStore<TodoStore>({ defaultValue: { todoListData: mockTodoList, currentSelectedTodo: null,  } })
