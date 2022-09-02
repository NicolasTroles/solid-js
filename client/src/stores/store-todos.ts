import { createResource } from "solid-js";
import { createClient } from "@urql/core";

import type { Todos } from "../types/todos";

export const client = createClient({
  url: "http://localhost:4000/graphql",
});

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
      console.log("refetch");
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
  client
    .mutation(mutationUpdateDone, { id, done })
    .toPromise()
    .then(() => {
      refetch();
    });
};
