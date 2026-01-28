import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchProductById,
  updateProduct,
} from "../../redux/slices/productSlice";
import axios from "axios";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const EditProductPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { selectedProduct, loading, error } = useSelector(
    (state) => state.products
  );

  const [uploadImage, setUploadImage] = useState(false); //image upload state
  const [productsData, setProductsData] = useState({
    name: "",
    description: "",
    price: 0,
    countInStock: 0,
    sku: "",
    category: "",
    brand: "",
    sizes: [],
    colors: [],
    collections: "",
    material: "",
    gender: "",
    images: [],
  });

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (selectedProduct) {
      setProductsData(selectedProduct);
    }
  }, [selectedProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductsData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    try {
      setUploadImage(true);
      const { data } = await axios.post(`${backendUrl}/api/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setProductsData((prevData) => {
        let updatedImages = [
          ...prevData.images,
          { url: data.imageUrl, altText: "" },
        ];

        // Keep only last 2 images
        if (updatedImages.length > 2) {
          updatedImages = updatedImages.slice(-2);
        }

        return {
          ...prevData,
          images: updatedImages,
        };
      });
      setUploadImage(false);
    } catch (error) {
      console.error("Error uploading image:", error);
      setUploadImage(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(productsData);

    dispatch(updateProduct({ id, productData: productsData }));
    navigate("/admin/products");
  };

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error: {error}</p>;
  }
  return (
    <div className="max-w-5xl mx-auto p-6 shadow-md rounded-lg">
      <h2 className="text-3xl font-bold mb-6">Edit Products</h2>
      <form onSubmit={handleSubmit}>
        {/* name */}
        <div className="mb-6">
          <label className="block text-gray-800 font-semibold mb-2">
            Product Name
          </label>
          <input
            type="text"
            name="name"
            value={productsData.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:appearance-none 
            focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        {/* description */}
        <div className="mb-6">
          <label className="block text-gray-800 font-semibold mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={productsData.description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:appearance-none 
            focus:outline-none focus:border-blue-500"
            rows={4}
            required
          />
        </div>
        {/* price */}
        <div className="mb-6">
          <label className="block text-gray-800 font-semibold mb-2">
            Price
          </label>
          <input
            type="number"
            name="price"
            value={productsData.price}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:appearance-none 
            focus:outline-none focus:border-blue-500"
          />
        </div>
        {/* count In Stock */}
        <div className="mb-6">
          <label className="block text-gray-800 font-semibold mb-2">
            Count In Stock
          </label>
          <input
            type="number"
            name="countInStock"
            value={productsData.countInStock}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:appearance-none 
            focus:outline-none focus:border-blue-500"
          />
        </div>
        {/* sku */}
        <div className="mb-6">
          <label className="block text-gray-800 font-semibold mb-2">SKU</label>
          <input
            type="text"
            name="sku"
            value={productsData.sku}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:appearance-none 
            focus:outline-none focus:border-blue-500"
          />
        </div>
        {/* category */}
        <div className="mb-6">
          <label className="block text-gray-800 font-semibold mb-2">
            Category
          </label>
          <input
            type="text"
            name="category"
            value={productsData.category}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:appearance-none 
            focus:outline-none focus:border-blue-500"
          />
        </div>
        {/* brand */}
        <div className="mb-6">
          <label className="block text-gray-800 font-semibold mb-2">
            Brand
          </label>
          <input
            type="text"
            name="brand"
            value={productsData.brand}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:appearance-none 
            focus:outline-none focus:border-blue-500"
          />
        </div>
        {/* sizes */}
        <div className="mb-6">
          <label className="block text-gray-800 font-semibold mb-2">
            Sizes (comma separated)
          </label>
          <input
            type="text"
            name="sizes"
            value={productsData.sizes.join(",")}
            onChange={(e) =>
              setProductsData({
                ...productsData,
                sizes: e.target.value.split(",").map((size) => size.trim()),
              })
            }
            className="w-full p-2 border border-gray-300 rounded-md focus:appearance-none 
            focus:outline-none focus:border-blue-500"
          />
        </div>
        {/* colors */}
        <div className="mb-6">
          <label className="block text-gray-800 font-semibold mb-2">
            Colors (comma separated)
          </label>
          <input
            type="text"
            name="colors"
            value={productsData.colors.join(",")}
            onChange={(e) =>
              setProductsData({
                ...productsData,
                colors: e.target.value.split(",").map((color) => color.trim()),
              })
            }
            className="w-full p-2 border border-gray-300 rounded-md focus:appearance-none 
            focus:outline-none focus:border-blue-500"
          />
        </div>
        {/* collections */}
        <div className="mb-6">
          <label className="block text-gray-800 font-semibold mb-2">
            Collection
          </label>
          <input
            type="text"
            name="collections"
            value={productsData.collections}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:appearance-none 
            focus:outline-none focus:border-blue-500"
          />
        </div>
        {/* material */}
        <div className="mb-6">
          <label className="block text-gray-800 font-semibold mb-2">
            Material
          </label>
          <input
            type="text"
            name="material"
            value={productsData.material}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:appearance-none 
            focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* gender */}
        <div className="mb-6">
          <label className="block text-gray-800 font-semibold mb-2">
            Gender
          </label>
          <select
            name="gender"
            value={productsData.gender}
            onChange={handleChange}
            className="max-w-full  p-2 border border-gray-100 rounded-md bg-white text-gray-800 
               focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 
               transition ease-in-out duration-150 cursor-pointer"
          >
            {/* <option value="">Select Gender</option> */}
            <option value="Men">Men</option>
            <option value="Women">Women</option>
          </select>
        </div>
        {/* images */}
        <div className="mb-6">
          <label className="block text-gray-800 font-semibold mb-2">
            Upload Image
          </label>
          <input
            type="file"
            onChange={handleImageUpload}
            className=" text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 
          file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 
          file:cursor-pointer focus:outline-none"
          />
          {uploadImage && <p>Uploading...</p>}
          <div className="flex gap-4 mt-4">
            {productsData.images.map((image, index) => (
              <div key={index}>
                <img
                  src={image.url}
                  alt={image.altText || "Product Image"}
                  className="w-20 h-20 object-cover rounded-md shadow-md"
                />
              </div>
            ))}
          </div>
        </div>
        {/* submit button */}
        <button
          type="submit"
          className="bg-green-500 w-full text-white py-2 px-4 rounded-md hover:bg-green-600 
          transition-colors cursor-pointer"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProductPage;
