import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase";
import { ref, get } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";
import { useParams } from "react-router-dom";
import Footer from "../components/footer";

const OrderPage = () => {
    const [userId, setUserId] = useState(null);
    const [orderDetails, setOrderDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const { orderId } = useParams(); 

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserId(user.uid);
            } else {
                setUserId(null);
            }
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (userId && orderId) {
            
            const orderRef = ref(db, `users/${userId}/payments/${orderId}`);
            get(orderRef).then((snapshot) => {
                if (snapshot.exists()) {
                    setOrderDetails(snapshot.val());
                } else {
                    alert("Order not found!");
                }
                setLoading(false);
            }).catch((error) => {
                console.error("Error fetching order details:", error);
                setLoading(false);
            });
        }
    }, [userId, orderId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!orderDetails) {
        return <div>Order details not found!</div>;
    }

    const { paymentDetails, cart, status } = orderDetails;

    return (
        <>
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
            <div className="max-w-4xl w-full bg-white shadow-md rounded-lg overflow-hidden">
                <div className="p-6">
                    <h2 className="text-lg font-bold mb-4">Order Details</h2>

                    {/* Payment Details Block */}
                    <div className="bg-gray-50 p-4 rounded-md shadow-inner mb-6">
                        <h3 className="text-lg font-bold mb-2">Payment Information</h3>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span className="font-semibold">Name:</span>
                                <span>{paymentDetails.name}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-semibold">Address:</span>
                                <span>{paymentDetails.address}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-semibold">City:</span>
                                <span>{paymentDetails.city}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-semibold">State:</span>
                                <span>{paymentDetails.state}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-semibold">Postal Code:</span>
                                <span>{paymentDetails.postalCode}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-semibold">Total Price:</span>
                                <span>₹ {paymentDetails.totalPrice}</span>
                            </div>
                        </div>
                    </div>

                    
                    <div className="mb-6">
                        <h3 className="text-lg font-bold">Order Status</h3>
                        <div className="text-sm font-medium text-gray-700">
                            Status:{" "}
                            <span className="font-semibold">{status || "Not processed"}</span>
                        </div>
                    </div>

                    
                    <div className="bg-gray-50 p-4 rounded-md shadow-inner">
                        <h3 className="text-lg font-bold mb-4">Cart Items</h3>
                        <ul className="space-y-4">
                            {cart.map((item, index) => (
                                <li key={index} className="flex space-x-4">
                                    <img
                                        src={item.imageUrl}
                                        alt={item.name}
                                        className="w-24 h-24 object-cover rounded-md"
                                    />
                                    <div className="flex-1">
                                        <div className="text-lg font-semibold">{item.name}</div>
                                        <div className="text-sm text-gray-600">₹ {item.price}</div>
                                        <div className="text-sm text-gray-600">Quantity: {item.quantity || 1}</div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <Footer/>
        </>
    );
};

export default OrderPage;
