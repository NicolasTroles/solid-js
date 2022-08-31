import { Component } from "solid-js";
import { Routes, Route } from "solid-app-router";

import { Header } from "./components/Header";
import { HomePage } from "./components/HomePage";
import { ProductDetail } from "./components/ProductDetail";

import type { Product } from "./product";

import styles from "./App.module.css";

const App: Component = () => {
  return (
    <div class="black">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/detail/:id" element={<ProductDetail />} />
      </Routes>
    </div>
  );
};

export default App;
