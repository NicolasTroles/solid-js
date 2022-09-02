import { createPubSub } from "@graphql-yoga/subscription";

import type { Todo } from "./index";

// 1
export type PubSubChannels = {
  todos: [{ todos: Todo[] }];
};

// 2
export const pubSub = createPubSub<PubSubChannels>();
