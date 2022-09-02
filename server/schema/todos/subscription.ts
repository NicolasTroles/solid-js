import { todos } from "./data";
import { TODOS_CHANNEL } from "./data";

export const TodosSubscription = {
  todos: {
    subscribe: (parent: unknown, args: {}, context: any) => {
      const iterator = context.pubSub.subscribe(TODOS_CHANNEL);
      context.pubSub.publish(TODOS_CHANNEL, { todos });
      return iterator;
    },
  },
};
