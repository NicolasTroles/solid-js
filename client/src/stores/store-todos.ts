import { createResource, createSignal } from "solid-js";
import {
  createClient,
  defaultExchanges,
  subscriptionExchange,
} from "@urql/core";
import type { Todos } from "../types/todos";

import { SubscriptionClient } from "subscriptions-transport-ws";
import { pipe, subscribe } from "wonka";

const subscriptionClient = new SubscriptionClient("ws://localhost:4000", {
  reconnect: true,
});

export const client = createClient({
  url: "http://0.0.0.0:4000/graphql",
  exchanges: [
    ...defaultExchanges,
    subscriptionExchange({
      forwardSubscription: (operation) => subscriptionClient.request(operation),
    }),
  ],
});

// interface Todo {
//   id: string;
//   text: string;
//   done: boolean;
// }

// const [todos, setTodos] = createSignal<Todo[]>([]);

const query = `
    query {
        getTodos {
        id
        done
        text
        }
    }
`;

export const [todos, { refetch }] = createResource<Todos[]>(
  () =>
    client
      .query(query, {
        /* vars */
      })
      .toPromise()
      .then(({ data }) => data.getTodos),
  {
    initialValue: [],
  }
);

const mutationNewTodo = `
  mutation($text: String!) {
    addTodo(text: $text) {
      id
    }
  }
`;

export const addNewTodo = async (text: string) => {
  client
    .mutation(mutationNewTodo, { text })
    .toPromise()
    .then(() => {
      refetch();
    });
};

const mutationUpdateDone = `
  mutation($id: ID!, $done: Boolean!) {
    setDone(id: $id, done: $done) {
      id
    }
  }
`;

export const updateDone = async (id: string, done: boolean) => {
  client.mutation(mutationUpdateDone, { id, done }).toPromise();
};
