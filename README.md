# MIT Market Place 🌍

 MIT Student Marketplace, an online platform exclusively designed to address the logistical and financial challenges faced by MIT’s diverse student population, particularly international students. The platform will streamline the onboarding process by providing curated packages of essential items, exclusive discounts, and personalized recommendations, fostering community building and inclusivity.

# Website Deployment 🌐

The website is live at: https://mite-marketplace.netlify.app/

# Table of Contents 🗄

Features

Tech Stack

Installation

Usage

Folder Structure

Environment Variables

Screenshots

Website Deployment

Contributing

License

Contact

# Features ✨

Dynamic Content: A homepage featuring curated Profile, Cart, and Orders and a  Chat Bot for helping users.

User Authentication: Secure login and registration using Firebase Authentication.

Personalized Dashboard: Save and manage user preferences, featured Producat, and Order Details.

Real-Time Updates: Synchronize user data with Firebase Realtime Database.

Mobile-Friendly Design: Fully responsive for seamless browsing on all devices.

Interactive Navigation: Sticky navbar and smooth scrolling for a better UX.

Tech Stack 🛠️

Frontend:

React (with Vite for fast development)

CSS3

Backend:

Firebase Realtime Database

Firebase Authentication

Tools:

npm (package manager)

Git & GitHub (version control)

# Installation 🚀

Follow these steps to set up and run the project locally:

Prerequisites

Node.js and npm installed on your machine.

A Firebase project set up in the Firebase Console.

Steps

Clone the Repository:

git clone https://github.com/Sagar-Kumar3099/5359_MIT.git

Navigate to the Project Directory:

cd mit-market

Install Dependencies:

npm install

Set Up Firebase:

Create a Firebase project and add a web app to it.

Copy the Firebase configuration and add it to a .env file in the project root:

VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
VITE_FIREBASE_DATABASE_URL=your-database-url
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
VITE_FIREBASE_APP_ID=your-app-id

Start the Development Server:

npm run dev

Open http://localhost:5173 in your browser to view the app.

# Usage 🔥

Explore User Content:

Navigate through curated Profiles and MarketPlace on the homepage.

Register/Login:

Create an account or log in using Firebase Authentication.

Personalized Dashboard:

Access your saved preferences and recommendations tailored to you.

Folder Structure 📁
```plaintext
```
└── 📁Mit_Marketplace
    └── 📁mit-market
        └── .env
        └── .gitignore
        └── index.html
        └── package-lock.json
        └── package.json
        └── postcss.config.js
        └── 📁public
            └── _redirects
            └── data.json
            └── 📁images
            └── paytext-1.webp
            └── texture-2.webp
            └── texture-3.webp
        └── 📁src
            └── App.jsx
            └── 📁components
                └── chatBot.jsx
                └── footer.jsx
                └── loading.jsx
                └── Navbar.jsx
            └── 📁contexts
                └── AuthContext.jsx
                └── cartContext.jsx
            └── firebase.js
            └── index.css
            └── main.jsx
            └── 📁pages
                └── cart.jsx
                └── Home.jsx
                └── Login.jsx
                └── Marketplace.jsx
                └── orderDetails.jsx
                └── orderPage.jsx
                └── paymentForm.jsx
                └── productDetails.jsx
                └── Profile.jsx
                └── signup.jsx
            └── 📁utils
                └── protectedRoute.jsx
        └── tailwind.config.js
        └── vite.config.js
```

Environment Variables 🔒

The project uses a .env file to store sensitive Firebase credentials. Below is an example of the required variables:

VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
VITE_FIREBASE_DATABASE_URL=your-database-url
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
VITE_FIREBASE_APP_ID=your-app-id




Homepage



Login Page



Dashboard





Contributing 🤝

We welcome contributions to make this project better! Here's how you can contribute:

Fork the repository.

Create a new branch:

git checkout -b feature-name

Make your changes and commit them:

git commit -m "Add a meaningful message"

Push your branch:

git push origin feature-name

Create a pull request on GitHub.

License 📜

This project is licensed under the MIT License. You are free to use, modify, and distribute this software.

Contact 📨

If you have any questions, feedback, or suggestions, feel free to reach out:

Email: aditya3863297@gmail.com

GitHub: https://github.com/AdityaKumarThakur12

Happy Users! 🚫🌟