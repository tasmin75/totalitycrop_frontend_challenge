import React, { useState, useEffect } from "react";
import style from "./HeroSection.module.css";

const HeroSection = () => {
  const [image, setImage] = useState(0);
  const backgroundImages = [
    "https://wallpapercave.com/wp/drJu99l.jpg",
    "https://imageio.forbes.com/specials-images/imageserve/60e9c8e52a36ba6123d1225e/0x0.jpg",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setImage((prev) => (prev + 1) % backgroundImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={style.bg_img}
      style={{ backgroundImage: `url(${backgroundImages[image]})` }}
    >
      <div className={style.product_title}>
        <p>POWEREDGE SERVERS</p>
        <h2>Accelerating Where You Never Thought Possible</h2>
        <p>Shop the next generation of PowerEdge Server.</p>
      </div>
    </div>
  );
};

export default HeroSection;
