import { Component, createSignal, For } from "solid-js";

import { addNewTodo, todos, updateDone } from "../stores/store-todos";

export const TodosList: Component = () => {
  const [text, setText] = createSignal("");

  const onAdd = async () => {
    await addNewTodo(text());
    setText("");
  };

  const onDone = async (id: string, done: boolean) => {
    await updateDone(id, done);
  };

  return (
    <>
      <For each={todos()}>
        {({ id, done, text }) => (
          <div class="p-10">
            <input
              type="checkbox"
              checked={done}
              onclick={() => onDone(id, !done)}
            />
            <h3 class="title font-bold text-3xl truncate w-full max-w-full mb-2">
              {text}
            </h3>
          </div>
        )}
      </For>
      <div>
        <input
          class="border-red-300 border-2"
          type="text"
          value={text()}
          oninput={(ev) => setText(ev.currentTarget.value)}
        />
        <button onClick={onAdd}>Add new TODO</button>
      </div>
    </>
  );
};
