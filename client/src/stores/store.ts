import { createResource, createSignal } from "solid-js";
import { createMutable } from "solid-js/store";
import type { Product } from "../types/product";

export const cart = createMutable({
  products: JSON.parse(window.localStorage.getItem("cart") || "[]"),
  get total() {
    return this.products.reduce(
      (total: number, product: Product) => total + product.price,
      0
    );
  },
  onAddToCart(product: Product) {
    this.products.push(product);
    window.localStorage.setItem("cart", JSON.stringify(this.products));
  },
  onClearCart() {
    this.products = [];
    window.localStorage.setItem("cart", JSON.stringify(this.products));
  },
});

// export const [cart, setCart] = createSignal<Product[]>([]);
// export const onAddToCart = (p: Product) => {
//   setCart(cart().concat(p));
// };
// export const onClearCart = () => setCart([]);

export const [search, setSearch] = createSignal("");
export const onSetSearch = (s: string) => setSearch(s);

export const [products] = createResource<Product[]>(
  () => fetch("http://fakestoreapi.com/products").then((res) => res.json()),
  { initialValue: [] }
);
