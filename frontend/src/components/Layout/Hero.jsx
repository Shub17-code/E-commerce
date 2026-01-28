import React from "react";
import heroimg from "../../assets/E-commerce.jpeg";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative">
      <img
        src={heroimg}
        alt="e-commerce"
        className="w-full h-[400px] md:h-[600px] lg:h-[750px] object-cover"
      />
      <div className="absolute inset-0 bg-opacity-5 flex items-center justify-center">
        <div className="text-center text-white p-6">
          <h1 className="text-4xl md:text-9xl font-bold tracking-tighter uppercase mb-4">
            Vacation <br /> Ready
          </h1>
          <p className="text-sm tracking-tighter md:text-lg mb-6">
            {" "}
            Explore our vacation-ready outfits with fast worldwide shopping
          </p>
          <Link
            to="#"
            className="bg-white text-gray-950 px-6 py-2 text-lg rounded-lg hover:bg-gray-400 transition cursor-pointer"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
