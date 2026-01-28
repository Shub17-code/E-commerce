import React from "react";
import ProductGrid from "../Products/ProductGrid";

const WomenWear = ({ products, loading, error }) => {
  return (
    <div>
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4">
          Top Wears for Women
        </h2>
        <ProductGrid products={products} loading={loading} error={error} />
      </div>
    </div>
  );
};

export default WomenWear;
