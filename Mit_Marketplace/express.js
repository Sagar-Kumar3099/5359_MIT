const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Dummy payment endpoint
app.post('/api/payment', (req, res) => {
  const { cardNumber, expiry, cvv, amount } = req.body;

  // Simple validation
  if (!cardNumber || !expiry || !cvv || !amount) {
    return res.status(400).json({ success: false, message: 'Invalid payment details' });
  }

  // Simulate payment success or failure
  const isPaymentSuccessful = Math.random() > 0.2; // 80% chance of success

  if (isPaymentSuccessful) {
    res.json({
      success: true,
      message: 'Payment Successful!',
      transactionId: `TXN${Date.now()}`,
    });
  } else {
    res.json({
      success: false,
      message: 'Payment Failed! Please try again.',
    });
  }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => console.log(`Dummy payment gateway running on http://localhost:${PORT}`));
