import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

let count = 0;

const minus = document.getElementById("minus");
const plus = document.getElementById("plus");
const counter = document.querySelector("span") as HTMLSpanElement;

const update = () => {
  counter.innerText = String(count);
};

const handleMinus = () => {
  count--;
  update();
};

const handlePlus = () => {
  count++;
  update();
};

minus?.addEventListener("click", handleMinus);
plus?.addEventListener("click", handlePlus);
