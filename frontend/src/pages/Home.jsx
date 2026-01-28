import React, { useEffect, useState } from "react";
import Hero from "./../components/Layout/Hero";
import GenderCollectionSection from "../components/Products/GenderCollectionSection";
import NewArrival from "../components/Products/NewArrival";
import BestSeller from "../components/Categories/BestSeller";
import WomenWear from "../components/Categories/WomenWear";
import FeaturedCollection from "../components/Products/FeaturedCollection";
import FeaturesSection from "../components/Products/FeaturesSection";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { fetchProductsByFilter } from "../redux/slices/productSlice";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Home = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const [bestSellerProducts, setBestSellerProducts] = useState(null);

  useEffect(() => {
    // fetch for a specific collection
    dispatch(
      fetchProductsByFilter({
        gender: "Women",
        category: "Bottom Wear",
        limit: 8,
      })
    );

    // Fetch best seller products
    const fetchBestSellerProducts = async () => {
      try {
        const response = await axios.get(
          `${backendUrl}/api/products/best-seller`
        );
        setBestSellerProducts(response.data);
      } catch (error) {
        console.error("Error fetching best seller products:", error);
      }
    };

    fetchBestSellerProducts();
  }, [dispatch]);

  return (
    <div>
      <Hero />
      <GenderCollectionSection />
      <NewArrival />
      <BestSeller bestSellerProducts={bestSellerProducts} />
      <WomenWear products={products} loading={loading} error={error} />
      <FeaturedCollection />
      <FeaturesSection />
    </div>
  );
};

export default Home;
