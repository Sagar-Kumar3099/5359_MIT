import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa'; 

function Footer() {
  return (
    <footer className="bg-[rgb(2,0,32)] shadow text-white pt-10 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul>
              <li><Link to="/" className="text-gray-400 hover:text-white">Home</Link></li>
              <li><Link to="/marketplace/all" className="text-gray-400 hover:text-white">Marketplace</Link></li>
              <li><Link to="/login" className="text-gray-400 hover:text-white">Sign In</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-white">About Us</Link></li>
            </ul>
          </div>

        
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul>
              <li className="text-gray-400">Email: support@mitmarketplace.com</li>
              <li className="text-gray-400">Phone: +1 234 567 890</li>
            </ul>
          </div>

        
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-6">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <FaFacebook size={24} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <FaTwitter size={24} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <FaInstagram size={24} />
              </a>
            </div>
          </div>


          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul>
              <li><Link to="/privacy-policy" className="text-gray-400 hover:text-white">Privacy Policy</Link></li>
              <li><Link to="/terms-of-service" className="text-gray-400 hover:text-white">Terms of Service</Link></li>
              <li className="text-gray-400 mt-4">© {new Date().getFullYear()} MIT Student Marketplace. All Rights Reserved.</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
