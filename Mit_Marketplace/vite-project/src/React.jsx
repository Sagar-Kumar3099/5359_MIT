import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './PaymentForm.css'; // Include your existing styles

function PaymentForm() {
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiry: null, // Use null for DatePicker
    cvv: '',
    amount: '',
  });
  const [responseMessage, setResponseMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, expiry: date });
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    // Convert date to MM/YY format before sending to the server
    const formattedFormData = {
      ...formData,
      expiry: formData.expiry
        ? `${formData.expiry.getMonth() + 1}/${formData.expiry.getFullYear() % 100}`
        : '',
    };

    try {
      const response = await fetch('http://localhost:5000/api/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedFormData),
      });

      const data = await response.json();
      setResponseMessage(data.message);
    } catch (error) {
      setResponseMessage('Error processing payment. Please try again later.');
      console.log(error);
    }
  };

  return (
    <div className="payment-form-container">
      <h2>Payment Gateway</h2>
      <form className="payment-form" onSubmit={handlePayment}>
        <div className="form-group">
          <label>Card Number</label>
          <input
            type="text"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleInputChange}
            placeholder="1234 5678 9123 4567"
            required
          />
        </div>
        <div className="form-group">
          <label>Expiry Date</label>
          <DatePicker
            selected={formData.expiry}
            onChange={handleDateChange}
            dateFormat="MM/yy"
            showMonthYearPicker
            placeholderText="MM/YY"
            className="datepicker-input"
            required
          />
        </div>
        <div className="form-group">
          <label>CVV</label>
          <input
            type="password"
            name="cvv"
            value={formData.cvv}
            onChange={handleInputChange}
            placeholder="123"
            required
          />
        </div>
        <div className="form-group">
          <label>Amount</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleInputChange}
            placeholder="500"
            required
          />
        </div>
        <button type="submit" className="pay-button">
          Pay Now
        </button>
      </form>
      {responseMessage && <p className="response-message">{responseMessage}</p>}
    </div>
  );
}

export default PaymentForm;

