import React, { useState, useEffect } from 'react';
import { getDatabase, ref, get } from 'firebase/database';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/cartContext';
import { useAuth } from '../contexts/AuthContext';
import toast from "react-hot-toast";
import Chatbot from '../components/chatBot';
import Footer from '../components/footer';

function Marketplace() {
  const { category } = useParams();
  const { addToCart } = useCart();
  const { currentUser } = useAuth();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([
    'Kitchen Essentials',
    'Furniture',
    'Electronics',
    'Study Materials',
    'Dorm Supplies',
    'Textbooks'
  ]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()


  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

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
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);


  useEffect(() => {
    setCurrentPage(1);
  }, [category]);



  const filteredProducts = category === 'all' || !category
    ? products
    : products.filter((product) => product.category.toLowerCase().replace(/\s+/g, '-') === category);




  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleAddToCart = (product) => {
    if (!currentUser) {
      toast.error("You must be logged in to add items to the cart.");
      return;
    }
    addToCart(product);
    toast.success("Product added to cart successfully")
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <>
    <div
      className="w-full min-h-screen bg-cover bg-center px-4 sm:px-6 lg:px-8 py-12"
      style={{
        backgroundImage: "url('/texture-3.webp')", 
      }}
    >
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Marketplace</h1>



      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-100 mb-4">Categories</h2>
        <div className="flex flex-wrap gap-2">
          <Link to="/marketplace/all">
            <button
              className={`px-4 py-2 rounded-full ${!category || category === 'all' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            >
              All
            </button>
          </Link>
          {categories.map((categoryName) => (
            <Link key={categoryName} to={`/marketplace/${categoryName.toLowerCase().replace(/\s+/g, '-')}`}>
              <button
                className={`px-4 py-2 rounded-full ${category === categoryName.toLowerCase().replace(/\s+/g, '-') ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              >
                {categoryName}
              </button>
            </Link>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {currentProducts.map((product) => (
          <div key={product.id}  className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-all duration-300 ease-in-out  hover:scale-110">
            <div onClick={()=> navigate(`/product/${product.id}`) }>
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-200">{product.name}</h3>
              <p className="mt-1 text-sm text-gray-200">{product.category}</p>
              <p className="mt-1 text-gray-200">{product.description}</p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-lg font-bold text-indigo-600"> ₹ {product.price}</span>
              </div>
            </div>  
              <button
                onClick={(e) => {
                  e.stopPropagation(); 
                  handleAddToCart(product);
                }}
                className="px-6 py-3 bg-indigo-600 text-white font-semibold ml-2 mb-3 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition duration-200"
              >
                {currentUser ? 'Add to Cart' : 'Add to Cart'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No products found in this category.</p>
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-8 flex justify-center space-x-4">
          <button
            onClick={() => setCurrentPage(prevPage => Math.max(prevPage - 1, 1))}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:bg-gray-300"
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="text-lg font-semibold text-gray-200">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages))}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:bg-gray-300"
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
      <Chatbot />
    </div>
    <Footer/>
    </>

  );
}

export default Marketplace;
