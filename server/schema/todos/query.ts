import { todos } from "./data";

export const TodosQuery = {
  getTodos: () => {
    return todos;
  },
  getTodo: (_: unknown, { id }: { id: string }) => {
    return todos.find((todo) => todo.id === id);
  },
};
