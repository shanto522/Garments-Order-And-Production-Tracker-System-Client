import React from "react";
import { useNavigate } from "react-router";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div className="border p-4 rounded-lg shadow hover:shadow-lg transition">
      <img
        src={product.images?.[0] || "/placeholder.png"}
        alt={product.name}
        className="w-full h-48 object-cover rounded"
      />
      <h3 className="font-bold text-lg mt-2">{product.name}</h3>
      <p className="text-gray-600 mt-1">
        {product.description?.slice(0, 60)}...
      </p>
      <p className="text-blue-600 font-semibold mt-1">${product.price}</p>
      <button
        onClick={() => navigate(`/dashboard/track-order/${product._id}`)}
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        View Details
      </button>
    </div>
  );
};

export default ProductCard;
