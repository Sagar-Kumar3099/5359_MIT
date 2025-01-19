import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext'; 
import { db } from '../firebase';
import { ref, get } from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/footer';

const OrdersPage = () => {
  const { currentUser } = useAuth(); 
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    if (currentUser) {
      const fetchOrders = async () => {
        const ordersRef = ref(db, `users/${currentUser.uid}/payments`);
        const snapshot = await get(ordersRef);
        if (snapshot.exists()) {
          const fetchedOrders = Object.entries(snapshot.val()).map(([orderId, data]) => ({
            orderId: orderId,
            ...data.paymentDetails, 
            status: data.status,
            cart: data.cart, 
          }));
          setOrders(fetchedOrders);
        } else {
          setOrders([]);
        }
      };

      fetchOrders();
    }
  }, [currentUser]);

  
  const handleOrderClick = (orderId) => {
    navigate(`/order/${orderId}`);
  };

  return (
    <>
    <div className="min-h-screen bg-gray-100 p-4 bg-[url('/paytext-1.webp')]">
      <h1 className="text-2xl font-bold text-center text-white mb-6">Your Orders</h1>
      <div className="max-w-4xl mx-auto bg-gray-300 shadow-md rounded-lg">
        {orders.length > 0 ? (
          <div>
            {orders.map((order) => (
              <div
                key={order.orderId}
                onClick={() => handleOrderClick(order.orderId)}
                className="p-4 border-b cursor-pointer hover:bg-gray-50"
              >
                <div className="flex justify-between items-center">
                  <div className="text-lg font-semibold">Order ID: {order.orderId}</div>
                  <div className="text-sm text-gray-500">Status: {order.status || "Pending"}</div>
                </div>

                <div className="text-gray-700">Total Price: ₹ {parseFloat(order.totalPrice).toFixed(2)}</div>

            
                <div className="mt-4">
                  {order.cart && order.cart.length > 0 ? (
                    order.cart.map((item, index) => (
                      <div key={index} className="flex items-center space-x-4 mb-4">
                        <img 
                          src={item.imageUrl} 
                          alt={item.name} 
                          className="w-20 h-20 object-cover rounded-md" 
                        />
                        <div>
                          <div className="font-semibold">{item.name}</div>
                          <div className="text-sm text-gray-600">{item.description}</div>
                          <div className="text-gray-500">₹ {parseFloat(item.price).toFixed(2)}</div>
                          <div className="text-sm text-gray-500 mt-2">
                            <strong>Offers:</strong> {item.offers.join(", ")}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div>No products in the cart.</div>
                  )}
                </div>

              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500">No orders found.</div>
        )}
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default OrdersPage;
