import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import axios from "axios";
import { API_URL } from "../utils/constans";

const OrderForm = ({ cart, onOrderPlaced }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    description: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert("Cart is empty. Add items to place an order.");
      return;
    }
    
    const total_price = cart.reduce((acc, item) => acc + item.ttlprice, 0)
    
    const orderData = {
      id: generateRandomCode(10),
      name: formData.name,
      phone: formData.phone,
      address: formData.address,
      description: formData.description,
      menus: cart,
      total_price,
      date: generateNewDate(),
      status: "pending",
    };

    try {
      const response = await axios.post(API_URL('orders'), orderData);

      if (response.status === 200 || response.status === 201) {
        alert("Order placed successfully!");
        onOrderPlaced(); // Reset cart
      } else {
        alert("Failed to place order. Please try again.");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("An error occurred while placing the order.");
    }
  };

  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.ttlprice, 0);
  };

  function generateNewDate() {
    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();
    return `${year}-${month}-${day}`;
  }

  function generateRandomCode(length) {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }
    return result;
  }

  return (
    <Form className="mt-5 p-4 shadow rounded" onSubmit={handleSubmit}>
      <h2 className="mb-4 text-center">Order Form</h2>
      <Row className="mb-3">
        <Col md={6}>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              placeholder="Enter your name"
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
              placeholder="Enter your phone number"
            />
          </Form.Group>
        </Col>
      </Row>
      <Form.Group className="mb-3">
        <Form.Label>Address</Form.Label>
        <Form.Control
          as="textarea"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          rows={3}
          required
          placeholder="Enter your address"
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Description (Optional)</Form.Label>
        <Form.Control
          as="textarea"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          rows={2}
          placeholder="Additional notes"
        />
      </Form.Group>

      {/* Order Summary */}
      <div className="order-summary mt-4 text-center">
        <h5 className="fw-bold">Total Price</h5>
        <p className="text-primary fs-4 fw-bold">
          Rp. {calculateTotalPrice().toLocaleString()}
        </p>
      </div>

      <Button variant="primary" type="submit" className="w-100 mt-4">
        Submit Order
      </Button>
    </Form>
  );
};

export default OrderForm;