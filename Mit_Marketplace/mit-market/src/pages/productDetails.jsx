import React, { useState, useEffect } from 'react';
import { getDatabase, ref, get, push, query, limitToLast } from 'firebase/database';
import { useParams, useNavigate } from 'react-router-dom'; // Added useHistory for redirection
import toast from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/cartContext';
import Chatbot from '../components/chatBot';
import Footer from '../components/footer';

function ProductDetails() {
  const { productId } = useParams();
  const { addToCart } = useCart();
  const { currentUser } = useAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [commentsLoading, setCommentsLoading] = useState(true);
  const [userName, setUserName] = useState('');
  const navigate = useNavigate(); 

  useEffect(() => {
    if (!currentUser) {
      
      navigate('/login');
      return;
    }

    const fetchProductDetails = async () => {
      const db = getDatabase();
      const productRef = ref(db, `products/${productId}`);
      const commentsRef = query(ref(db, `comments/${productId}`), limitToLast(20));
      const userRef = ref(db, `users/${currentUser.uid}`);

      try {
        const [productSnapshot, commentsSnapshot, userSnapshot] = await Promise.all([ 
          get(productRef),
          get(commentsRef),
          get(userRef),
        ]);

        if (productSnapshot.exists()) {
          setProduct(productSnapshot.val());
        } else {
          toast.error('Product not found.');
        }

        if (commentsSnapshot.exists()) {
          setComments(Object.values(commentsSnapshot.val()));
        }

        if (userSnapshot.exists()) {
          setUserName(userSnapshot.val().name);
        }
      } catch (error) {
        toast.error('Error fetching product details.');
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
        setCommentsLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId, currentUser, comments]); 

  const handleAddToCart = (product) => {
    if (!currentUser) {
      toast.error('You must be logged in to add items to the cart.');
      return;
    }
    addToCart(product);
    toast.success('Product added to cart successfully');
  };

  const handleAddComment = async () => {
    if (!currentUser) {
      toast.error('You must be logged in to leave a comment.');
      return;
    }

    if (!comment.trim()) {
      toast.error('Comment cannot be empty.');
      return;
    }

    try {
      const db = getDatabase();
      const commentsRef = ref(db, `comments/${productId}`);
      const userNameToUse = userName || 'Anonymous';
      const newComment = {
        userId: currentUser.uid,
        userName: userNameToUse,
        commentText: comment,
        timestamp: new Date().toISOString(),
      };
      await push(commentsRef, newComment);
      setComments((prev) => [...prev, newComment]);
      setComment('');
      toast.success('Comment added successfully');
    } catch (error) {
      toast.error('Error adding comment.');
      console.error('Error adding comment:', error);
    }
  };

  const renderRating = (rating) => {
    const validRating = isNaN(rating) ? 0 : Math.max(0, Math.min(5, rating));
    const fullStars = Math.floor(validRating);
    const emptyStars = 5 - fullStars;

    return (
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, index) => (
          <span key={index} className="text-yellow-500">★</span>
        ))}
        {[...Array(emptyStars)].map((_, index) => (
          <span key={index} className="text-gray-300">★</span>
        ))}
        <span className="ml-2 text-sm text-gray-500">({validRating.toFixed(1)})</span>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!product) {
    return <p className="text-center py-12 text-gray-200">Product not found</p>;
  }

  return (
    <div className="bg-[url('/texture-2.webp')] bg-cover bg-center min-h-screen">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-200 mb-8">{product.name}</h1>
      <div className="flex flex-col bg-gray-300  p-10 rounded-2xl lg:flex-row gap-12 ">
        <div className="flex-shrink-0 lg:w-1/2">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-89 object-cover rounded-lg"
          />
        </div>
        <div className="lg:w-1/2">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Description</h2>
          <p className="text-gray-900  mb-4">{product.description}</p>
          <p className="text-lg font-bold text-indigo-600">₹ {product.price}</p>
          
          {product.ratings && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-gray-900">Rating</h3>
              {renderRating(product.ratings)}
            </div>
          )}

          {product.offers && (
            <div className="mt-4 bg-yellow-100 p-4 rounded-md">
              <p className="text-lg font-semibold text-gray-900">Special Offer</p>
              <p className="text-gray-700">{product.offers}</p>
            </div>
          )}

          <div className="mt-6">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleAddToCart(product);
              }}
              className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition duration-200"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <h3 className="text-2xl font-bold text-gray-200 mb-6">Comments</h3>
        {commentsLoading ? (
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          </div>
        ) : comments.length > 0 ? (
          <div className="space-y-4">
            {comments.map((c, index) => (
              <div key={index} className="bg-gray-100 p-4 rounded-lg">
                
                <p className="font-semibold text-indigo-600">{c.userName}</p>
                <p className="text-gray-700">{c.commentText}</p>
                <p className="text-sm text-gray-500">{new Date(c.timestamp).toLocaleString()}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-200">No comments yet. Be the first to comment!</p>
        )}

        {currentUser ? (
          <div className="mt-6">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write your comment here..."
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              onClick={handleAddComment}
              className="mt-4 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition duration-200"
            >
              Add Comment
            </button>
          </div>
        ) : (
          <p className="text-gray-500">You must be logged in to add a comment.</p>
        )}
      </div>
      <Chatbot/>
    </div>
    <Footer/>
    </div>
  );
}

export default ProductDetails;
