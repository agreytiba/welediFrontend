import React, { useState } from "react";
import "./chekout.css"; // Make sure to use the correct file path for your CSS
import axios from "axios";

import Loader from "./loader";

const Checkout = () => {
  const BASE_URL = "http://localhost:8080/api/checkout";
  const total_price = 2000;
  const [formData, setFormData] = useState({
    accountNumber: "",
    amount: total_price,
    currency: "TZS",
    provider: "",
  });
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupContent, setPopupContent] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);


// handle change of inputs
const handleChange = (e) => {
  const { name,value } = e.target;
    // Handle other inputs
    setFormData({
      ...formData,
      [name]: value,
    });
};


  // generate random 8-digit number
  const generateRandomNumber = () => {
    return Math.floor(10000000 + Math.random() * 90000000);
  };

  // verify user by get token
  const handleGetToken = async () => {
    try {
      setIsLoading(true);
      const result = await axios.get(BASE_URL);

      if (result.data.success && result.data.message === "Token generated successfully") {
        setIsLoading(false);
        setShowForm(true);
      }
    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error.message);
    }
  };

  // pay with azam pay
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const randomExternalId = generateRandomNumber().toString().substring(0, 8);
      const result = await axios.post(BASE_URL, { ...formData, externalId: randomExternalId });

      if (result.data) {
        setPopupContent(result.data);
        setIsPopupOpen(true);
      }
    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error.message);
    } finally {
      setIsLoading(false);
    }
  };
  const handleCloseMessage = () => {
    setIsPopupOpen(false)
     // Redirect to home page after successful payment
      window.location.href = "/"; 
}
  return (
    <div>
      {showForm ? (
        <div className="checkout_container">
          <div className="checkout">
            <h2 style={{textAlign:`center`, textTransform:`uppercase`}}>User Payment Details</h2>
            <p style={{ color: `red`, lineHeight: `2`, fontSize: `1rem` }}>
              fill the form with your information to complete payments
            </p>
            <div>
              <form onSubmit={handleSubmit} className="form_checkout">
                <label>
                  Phone Number <br/><span style={{color:`grey`}}>(phone Number where the amount will be reduce)</span>:
                  <input
                    type="number"
                    name="accountNumber"
                    value={formData.accountNumber}
                    onChange={handleChange}
                    required
                  />
                </label>
                <br />

                <label>
                  Amount:
                  <br />
                  <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    disabled
                  />
                </label>
                <br />

                <label>
                  Currency
                  <select
                    name="currency"
                    value={formData.currency}
                    onChange={handleChange}
                    required
                  >
                    <option value="TZS">TZS</option>
                  </select>
                </label>
                <br />

                {/* Removed externalId input from the form */}

                <label>
  Provider
  <select
    name="provider"
    value={formData.provider}
    onChange={handleChange}
    required
  >
    <option value="" disabled>Select provider</option>
    <option value="airtel">Airtel</option>
    <option value="tigo">Tigo</option>
    <option value="mpesa">Mpesa</option>
    <option value="halopesa">Halopesa</option>
  </select>
</label>
                <br />

                <button type="submit" disabled={isLoading}>
                  {isLoading ? <Loader /> : "PAY"}
                </button>
              </form>
            </div>

            {/* Popup */}
            {isPopupOpen && (
              <div className="popup">
                <div className="popup-content">
                  {popupContent.success === true ? (
                    <p style={{ backgroundColor: `#45a049`, color: `white`, padding: `10px`}}>
                      Success
                    </p>
                  ) : (
                    <p style={{ backgroundColor: `#45a049`, color: `white`, padding: `10px` }}>
                      Success
                    </p>
                  )}
                  <p> {popupContent.message}</p>
                  {/* <p>Transaction ID: {popupContent.transactionId}</p> */}
                  <button
                    onClick={() => handleCloseMessage()}
                    style={{
                     
                      color: `#000`,
                      border: `1px red solid`,
                      padding: `5px`,
                    }}
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="checkout_container">
          <div className="card">
            <div className="card-header">
              <h3> purchase your CV</h3>
            </div>
            <div className="card-body">
              <p>
                Unlock Your Career Potential: Elevate your professional journey with a standout CV
                tailored just for you. Invest in your success – purchase your winning CV today!
              </p>
              <h4 className="card-price">PRICE : <span>{total_price}Tsh</span></h4>
              <button onClick={handleGetToken} className="card-button">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
