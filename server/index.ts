import { pubSub } from "./schema/todos/pubsub";
import { createServer } from "graphql-yoga";

import {
  TodosTypes,
  TodosQuery,
  TodosMutation,
  TodosSubscription,
} from "./schema/todos";

import { PersonQuery, PersonResolvers, PersonTypes } from "./schema/person";

const typeDefs = `${TodosTypes}${PersonTypes}`;

const resolvers = {
  Query: {
    ...TodosQuery,
    ...PersonQuery,
  },
  Mutation: {
    ...TodosMutation,
  },
  Subscription: {
    ...TodosSubscription,
  },
  ...PersonResolvers,
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
