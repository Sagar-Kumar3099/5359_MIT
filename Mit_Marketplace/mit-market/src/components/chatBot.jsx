import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCommentAlt } from 'react-icons/fa';

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hello! How can I assist you today?' }
  ]);
  const [userInput, setUserInput] = useState('');

  const questionsAndAnswers = [
    { question: 'What is the MIT Student Marketplace?', answer: 'MIT Student Marketplace is a platform designed to help MIT students, especially international students, with curated packages of essential items, exclusive discounts, and personalized recommendations.' },
    { question: 'How can I create an account?', answer: 'You can create an account by signing up on our platform with your MIT credentials.' },
    { question: 'What types of products are available?', answer: 'We offer a variety of products including kitchen essentials, furniture, electronics, study materials, and more.' },
    { question: 'How do I get the curated packages?', answer: 'Once you sign up, we offer curated packages tailored to your needs, including essential items and discounts.' },
    { question: 'Are there any discounts for international students?', answer: 'Yes, we offer exclusive discounts for international students to make their onboarding experience smoother.' },
    { question: 'How do I contact support?', answer: 'You can contact support through our “Help” section on the website or by emailing support@mitmarketplace.com.' },
    { question: 'Is the platform only for MIT students?', answer: 'Yes, the MIT Student Marketplace is exclusive to MIT students.' }
  ];

  const toggleChatWindow = () => {
    setIsOpen(!isOpen);
  };

  const handleUserMessage = (e) => {
    e.preventDefault();
    if (userInput.trim() !== '') {
      setMessages([...messages, { sender: 'user', text: userInput }]);
      setUserInput('');
      setTimeout(() => {
        const answer = questionsAndAnswers.find(q => q.question.toLowerCase().includes(userInput.toLowerCase()));
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: 'bot', text: answer ? answer.answer : 'Sorry, I don’t understand that question.' }
        ]);
      }, 1000);
    }
  };

  return (
    <div>
      
      <motion.div
        className="fixed bottom-4 right-4 z-50 bg-indigo-600 p-3 rounded-full text-white cursor-pointer shadow-lg hover:shadow-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        onClick={toggleChatWindow}
      >
        <FaCommentAlt size={25} />
      </motion.div>

    
      {isOpen && (
        <div className="fixed bottom-16 right-4 z-50 bg-white shadow-lg rounded-lg w-80 sm:w-96 p-4 flex flex-col max-h-[80vh] overflow-y-auto">
          <div className="flex flex-col overflow-y-auto h-full">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.sender === 'bot' ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`rounded-lg max-w-xs sm:max-w-md p-3 mt-2 ${
                    message.sender === 'bot' ? 'bg-gray-100 text-gray-900' : 'bg-indigo-600 text-white'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          
          <div className="mt-4 sm:mt-6">
            <p className="text-gray-600 text-sm sm:text-base">Click on any of the questions below to ask:</p>
            <ul className="mt-2 space-y-2">
              {questionsAndAnswers.map((qa, index) => (
                <li
                  key={index}
                  className="cursor-pointer text-indigo-600 hover:underline text-sm sm:text-base"
                  onClick={() => {
                    setMessages((prev) => [...prev, { sender: 'user', text: qa.question }]);
                    setMessages((prev) => [
                      ...prev,
                      { sender: 'bot', text: qa.answer }
                    ]);
                  }}
                >
                  {qa.question}
                </li>
              ))}
            </ul>
          </div>

        
          <form onSubmit={handleUserMessage} className="flex mt-4">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Ask me something..."
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base"
            />
            <button
              type="submit"
              className="ml-2 bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 text-sm sm:text-base"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Chatbot;
