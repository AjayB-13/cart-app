import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cartItems, increaseQty, decreaseQty, removeFromCart } = useCart();

  const getTotal = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const total = getTotal();
  const discount = total * 0.1;
  const finalPrice = total - discount;

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="sticky top-0 z-50 bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">🛒 OnlineStore</h1>
        <div className="space-x-4">
          <Link to="/" className="text-blue-600 hover:underline">Products</Link>
          <Link to="/cart" className="text-blue-600 hover:underline">Cart</Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow mt-4">
        <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-4"
              >
                <div className="flex items-center space-x-4">
                  <img src={item.image} alt={item.title} className="w-16 h-16 object-contain" />
                  <div>
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="text-sm text-gray-600">₹{item.price*80}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <button
                        onClick={() => decreaseQty(item.id)}
                        className="bg-gray-300 px-2 rounded hover:bg-gray-400"
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => increaseQty(item.id)}
                        className="bg-gray-300 px-2 rounded hover:bg-gray-400"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <div className="mt-2 sm:mt-0 text-right">
                  <p className="font-bold">Total: ₹{Math.round(item.price *85* item.quantity)}</p>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="mt-2 text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            <div className="text-right pt-4 border-t mt-4">
              <p className="font-semibold">Subtotal: ₹{85*total}</p>
              <p className="text-green-600">Discount (10%): -₹{Math.round(85*discount)}</p>
              <p className="text-xl font-bold">Final Price: ₹{Math.round(85*finalPrice)}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
