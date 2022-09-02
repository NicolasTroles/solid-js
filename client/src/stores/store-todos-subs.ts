// With this query, I'm subscribing to the request and all the changes

import { createSignal } from "solid-js";

import { pipe, subscribe } from "wonka";

import { client } from "./store-todos";

interface Todo {
  id: string;
  text: string;
  done: boolean;
}

export const [todosSubscription, setTodosSubscription] = createSignal<Todo[]>(
  []
);

const query = `
    query {
        getTodos {
          id
          done
          text
        }
    }
`;

const { unsubscribe } = pipe(
  client.query(query, {}),
  subscribe(({ data }) => {
    setTodosSubscription(data.getTodos);
  })
);
