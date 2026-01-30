import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { GoPackage } from "react-icons/go";
import { FaMapMarkerAlt } from "react-icons/fa";
import OrderConfirm from "./OrderConfirm";

const Checkout = () => {
  const { cartTotal, clearCart, cart } = useContext(CartContext);
  const [isConfirm, setisConfirm] = useState(false);

  const [deliveryDetails, setdeliveryDetails] = useState({
    name: "",
    address: "",
    city: "",
    zip: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(name, value);
    setdeliveryDetails((prev) => ({ ...prev, [name]: value }));
    console.log(deliveryDetails);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    clearCart();
    setisConfirm(true);
  };

  if (isConfirm) {
    return <OrderConfirm deliveryDetails={deliveryDetails} />;
  }

  return (
    <div className="container mx-auto px-4 md:px-8 pt-8">
      <h2 className="text-5xl font-extrabold text-white mb-10 tracking-tight">
        Finalize Order
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 p-8 bg-gray-900 rounded-2xl shadow-2xl border border-gray-800">
          <h3 className="text-3xl font-bold text-orange-400 mb-6 flex items-center space-x-3 border-b border-gray-700 pb-4">
            <FaMapMarkerAlt className="w-7 h-7 text-orange-500" />
            <span>Shipping Information</span>
          </h3>
          <form className="space-y-6" onSubmit={handleSubmit}>
            {Object.keys(deliveryDetails).map((item) => {
              return (
                <div key={item}>
                  <label
                    htmlFor={item}
                    className="block text-sm font-semibold text-gray-300 capitalize mb-1"
                  >
                    {item === "zip" ? "Pin Code" : item}
                  </label>
                  <input
                    type={item === "zip" ? "number" : "text"}
                    id={item}
                    name={item}
                    value={deliveryDetails[item]}
                    required
                    onChange={handleChange}
                    className="mt-1 block w-full px-5 py-3 border border-gray-700 rounded-xl shadow-inner text-white bg-gray-800 placeholder-gray-500"
                  />
                </div>
              );
            })}
            <button
              type="submit"
              className="w-full py-4 bg-orange-600 text-white font-extrabold text-xl rounded-full shadow-lg shadow-orange-800/50 cursor-pointer hover:bg-orange-700 transition duration-300 flex items-center justify-center space-x-2 transform hover:ring-4 hover:ring-pink-600/50 uppercase tracking-wider"
            >
              <span>₹ Pay and Confirm Order (₹{cartTotal.toFixed(2)})</span>
            </button>
          </form>
        </div>

        {/* Order Summary in Checkout */}
        <div className="lg:col-span-1 p-8 bg-gray-900 rounded-2xl shadow-2xl border-1-4 sticky top-20 h-fit border border-gray-800">
          <h3 className="text-3xl font-bold text-white mb-5 border-b border-y-gray-700 pb-3 flex items-center space-x-2">
            <GoPackage className="w-6 h-6 text-orange-400" />
            <span>Summary</span>
          </h3>
          <div className="space-y-4 text-gray-400">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between text-base border-b border-gray-800 pb-2"
              >
                <span className="trucate text-gray-300">{item.name}</span>
                <span className="font-medium text-orange-300">
                  ₹{(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
            <div className="space-y-4 text-gray-400">
              <div className="flex justify-between text-xl">
                <span>SubTotal :</span>
                <span className="font-semibold text-white">
                  ₹{cartTotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-xl">
                <span>Shipping (Express):</span>
                <span className="font-semibold text-green-400">Free</span>
              </div>
              <div className="flex justify-between pt-6 border-t border-gray-700">
                <span className="text-2xl font-extrabold text-white">
                  Total Due:
                </span>
                <span className="text-3xl font-extrabold text-orange-400">
                  ₹{cartTotal.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
