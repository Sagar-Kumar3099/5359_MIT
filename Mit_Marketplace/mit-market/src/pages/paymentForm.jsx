import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase";
import { ref, set } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";
import { useCart } from "../contexts/cartContext";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";

Modal.setAppElement("#root");

const PaymentForm = () => {
    const { cart, emptyCart } = useCart();
    const [formData, setFormData] = useState({
        name: "",
        address: "",
        city: "",
        state: "",
        postalCode: "",
        cardNumber: "",
        expiryDate: "",
        cvv: "",
    });
    const [userId, setUserId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        //  currently logged-in user's ID
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserId(user.uid);
            } else {
                setUserId(null);
            }
        });

        return () => unsubscribe();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!userId) {
            alert("You must be logged in to make a payment.");
            return;
        }

        if (cart.length === 0) {
            alert("Your cart is empty. Add items before making a payment.");
            return;
        }


        const totalPrice = cart.reduce(
            (acc, item) => acc + (item.price * (item.quantity || 1)),
            0
        );

        try {
            const paymentRef = ref(db, `users/${userId}/payments`);
            const paymentId = `${Date.now()}`;


            await set(ref(db, `users/${userId}/payments/${paymentId}`), {
                paymentDetails: {
                    address: formData.address,
                    cardNumber: formData.cardNumber,
                    city: formData.city,
                    cvv: formData.cvv,
                    expiryDate: formData.expiryDate,
                    name: formData.name,
                    postalCode: formData.postalCode,
                    state: formData.state,
                    timestamp: new Date().toISOString(),
                    totalPrice: totalPrice.toFixed(2),
                },
                cart: cart,
            });


            const cartRef = ref(db, `carts/${userId}`);
            await set(cartRef, []);


            emptyCart([])



            setIsModalOpen(true)
            setFormData({
                name: "",
                address: "",
                city: "",
                state: "",
                postalCode: "",
                cardNumber: "",
                expiryDate: "",
                cvv: "",
            });
        } catch (error) {
            console.error("Error processing payment:", error);
            alert("Payment failed. Please try again.");
        }
    };

    const totalPrice = cart.reduce(
        (acc, item) => acc + (item.price * (item.quantity || 1)),
        0
    );

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 bg-[url('/paytext-1.webp')]">
            <div className="max-w-4xl w-full bg-gray-300 shadow-md rounded-lg overflow-hidden">
                <div className="p-6 md:flex">

                    <div className="md:w-1/3 bg-gray-50 p-4 rounded-md shadow-inner">
                        <h2 className="text-lg font-bold mb-4">Order Summary</h2>
                        <ul className="space-y-2">
                            {cart.map((item, index) => (
                                <li key={index} className="flex justify-between text-sm">
                                    <span>
                                        {item.name} (x{item.quantity || 1})
                                    </span>
                                    <span>₹ {item.price * (item.quantity || 1)}</span>
                                </li>
                            ))}
                        </ul>
                        <hr className="my-4" />
                        <div className="flex justify-between text-lg font-semibold">
                            <span>Total</span>
                            <span>₹ {totalPrice.toFixed(2)}</span>
                        </div>
                    </div>


                    <form
                        onSubmit={handleSubmit}
                        className="md:w-2/3 md:pl-8 mt-6 md:mt-0"
                    >
                        <h2 className="text-lg font-bold mb-4">Payment Details</h2>
                        {/* Delivery Address */}
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Address
                                </label>
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        City
                                    </label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        required
                                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        State
                                    </label>
                                    <input
                                        type="text"
                                        name="state"
                                        value={formData.state}
                                        onChange={handleChange}
                                        required
                                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Postal Code
                                </label>
                                <input
                                    type="text"
                                    name="postalCode"
                                    value={formData.postalCode}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>
                        </div>


                        <h2 className="text-lg font-bold mt-8 mb-4">Card Details</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Card Number
                                </label>
                                <input
                                    type="text"
                                    name="cardNumber"
                                    value={formData.cardNumber}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="1234 5678 9012 3456"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Expiry Date
                                    </label>
                                    <input
                                        type="text"
                                        name="expiryDate"
                                        value={formData.expiryDate}
                                        onChange={handleChange}
                                        required
                                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                        placeholder="MM/YY"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        CVV
                                    </label>
                                    <input
                                        type="text"
                                        name="cvv"
                                        value={formData.cvv}
                                        onChange={handleChange}
                                        required
                                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                        placeholder="123"
                                    />
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full mt-6 bg-indigo-600 text-white py-2 px-4 rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            Pay ₹ {totalPrice.toFixed(2)}
                        </button>
                    </form>
                </div>
            </div>
            <Modal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                className="w-96 mx-auto mt-20 bg-white p-6 rounded-lg shadow-lg"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
            >
                <h2 className="text-lg font-bold mb-4">Payment Successful!</h2>
                <p>Your order has been placed successfully.</p>
                <button
                    onClick={() => {
                        navigate("/")
                        setIsModalOpen(false)
                    }}
                    className="mt-4 bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition duration-200"
                >
                    Close
                </button>
            </Modal>
        </div>
    );
};

export default PaymentForm;
