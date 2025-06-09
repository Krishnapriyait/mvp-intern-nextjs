import React, { useState, useEffect } from 'react';

export default function FoodDonationForm({ onAddDonation }) {
  const [foodType, setFoodType] = useState('');
  const [quantity, setQuantity] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [pickupTime, setPickupTime] = useState('');
  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setPickupDate(today);
  }, []);

  useEffect(() => {
    const valid =
      foodType.trim() !== '' &&
      quantity.trim() !== '' &&
      pickupDate.trim() !== '' &&
      pickupTime.trim() !== '';
    setFormValid(valid);
  }, [foodType, quantity, pickupDate, pickupTime]);

  useEffect(() => {
    console.log('Form validation status:', formValid);
  }, [formValid]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formValid) {
      alert('Please fill all fields correctly.');
      return;
    }
    const newDonation = {
      id: Date.now(),
      type: foodType,
      quantity: parseInt(quantity),
    };
    onAddDonation(newDonation);
    alert(`Thank you for donating ${quantity} units of ${foodType}!`);

    setFoodType('');
    setQuantity('');
    setPickupTime('');
    setPickupDate(new Date().toISOString().split('T')[0]);
  };

  return (
    <div className="donation-form-wrapper">
      <h2>Food Donation Form</h2>
      <form onSubmit={handleSubmit} className="form-grid">
        <div className="form-row">
          <label>Food Type</label>
          <input
            type="text"
            value={foodType}
            onChange={(e) => setFoodType(e.target.value)}
            placeholder="e.g. Cooked Rice"
            required
          />
        </div>

        <div className="form-row">
          <label>Quantity (units)</label>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Enter quantity"
            required
          />
        </div>

        <div className="form-row">
          <label>Pickup Date</label>
          <input
            type="date"
            value={pickupDate}
            onChange={(e) => setPickupDate(e.target.value)}
            required
          />
        </div>

        <div className="form-row">
          <label>Pickup Time</label>
          <input
            type="time"
            value={pickupTime}
            onChange={(e) => setPickupTime(e.target.value)}
            required
          />
        </div>

        <button type="submit" disabled={!formValid} className="submit-btn">
          Submit Donation
        </button>
      </form>

      <style jsx>{`
        .donation-form-wrapper {
          background: #ffffff;
          padding: 30px;
          border-radius: 12px;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);
          max-width: 600px;
          margin: auto;
        }

        h2 {
          text-align: center;
          color: #6a994e;
          margin-bottom: 20px;
        }

        .form-grid {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .form-row {
          display: flex;
          flex-direction: column;
        }

        .form-row label {
          font-weight: 600;
          margin-bottom: 6px;
        }

        .form-row input {
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 8px;
          font-size: 15px;
        }

        .submit-btn {
          padding: 12px;
          background-color: #6a994e;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .submit-btn:disabled {
          background-color: #ccc;
          cursor: not-allowed;
        }

        .submit-btn:hover:enabled {
          background-color: #588d45;
        }
      `}</style>
    </div>
  );
}
