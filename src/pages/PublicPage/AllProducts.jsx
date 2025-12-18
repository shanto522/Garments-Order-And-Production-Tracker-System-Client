import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(window.innerWidth >= 1024 ? 9 : 10);
  const [total, setTotal] = useState(0);

  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  // Update limit on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setLimit(9);
      else setLimit(10);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch products with dynamic limit
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
  const maxVisible = 5;

  const getPages = () => {
    const pages = [];
    let start = Math.max(1, page - Math.floor(maxVisible / 2));
    let end = start + maxVisible - 1;

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return { pages, start, end };
  };

  const { pages, start, end } = getPages();

  return (
    <div className="container mx-auto p-2">
      <h2 className="text-4xl text-center font-bold mb-6">All Products</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="rounded-lg shadow-2xl hover:shadow-lg transition p-3 flex flex-col"
          >
            {product.images?.length > 0 ? (
              <img
                src={product.images[0]}
                alt={product.name}
                className="h-48 w-full object-cover rounded-xl mb-4"
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
            <p className="text-gray-800 font-bold text-lg">${product.price}</p>
            <p className="text-gray-700">
              Available: {product.availableQuantity}
            </p>

            <button
              onClick={() => navigate(`/product/${product._id}`)}
              className="mt-4 bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded font-semibold"
            >
              View Details
            </button>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-6 flex-wrap">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-3 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-40"
          >
            Previous
          </button>

          {start > 1 && (
            <>
              <button
                onClick={() => setPage(1)}
                className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
              >
                1
              </button>
              <span className="px-1 text-gray-500">...</span>
            </>
          )}

          {pages.map((num) => (
            <button
              key={num}
              onClick={() => setPage(num)}
              className={`px-3 py-1 rounded transition ${
                page === num
                  ? "bg-lime-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {num}
            </button>
          ))}

          {end < totalPages && (
            <>
              <span className="px-1 text-gray-500">...</span>
              <button
                onClick={() => setPage(totalPages)}
                className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
              >
                {totalPages}
              </button>
            </>
          )}

          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="px-3 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default AllProducts;
