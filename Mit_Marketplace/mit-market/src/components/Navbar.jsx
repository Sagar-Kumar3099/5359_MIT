import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/cartContext";
import { FaShoppingCart } from 'react-icons/fa';
import { FaUser } from 'react-icons/fa';

function Navbar() {
  const { currentUser, logout } = useAuth();
  const { cart } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      setIsMobileMenuOpen(false); 
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <nav className="bg-[rgb(2,0,32)] shadow-md sticky top-0 z-50">
      <div className="sticky max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-xl font-bold text-indigo-600">
                MIT Marketplace
              </Link>
            </div>
          </div>
          <div className="hidden sm:flex sm:items-center sm:space-x-8">
            <Link
              to="/"
              className="text-white hover:text-indigo-600 inline-flex items-center px-1 pt-1 text-md font-medium"
            >
              Home
            </Link>
            <Link
              to="/marketplace"
              className="text-white  hover:text-indigo-600 inline-flex items-center px-1 pt-1 text-md font-medium"
            >
              Marketplace
            </Link>
            {currentUser ? (
              <div className="flex items-center space-x-6">
                <Link className="text-white  hover:text-indigo-600 inline-flex items-center px-1 pt-1 text-md font-medium" to="/cart">
                  Cart <FaShoppingCart className="inline-block mr-1 ml-1" /> ({cart.length})
                </Link>
                <Link
                  to="/order"
                  className="text-white  hover:text-indigo-600 inline-flex items-center px-1 pt-1 text-md font-medium"
                >
                 Orders
                </Link>
                <Link
                  to="/profile"
                  className="text-white  hover:text-indigo-600 inline-flex items-center px-1 pt-1 text-md font-medium"
                >
                 Profile <FaUser className="inline-block ml-1" /> 
                </Link>
                
                
                <button
                  onClick={handleLogout}
                  className="text-white  hover:text-indigo-600 inline-flex items-center px-1 pt-1 text-md font-medium"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="inline-flex items-center px-4 py-2 border border-transparent text-md font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Sign in
              </Link>
            )}
          </div>
          {/* Mobile Menu Button */}
          <div className="sm:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={
                    isMobileMenuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-[rgb(2,0,32)] shadow z-30 shadow-lg transform transition-transform duration-300 ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="p-4">
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-gray-200 hover:text-gray-700 focus:outline-none"
          >
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="space-y-4 px-4">
          <Link
            to="/"
            className="block text-gray-300 hover:text-gray-700 px-3 py-2 rounded-md text-base font-medium"
            onClick={closeMobileMenu}
          >
            Home
          </Link>
          <Link
            to="/marketplace"
            className="block text-gray-300 hover:text-gray-700 px-3 py-2 rounded-md text-base font-medium"
            onClick={closeMobileMenu}
          >
            Marketplace
          </Link>
          {currentUser ? (
            <>
              <Link
                className="flex text-gray-300 hover:text-gray-700 px-3 py-2 rounded-md text-base font-medium"
                to="/cart"
                onClick={closeMobileMenu}
              >
                Cart <FaShoppingCart className="ml-0.5 mr-1 mt-0.5"/> ({cart.length})
              </Link>
              <Link
                to="/profile"
                className="block text-gray-300 flex hover:text-gray-700 px-3 py-2 rounded-md text-base font-medium"
                onClick={closeMobileMenu}
              >
                Profile <FaUser className="ml-2 mt-0.5"/>
              </Link>
              <Link
                to="/order"
                className="block text-gray-300 hover:text-gray-700 px-3 py-2 rounded-md text-base font-medium"
                onClick={closeMobileMenu}
              >
                Orders
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left text-gray-300 hover:text-gray-700 px-3 py-2 rounded-md text-base font-medium"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="block text-white bg-indigo-600 hover:bg-indigo-700 px-3 py-2 rounded-md text-base font-medium text-center"
              onClick={closeMobileMenu}
            >
              Sign in
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
