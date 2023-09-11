import React, { useState } from "react";
import style from "./Checkout.module.css";
import HeroSection2 from "../../commonUI/herosection2/HeroSection2";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../../redux/userSlice";

const Checkout = () => {
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const totalAmount = useSelector((state) => state.cart.totalAmount);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    streetAddress: "",
    pinCode: "",
    city: "",
  });

  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isFormValid = Object.values(formData).every(
      (value) => value.trim() !== ""
    );

    if (isFormValid) {
      toast.success("Your order is placed successfully!");
      dispatch(clearCart());
      navigate("/");
    } else {
      toast.error("Please fill in all the required fields.");
    }
  };

  return (
    <div>
      <HeroSection2 title="checkout" />

      <div className={style.checkout_form}>
        <form onSubmit={handleSubmit}>
          <h2>Billing Information</h2>
          <div className={style.input_field}>
            <input
              type="text"
              placeholder="Enter your name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className={style.input_field}>
            <input
              type="text"
              placeholder="Enter your email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className={style.input_field}>
            <input
              type="text"
              placeholder="Phone number"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
          </div>
          <div className={style.input_field}>
            <input
              type="text"
              placeholder="Street address"
              name="streetAddress"
              value={formData.streetAddress}
              onChange={handleChange}
            />
          </div>
          <div className={style.input_field}>
            <input
              type="text"
              placeholder="Pin code"
              name="pinCode"
              value={formData.pinCode}
              onChange={handleChange}
            />
          </div>
          <div className={style.input_field}>
            <input
              type="text"
              placeholder="City"
              name="city"
              value={formData.city}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className={style.more_shop}>
            Place Order
          </button>
        </form>

        <div className={style.checkout_cart}>
          <h6>
            Total Qty: <span>{totalQuantity} items</span>
          </h6>
          <h6>
            Subtotal : <span>₹{totalAmount}</span>
          </h6>
          <h6>
            Shipping :<span>0</span>
          </h6>
          <h6>Free shipping</h6>
          <hr />
          <h4>
            Total cost : <span>₹{totalAmount}</span>
          </h4>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
