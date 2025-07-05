import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Products() {
  const [products, setProducts] = useState([]);
  const { cartItems, addToCart, removeFromCart } = useCart();

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const isInCart = (id) => cartItems.some((item) => item.id === id);

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="sticky top-0 z-50 bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">🛒 OnlineStore</h1>
        <div className="space-x-4">
          <Link to="/" className="text-blue-600 hover:underline">Products</Link>
          <Link to="/cart" className="text-blue-600 hover:underline">Cart</Link>
        </div>
      </nav>

      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white shadow p-4 rounded-xl flex flex-col">
            <img src={product.image} alt={product.title} className="h-40 object-contain mb-2" />
            <h2 className="font-semibold text-lg mb-1">{product.title}</h2>
            <p className="text-sm text-gray-600 mb-2 line-clamp-2">{product.description}</p>
            <p className="font-bold text-blue-600 mb-2">₹{Math.round(product.price*80)}</p>
            {isInCart(product.id) ? (
              <button
                onClick={() => removeFromCart(product.id)}
                className="mt-auto bg-red-500 text-white py-1 rounded hover:bg-red-600"
              >
                Remove from Cart
              </button>
            ) : (
              <button
                onClick={() => addToCart(product)}
                className="mt-auto bg-green-500 text-white py-1 rounded hover:bg-green-600"
              >
                Add to Cart
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
