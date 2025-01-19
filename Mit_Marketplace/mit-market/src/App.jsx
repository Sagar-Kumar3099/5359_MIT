import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Marketplace from './pages/Marketplace';
import Profile from './pages/Profile';
import Login from './pages/Login';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/cartContext'; 
import { Toaster } from 'react-hot-toast';
import Cart from './pages/cart';
import Signup from './pages/signup';
import ProductDetails from './pages/productDetails';
import PaymentForm from './pages/paymentForm';
import Footer from './components/footer';
import ProtectedRoute from './utils/protectedRoute';
import OrderPage from './pages/orderDetails';
import OrdersPage from './pages/orderPage';
import Loading from './components/loading';

function App() {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); 
    }, 4000);

    return () => clearTimeout(timer); 
  }, []);

  if (loading) {
    return < Loading />; 
  }  


  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Navbar />
            <Toaster position="top-center" />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/marketplace/:category" element={<Marketplace />} />
              <Route path="/product/:productId" element={<ProductDetails />} />
              <Route path='/payment' element={
                <ProtectedRoute>
                  <PaymentForm/>
                </ProtectedRoute>
                }/>
              <Route path="/order/:orderId" element={
               <ProtectedRoute>
                  <OrderPage />
               </ProtectedRoute>
                }
                 />
              <Route path="/order" element={
                <ProtectedRoute>
                  <OrdersPage />
                </ProtectedRoute>
                
                } />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile/>
                </ProtectedRoute>
                
                } />
              <Route path="/login" element={<Login />} />
              <Route path="/cart" element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
                
                } />
              <Route path="/signup" element={<Signup />} />

              
            </Routes>
            {/* <Footer/> */}
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
