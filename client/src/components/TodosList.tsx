import { Component, createEffect, createSignal, For } from "solid-js";

import { addNewTodo, todos, updateDone } from "../stores/store-todos";
import { todosSubscription } from "../stores/store-todos-subs";

export const TodosList: Component = () => {
  const [text, setText] = createSignal("");

  const onAdd = async () => {
    await addNewTodo(text());
    setText("");
  };

  const handleClickDone = async (id: string, done: boolean) => {
    console.log(done);
    await updateDone(id, done);
  };

  createEffect(() => {
    console.log("todos", todos());
    console.log("todosSubscription", todosSubscription());
  });

  return (
    <div class="p-10">
      <div>
        <input
          class="shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="Add New Todo"
          value={text()}
          oninput={(ev) => setText(ev.currentTarget.value)}
        />
        <button
          class="bg-blue-500 ml-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={onAdd}
        >
          Add new TODO
        </button>
      </div>
      <div class="flex w-full justify-between">
        <div>
          <h2 class="text-3xl font-medium mt-2 title">
            Here it is making a refresh
          </h2>
          <For each={todos()}>
            {({ id, done, text }) => (
              <div class="p-5 flex">
                <input
                  type="checkbox"
                  checked={done}
                  onclick={() => handleClickDone(id, !done)}
                />
                <h3 class="ml-1 font-bold truncate w-full max-w-full">
                  {text}
                </h3>
              </div>
            )}
          </For>
        </div>
        <div>
          <h2 class=" text-3xl font-medium mt-2">
            Here it is making a subscription to the api
          </h2>
          <For each={todosSubscription()}>
            {({ id, done, text }) => (
              <div class="p-5 flex">
                <input
                  type="checkbox"
                  checked={done}
                  onclick={() => handleClickDone(id, !done)}
                />
                <h3 class="ml-1 font-bold truncate w-full max-w-full">
                  {text}
                </h3>
              </div>
            )}
          </For>
        </div>
      </div>
    </div>
  );
};
