import { pubSub } from "./pubsub";
import { createServer, createPubSub } from "graphql-yoga";

const TODOS_CHANNEL = "TODOS_CHANNEL";

export interface Todo {
  id: string;
  text: string;
  done: boolean;
}

let todos = [
  {
    id: "1",
    text: "Learn GraphQL + Solidjs",
    done: false,
  },
];

const typeDefs = `
    type Todo {
        id: ID!
        done: Boolean!
        text: String!
    }
    type Query {
        getTodos: [Todo]!
    }
    type Mutation { 
      addTodo(text: String!): Todo
      setDone(id: ID!, done: Boolean!): Todo
    }
    type Subscription {
      todos: [Todo]!
    }
`;

const resolvers = {
  Query: {
    getTodos: () => {
      return todos;
    },
  },
  Mutation: {
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
  },
  Subscription: {
    todos: {
      subscribe: (parent: unknown, args: {}, context: any) => {
        const iterator = context.pubSub.subscribe(TODOS_CHANNEL);
        context.pubSub.publish(TODOS_CHANNEL, { todos });
        return iterator;
      },
    },
  },
};

const server = createServer({
  schema: {
    typeDefs: typeDefs,
    resolvers: resolvers,
  },
  context: {
    pubSub,
  },
});

server.start();
