import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";
import UpdateProductModal from "../../../components/Modal/UpdateProductModal";
import Swal from "sweetalert2";

const ManageProducts = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Pagination states
  const [page, setPage] = useState(1);
  const limit = 10;

  useEffect(() => {
    axiosSecure.get("/products").then((res) => setProducts(res.data));
  }, [axiosSecure]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to delete this product!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/products/${id}`)
          .then(() => {
            setProducts(products.filter((p) => p._id !== id));
            toast.success("Product deleted successfully!");
          })
          .catch(() => toast.error("Failed to delete product!"));
      }
    });
  };

  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleUpdate = (updatedProduct) => {
    setProducts((prev) =>
      prev.map((p) => (p._id === updatedProduct._id ? updatedProduct : p))
    );
  };

  // Search filtering
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination calculation
  const totalPages = Math.ceil(filteredProducts.length / limit);
  const paginatedProducts = filteredProducts.slice(
    (page - 1) * limit,
    page * limit
  );

  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Manage Products</h2>

      <input
        type="text"
        placeholder="Search by name"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1); // Search করলে পেজ ১-এ ফিরে যাবে
        }}
        className="border p-3 w-full rounded-md mb-6 focus:ring-2 focus:ring-indigo-400"
      />

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 shadow-md rounded-lg table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Image</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Payment Mode</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedProducts.length > 0 ? (
              paginatedProducts.map((p) => (
                <tr key={p._id} className="hover:bg-gray-50">
                  <td className="p-3">
                    <img
                      src={p.images[0]}
                      alt={p.name}
                      className="w-16 h-16 rounded-md object-cover"
                    />
                  </td>
                  <td className="p-3">{p.name}</td>
                  <td className="p-3">{p.price}</td>
                  <td className="p-3">{p.paymentOption}</td>

                  <td className="p-3 flex flex-col sm:flex-row gap-2">
                    {p.managerEmail === user?.email ? (
                      <>
                        <button
                          onClick={() => openModal(p)}
                          className="bg-blue-600 px-3 py-2 text-white rounded w-full sm:w-auto"
                        >
                          Update
                        </button>
                        <button
                          onClick={() => handleDelete(p._id)}
                          className="bg-red-600 px-3 py-2 text-white rounded w-full sm:w-auto"
                        >
                          Delete
                        </button>
                      </>
                    ) : (
                      <span className="text-gray-400">No Actions</span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center p-5 text-gray-500">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Buttons */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-6">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 disabled:bg-gray-200 rounded"
          >
            Previous
          </button>

          <span className="font-semibold">
            Page {page} of {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 disabled:bg-gray-200 rounded"
          >
            Next
          </button>
        </div>
      )}

      {selectedProduct && (
        <UpdateProductModal
          product={selectedProduct}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
};

export default ManageProducts;
