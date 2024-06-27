import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Eşyalarım from "./components/Eşyalarım";
import Alışveriş from "./components/Alışveriş";
import Signin from "./components/Signin";
import Register from "./components/Register";
import Profil from "./components/Profil";
import Sepet from "./components/Sepet";
import SatınAl from "./components/SatınAl";
import Home from "./components/Home";
import "./App.css";

function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const addToCart = (item) => {
    if (!cartItems.find((cartItem) => cartItem.id === item.id)) {
      setCartItems([...cartItems, item]);
      setTotalPrice(totalPrice + item.price);
    }
  };

  const removeFromCart = (itemToRemove) => {
    const newCartItems = cartItems.filter((item) => item !== itemToRemove);
    setCartItems(newCartItems);
    setTotalPrice(totalPrice - itemToRemove.price);
  };

  const clearCart = () => {
    setCartItems([]);
    setTotalPrice(0);
  };

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Navigate to="/signin" replace />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/register" element={<Register />} />
        <Route path="/Home" element={<Home />} />
        <Route
          path="/eşyalarım"
          element={<Eşyalarım setItemsExternal={setItems} />}
        />
        <Route
          path="/alışveriş"
          element={<Alışveriş items={items} addToCart={addToCart} />}
        />
        <Route path="profil" element={<Profil />} />
        <Route
          path="/sepet"
          element={
            <Sepet
              cartItems={cartItems}
              removeFromCart={removeFromCart}
              totalPrice={totalPrice}
            />
          }
        />

        <Route path="/satınal" element={<SatınAl totalPrice={totalPrice} />} />
      </Routes>
    </div>
  );
}

export default App;