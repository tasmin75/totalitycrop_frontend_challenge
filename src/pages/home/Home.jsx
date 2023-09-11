import React, { useState, useEffect } from "react";
import style from "./Home.module.css";
import HeroSection from "../../components/heroSection/HeroSection";
import Productlist from "../../components/productlist/ProductList";
import { BsSearch } from "react-icons/bs";

const Home = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  async function fetchData() {
    try {
      const res = await fetch("https://dummyjson.com/products");
      const data = await res.json();
      setAllProducts(data.products);
      setFilteredProducts(data.products);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleFilterData = (e) => {
    const value = e.target.value;
    setSelectedCategory(value);
    filterProducts(value, searchValue);
  };

  const handleSearchData = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchValue(value);
    filterProducts(selectedCategory, value);
  };
  

  const filterProducts = (category, search) => {
    if (category === "all" && search === "") {
      setFilteredProducts(allProducts);
    } else {
      const filtered = allProducts.filter((item) => {
        const isCategoryMatch =
          category === "all" || item.category === category;
        const isSearchMatch =
          search === "" || item.productName.toLowerCase().includes(search.toLowerCase());
        return isCategoryMatch && isSearchMatch;
      });
      setFilteredProducts(filtered);
    }
  };

  return (
    <div className={style.home}>
      <HeroSection />
      <div className={style.product_features}>
        <div className={style.product_filter}>
          <select onChange={handleFilterData} value={selectedCategory}>
            <option value="all">All</option>
            <option value="smartphones">Smartphones</option>
            <option value="laptops">Laptops</option>
            <option value="fragrances">Fragrances</option>
            <option value="skincare">Skincare</option>
            <option value="groceries">Groceries</option>
            <option value="home-decoration">Home Decoration</option>
          </select>
        </div>
        <div className={style.product_search}>
          <input
            type="text"
            placeholder="Search..."
            onChange={handleSearchData}
            value={searchValue}
          />
          <div className={style.search_icon}>
            <BsSearch />
          </div>
        </div>
      </div>

      <div className={style.container}>
        {filteredProducts.length === 0 ? (
          <h1 style={{ color: "red", textAlign: "center", marginTop: "2rem" }}>
            No product found
          </h1>
        ) : null}
        <div className={style.productList}>
          <Productlist data={filteredProducts} />
        </div>
      </div>
    </div>
  );
};

export default Home;
