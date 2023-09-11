import React, { useState, useEffect } from "react";
import style from "./ProductDetails.module.css";
import HeroSection2 from "../../commonUI/herosection2/HeroSection2";
import ProductList from "../../components/productlist/ProductList";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/userSlice";
import { toast } from "react-toastify";

const ProductDetails = ({ match }) => {
  const [tab, setTab] = useState("desc");
  const [rating, setRating] = useState(null);
  const productId = match.params.id;

  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();

  async function fetchData() {
    try {
      const res = await fetch(`https://dummyjson.com/products/${productId}`);
      const data = await res.json();
      setProduct(data.product);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, [productId]);

  const relatedProduct = [];

  const handleAddToCart = () => {
    if (product) {
      dispatch(
        addToCart({
          id: product.id,
          title: product.title,
          price: product.price,
          thumbnail: product.thumbnail,
          quantity: 1,
          category: product.category,
          brand: product.brand,
          description: product.description,
          rating,
        })
      );
      toast.success("Item added successfully");
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [productId]);

  return (
    <div>
      <HeroSection2 title="Product details" />

      <div className={style.product_details}>
        {product ? (
          <>
            <div className={style.product_image}>
              <img src={product.thumbnail} alt="product" />
            </div>
            <div className={style.details}>
              <h2>{product.title}</h2>
              <span>⭐⭐⭐⭐⭐</span>
              <h5>₹{product.price}.00</h5>
              <p>{product.description}</p>
              <motion.button
                whileTap={{ scale: 0.8 }}
                className={style.cart_button}
                onClick={handleAddToCart}
              >
                Add to Cart
              </motion.button>
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <div className={style.related}>
        <h2>You might also like.</h2>
        <ProductList data={relatedProduct} />
      </div>
    </div>
  );
};

export default ProductDetails;
