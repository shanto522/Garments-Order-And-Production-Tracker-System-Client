import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [total, setTotal] = useState(0);

  const [visibleLimit, setVisibleLimit] = useState(
    window.innerWidth >= 1024 ? 9 : 10
  );

  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  useEffect(() => {
    axiosSecure
      .get(`/all-products?page=${page}&limit=${limit}`)
      .then((res) => {
        setProducts(res.data?.products || []);
        setTotal(res.data?.total || 0);
      })
      .catch(console.error);
  }, [axiosSecure, page, limit]);

  const totalPages = Math.ceil(total / limit);

  // Update visibleLimit on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setVisibleLimit(9);
      else setVisibleLimit(10);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl text-center font-bold mb-6">All Products</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products?.slice(0, visibleLimit).map((product) => (
          <div
            key={product._id}
            className="border rounded-lg shadow hover:shadow-lg transition p-4 flex flex-col"
          >
            {product.images?.length > 0 ? (
              <img
                src={product.images[0]}
                alt={product.name}
                className="h-48 w-full object-cover rounded mb-4"
              />
            ) : (
              <img
                src={product.imageURL || "/default-product.png"}
                alt={product.name}
                className="h-48 w-full object-cover rounded mb-4"
              />
            )}

            <h3 className="text-xl font-semibold">{product.name}</h3>
            <p className="text-gray-600">{product.category}</p>
            <p className="text-lime-500 font-bold text-lg">${product.price}</p>
            <p className="text-gray-700">Available: {product.quantity}</p>
            <p className="text-gray-700">
              Minimum Order: {product.minOrder || 1}
            </p>

            <button
              onClick={() => navigate(`/dashboard/product/${product._id}`)}
              className="mt-4 bg-lime-500 hover:bg-lime-700 text-white px-4 py-2 rounded font-semibold"
            >
              View Details
            </button>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-4 py-2 bg-gray-300 hover:bg-gray-400 disabled:bg-gray-200 rounded"
        >
          Previous
        </button>

        {/* Page number buttons */}
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
          <button
            key={num}
            onClick={() => setPage(num)}
            className={`px-3 py-1 rounded ${
              page === num
                ? "bg-lime-500 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {num}
          </button>
        ))}

        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 bg-gray-300 hover:bg-gray-400 disabled:bg-gray-200 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllProducts;
