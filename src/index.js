import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ProductProvider } from "./contexts/ProductContext";
import { SidebarProvider } from "./contexts/SidebarContext";
import { CartProvider } from "./contexts/CartContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { FirebaseProvider } from "./contexts/FirebaseContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <FirebaseProvider>
        <ProductProvider>
          <SidebarProvider>
            <CartProvider>
              <Header />
              <App />
              <Footer />
            </CartProvider>
          </SidebarProvider>
        </ProductProvider>
      </FirebaseProvider>
    </BrowserRouter>
  </React.StrictMode>
);
