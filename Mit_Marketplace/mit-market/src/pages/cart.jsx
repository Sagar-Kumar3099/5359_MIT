import React, { useState, useEffect } from 'react';
import { useCart } from '../contexts/cartContext';
import Chatbot from '../components/chatBot';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/footer';

function Cart() {
    const { cart, removeFromCart, updateCartQuantity } = useCart();
    const [quantities, setQuantities] = useState({});
    const navigate = useNavigate();

    
    useEffect(() => {
        const initialQuantities = cart.reduce(
            (acc, item) => ({ ...acc, [item.id]: item.quantity || 1 }),
            {}
        );
        setQuantities(initialQuantities);
    }, [cart]);

    
    const totalPrice = cart.reduce(
        (acc, item) => acc + (item.price * (quantities[item.id] || 1)),
        0
    );
    const totalItems = cart.reduce(
        (acc, item) => acc + (quantities[item.id] || 1),
        0
    );

    
    const handleQuantityChange = (itemId, newQuantity) => {
        if (newQuantity === "" || newQuantity < 1) {
            newQuantity = 1;
        }
        setQuantities((prevQuantities) => {
            const updatedQuantities = { ...prevQuantities, [itemId]: newQuantity };
            updateCartQuantity(itemId, newQuantity); 
            return updatedQuantities;
        });
    };


    const incrementQuantity = (itemId) => {
        setQuantities((prevQuantities) => {
            const newQuantity = (prevQuantities[itemId] || 1) + 1;
            handleQuantityChange(itemId, newQuantity);
            return { ...prevQuantities, [itemId]: newQuantity };
        });
    };


    const decrementQuantity = (itemId) => {
        setQuantities((prevQuantities) => {
            const newQuantity = (prevQuantities[itemId] || 1) - 1;
            if (newQuantity >= 1) {
                handleQuantityChange(itemId, newQuantity);
                return { ...prevQuantities, [itemId]: newQuantity };
            }
            return prevQuantities;
        });
    };

    return (
        <>
        <div className="bg-[url('/texture-2.webp')] bg-cover bg-center min-h-screen">
        <div className="max-w-7xl  mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl font-bold text-gray-200 mb-8">Your Cart</h1>

            {cart.length === 0 ? (
                <p className="text-gray-100 h-[250px]">Your cart is empty.</p>
            ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-1 lg:grid-cols-2 mb-6">
                     
                    <div className="grid grid-cols-1 gap-6">
                        {cart.map((item) => (
                            <div key={item.id} className="bg-gray-200 rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row">
                            
                                <div className="w-full md:w-1/3 p-4">
                                    <img
                                        src={item.imageUrl}
                                        alt={item.name}
                                        className="w-full h-37 object-cover rounded-md"
                                    />
                                </div>

                            
                                <div className="flex-1 p-4">
                                    <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                                    <p className="mt-1 text-sm text-gray-500">{item.category}</p>
                                    <p className="mt-2 text-gray-600">{item.description}</p>

                                    <div className="mt-4 flex justify-between items-center">
                                        <div className="flex items-center">
                                            <button
                                                onClick={() => decrementQuantity(item.id)}
                                                className="p-2 bg-gray-200 text-gray-700 rounded-l-md"
                                            >
                                                -
                                            </button>
                                            <input
                                                type="number"
                                                id={`quantity-${item.id}`}
                                                value={quantities[item.id] || 1}
                                                min="1"
                                                onChange={(e) => {
                                                    const newQuantity = parseInt(e.target.value, 10);
                                                    if (!isNaN(newQuantity) && newQuantity >= 1) {
                                                        handleQuantityChange(item.id, newQuantity);
                                                    } else {
                                                        handleQuantityChange(item.id, 0);
                                                    }
                                                }}
                                                className="w-16 p-2 border-t border-b border-gray-300 text-center"
                                            />
                                            <button
                                                onClick={() => incrementQuantity(item.id)}
                                                className="p-2 bg-gray-200 text-gray-700 rounded-r-md"
                                            >
                                                +
                                            </button>
                                        </div>

                                        <span className="text-lg font-bold text-indigo-600">
                                            ₹ {((item.price * (quantities[item.id] || 1)).toFixed(2))}
                                        </span>

                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="text-red-600 hover:text-red-700"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                
                    <div className="bg-gray-200 p-6 rounded-lg shadow-lg">
                        <div className="flex flex-col bg-gray-100 p-4 rounded-lg mt-6 transition-transform duration-300 hover:scale-105">
                            <div className="mb-4">
                                <p className="text-lg font-semibold text-gray-800 transition-colors duration-300 hover:text-indigo-600">
                                    Items: {totalItems}
                                </p>
                            </div>

                            <div className="mb-4">
                                {cart.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex justify-between p-2 text-gray-800 transition-opacity duration-300 hover:opacity-80"
                                    >
                                        <span>
                                            {item.name} x {quantities[item.id] || 1}
                                        </span>
                                        <span>₹ {((item.price * (quantities[item.id] || 1)).toFixed(2))}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="flex justify-between text-xl font-semibold text-gray-900">
                                <p>Total:</p>
                                <p>₹ {totalPrice.toFixed(2)}</p>
                            </div>
                            <div className="mt-6 flex justify-center">
                                <button
                                    onClick={() => navigate("/payment")}
                                    className="bg-indigo-600 text-white px-6 py-3 rounded-lg transition-all duration-300 hover:bg-indigo-700 hover:scale-110 active:scale-95"
                                >
                                    Checkout
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            )}
        <Chatbot/>
        </div>
        </div>
        <Footer/>
        </>
    );
}

export default Cart;
