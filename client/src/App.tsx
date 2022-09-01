import { Component } from "solid-js";
import { Routes, Route } from "solid-app-router";

import { Header } from "./components/Header";
import { HomePage } from "./components/HomePage";
import { ProductDetail } from "./components/ProductDetail";
import { TodosList } from "./components/TodosList";

const App: Component = () => {
  return (
    <div class="black">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/detail/:id" element={<ProductDetail />} />
        <Route path="/todos" element={<TodosList />} />
      </Routes>
    </div>
  );
};

export default App;
