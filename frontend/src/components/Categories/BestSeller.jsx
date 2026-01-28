import React from "react";
import ProductDetails from "../Products/ProductDetails";

const BestSeller = ({ bestSellerProducts }) => {
  return (
    <div>
      <h2 className="text-3xl font-bold text-center mb-4">Best Seller</h2>
      {bestSellerProducts ? (
        <ProductDetails productId={bestSellerProducts._id} />
      ) : (
        <p className="text-center">Loading best seller product...</p>
      )}
    </div>
  );
};

export default BestSeller;
