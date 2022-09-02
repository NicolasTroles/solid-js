import { createPubSub } from "@graphql-yoga/subscription";

import type { Todo } from "../../types/todo";

export type PubSubChannels = {
  todos: [{ todos: Todo[] }];
};

export const pubSub = createPubSub<PubSubChannels>();
