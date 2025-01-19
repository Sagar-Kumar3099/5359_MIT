import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { getDatabase, ref, set, onValue } from 'firebase/database';

function Profile() {
  const { currentUser, logout } = useAuth();
  const [name, setName] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [orders, setOrders] = useState([]);
  const [savedAddresses, setSavedAddresses] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const database = getDatabase();

  

  useEffect(() => {
    if (currentUser) {
      const userRef = ref(database, `users/${currentUser.uid}`);
      onValue(userRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setName(data.name || '');
          setProfilePicture(data.profilePicture || null);
          setGender(data.gender || '');
          setEmail(data.email || '');
          setPhone(data.phone || '');
          setOrders(data.orders || []);
          setSavedAddresses(data.savedAddresses || '');
        }
        setIsLoading(false);
      });
    }
  }, [currentUser, database]);

  

  const handleProfilePictureChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result); 
      };
      reader.readAsDataURL(file);
    }
  };


  const saveProfile = () => {
    const userRef = ref(database, `users/${currentUser.uid}`);
    set(userRef, {
      name,
      profilePicture,
      gender,
      email,
      phone,
      orders,
      savedAddresses,
    })
      .then(() => alert('Profile updated successfully!'))
      .catch((error) => alert('Error saving profile: ' + error.message));
  };


  const handleLogout = async () => {
    try {
      await logout();
      alert('You have logged out successfully.');
    } catch (error) {
      alert('Failed to log out: ' + error.message);
    }
  };

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Profile</h1>

        <div className="space-y-6">
        

          <div>
            <h2 className="text-lg font-medium text-gray-900">Profile Picture</h2>
            <div className="mt-4 flex items-center">
              <img
                src={profilePicture || 'https://via.placeholder.com/100'}
                alt="Profile"
                className="w-20 h-20 rounded-full object-cover border border-gray-300"
              />
              <label
                htmlFor="profilePicture"
                className="ml-4 cursor-pointer bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
              >
                Upload
              </label>
              <input
                id="profilePicture"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleProfilePictureChange}
              />
            </div>
          </div>

          
          <div>
            <h2 className="text-lg font-medium text-gray-900">Name</h2>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-2 w-full border border-gray-300 rounded-lg p-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your name"
            />
          </div>

          
          <div>
            <h2 className="text-lg font-medium text-gray-900">Gender</h2>
            <input
              type="text"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="mt-2 w-full border border-gray-300 rounded-lg p-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your gender"
            />
          </div>

          
          <div>
            <h2 className="text-lg font-medium text-gray-900">Email</h2>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full border border-gray-300 rounded-lg p-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your email"
            />
          </div>

        
          <div>
            <h2 className="text-lg font-medium text-gray-900">Phone</h2>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-2 w-full border border-gray-300 rounded-lg p-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your phone number"
            />
          </div>

          
          <div>
            <h2 className="text-lg font-medium text-gray-900">Saved Addresses</h2>
            <textarea
              value={savedAddresses}
              onChange={(e) => setSavedAddresses(e.target.value)}
              className="mt-2 w-full border border-gray-300 rounded-lg p-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your saved addresses"
            ></textarea>
          </div>

          
          <div>
            <h2 className="text-lg font-medium text-gray-900">Orders</h2>
            <ul className="list-disc pl-5">
              {orders && orders.length > 0 ? (
                orders.map((order, index) => (
                  <li key={index}>{order}</li>
                ))
              ) : (
                <li>No orders found</li>
              )}
            </ul>
          </div>

      
          <div className="pt-4 flex justify-between">
            <button
              onClick={saveProfile}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
            >
              Save
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700"
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
