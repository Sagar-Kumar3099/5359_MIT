import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getDatabase, ref, get } from 'firebase/database';
import { FaStore } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import Footer from '../components/footer';
import Chatbot from '../components/chatBot';
import "../index.css";

function Home() {
  const [products, setProducts] = useState([]);
  const categories = ['Kitchen Essentials', 'Furniture', 'Electronics', 'Study Materials'];
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchProducts = async () => {
      const db = getDatabase();
      const dbRef = ref(db, 'products');
      try {
        const snapshot = await get(dbRef);
        if (snapshot.exists()) {
          const productsData = Object.keys(snapshot.val()).map((key) => ({
            id: key,
            ...snapshot.val()[key]
          }));
          setProducts(productsData);
        } else {
          console.log('No data available');
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const getCategoryProducts = (category) => {
    return products.filter(product => product.category === category).slice(0, 4);
  };

  return (
    <div className="relative bg-[url('/texture-2.webp')] bg-cover bg-center w-full  min-h-screen h-[500px]">
      <div className="relative bg-gradient-to-br min-h-screen">
  
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute bg-gradient-to-br from-blue-200 to-transparent opacity-50 w-[400px] h-[400px] rounded-full bottom-[-100px] right-[-100px] animate-float "></div>
          <div className="absolute bg-gradient-to-br from-pink-300 to-transparent opacity-50 w-[500px] h-[500px] rounded-full top-[-150px] left-[-150px] animate-float "></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
          <div className="relative overflow-hidden p-10 rounded-2xl shadow-lg bg-white bg-opacity-90 backdrop-blur-md">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-orange-500 via-blue-500 to-red-500 h-full animate-gradient"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2 }}
            ></motion.div>
            <div className="relative z-10 text-center">
              <motion.h1
                className="text-4xl font-extrabold text-gray-800 sm:text-6xl"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
              >
                Welcome to MIT Student Marketplace
              </motion.h1>
              <motion.p
                className="mt-4 max-w-2xl mx-auto text-lg text-gray-200 sm:text-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
              >
                Discover curated packages, exclusive discounts, and community-driven shopping solutions.
              </motion.p>
              <motion.div
                className="mt-6 flex justify-center space-x-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                <Link
                  to="/marketplace/all"
                  className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-md shadow-md hover:bg-indigo-700 transform transition duration-300 flex items-center"
                >
                  Browse Marketplace <FaStore className="ml-2" />
                </Link>
                {!currentUser && (
                  <Link
                    to="/login"
                    className="px-6 py-3 bg-gray-100 text-indigo-600 font-medium rounded-md shadow-md hover:bg-gray-200 transform transition duration-300"
                  >
                    Sign In
                  </Link>
                )}
              </motion.div>
            </div>
          </div>

      
          <motion.div
            className="mt-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              Featured Categories
            </h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {categories.map((category) => (
                <motion.div
                  key={category}
                  className="relative rounded-lg bg-opacity-90 bg-[rgb(2,0,32)] px-6 py-5 shadow-lg border-2 rounded-xl border-gray-600 bg-blue hover:shadow-2xl hover:scale-105 hover:bg-black transform transition duration-300 animate-float"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7 }}
                >
                  <div className="flex items-center space-x-3">
                    <div className="flex-1 min-w-0">
                      <Link
                        to={`/marketplace/${category.toLowerCase().replace(/\s+/g, '-')}`}
                        className="focus:outline-none"
                      >
                        <p className="text-lg font-medium text-white">{category}</p>
                        <p className="text-sm text-gray-100 truncate">Explore now</p>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

      
          <div className="relative  bg-cover bg-center  rounded-lg ">
            <motion.div
              className="mt-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              {categories.map((category) => (
                <div key={category} className="mb-12">
                  <h3 className="text-2xl font-bold text-white mt-8 mb-4">{category}</h3>
                  <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {getCategoryProducts(category).map((product) => (
                      <Link
                        to={`/product/${product.id}`}
                        key={product.id}
                        className="relative bg-gray-800 bg-opacity-90 rounded-lg shadow-lg hover:shadow-2xl hover:scale-105 transform transition duration-300"
                      >
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="w-full h-48 object-cover rounded-t-lg"
                        />
                        <div className="p-4">
                          <h4 className="text-lg font-semibold text-gray-200">{product.name}</h4>
                          <p className="text-sm text-gray-100 mt-2">{product.description}</p>
                          <p className="mt-3 text-xl font-bold text-indigo-600">₹ {product.price}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          
          <Chatbot />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
