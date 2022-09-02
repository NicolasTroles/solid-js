import { TODOS_CHANNEL } from "./data";
import { todos } from "./data";

export const TodosMutation = {
  addTodo: (_: unknown, { text }: { text: string }, context: any) => {
    const newTodo = {
      id: String(todos.length + 1),
      text,
      done: false,
    };
    todos.push(newTodo);
    context.pubSub.publish(TODOS_CHANNEL, { todos });
    return newTodo;
  },
  setDone: (
    _: unknown,
    { id, done }: { id: string; done: boolean },
    context: any
  ) => {
    const todo = todos.find((todo) => todo.id === id);
    if (!todo) {
      throw new Error("Todo not found!");
    }
    todo.done = done;
    context.pubSub.publish(TODOS_CHANNEL, { todos });
    return todo;
  },
};
