import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import ManageProductModal from "../../../components/Modal/ManageProductModal";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { Delete, PackageSearch, RefreshCw } from "lucide-react";
import allProductIcon from '../../../assets/package.png'
import updateIcon from "../../../assets/update.png";
import deleteIcon from "../../../assets/bin.png";
const AllProductsAdmin = () => {
  const [products, setProducts] = useState([]);
  const [modalData, setModalData] = useState(null);
  const [page, setPage] = useState(1);
  const limit = 10; // 10 products per page
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure.get("/products").then((res) => {
      const sorted = res.data.sort((a, b) => (a._id < b._id ? 1 : -1));
      setProducts(sorted);
    });
  }, [axiosSecure]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete the product?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/products/${id}`)
          .then(() => {
            setProducts(products.filter((p) => p._id !== id));
            Swal.fire("Deleted!", "Product has been deleted.", "success");
          })
          .catch((err) => {
            console.error(err);
            Swal.fire("Error!", "Failed to delete product.", "error");
          });
      }
    });
  };

  const toggleShowOnHome = (id, currentValue) => {
    axiosSecure
      .put(`/products/${id}`, { showOnHome: !currentValue })
      .then(() => {
        setProducts(
          products.map((p) =>
            p._id === id ? { ...p, showOnHome: !currentValue } : p
          )
        );
      });
  };

  const handleUpdate = (product) => setModalData(product);

  const handleModalSubmit = (updatedProduct) => {
    axiosSecure
      .put(`/products/${modalData._id}`, updatedProduct)
      .then(() => {
        setProducts(
          products.map((p) =>
            p._id === modalData._id ? { ...p, ...updatedProduct } : p
          )
        );
        setModalData(null);
        toast.success("Product updated successfully!"); // ✅ Hot toast success
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to update product!"); // ✅ Hot toast error
      });
  };

  // Pagination logic
  const totalPages = Math.ceil(products.length / limit);
  const paginatedProducts = products.slice((page - 1) * limit, page * limit);

  return (
    <div className="p-4">
      <h2 className="text-3xl flex items-center gap-3 md:text-4xl font-bold mb-6 text-gray-800">
        <img src={allProductIcon} className="h-10 w-10" alt="" /> All Products Admin
      </h2>

      <div className="overflow-x-auto shadow-md rounded-lg bg-white">
        <table className="min-w-full border border-gray-200 text-sm md:text-base">
          <thead className="bg-gray-100">
            <tr>
              <th className="border-b p-3 text-left text-gray-600 uppercase tracking-wider">
                Image
              </th>
              <th className="border-b p-3 text-left text-gray-600 uppercase tracking-wider">
                Product Name
              </th>
              <th className="border-b p-3 text-left text-gray-600 uppercase tracking-wider">
                Price
              </th>
              <th className="border-b p-3 text-left text-gray-600 uppercase tracking-wider">
                Category
              </th>
              <th className="border-b p-3 text-left text-gray-600 uppercase tracking-wider">
                Created By
              </th>
              <th className="border-b p-3 text-center text-gray-600 uppercase tracking-wider">
                Show on Home
              </th>
              <th className="border-b p-3 text-left text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedProducts.length > 0 ? (
              paginatedProducts.map((p) => (
                <tr
                  key={p._id}
                  className="hover:bg-gray-50 transition duration-200"
                >
                  <td className="p-3">
                    <img
                      src={p.images[0]}
                      alt={p.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                  </td>
                  <td className="p-3 text-gray-700 font-medium">{p.name}</td>
                  <td className="p-3 text-gray-700">{p.price}</td>
                  <td className="p-3 text-gray-700">{p.category}</td>
                  <td className="p-3 text-gray-700">{p.createdBy}</td>
                  <td className="p-3 text-center">
                    <input
                      type="checkbox"
                      checked={p.showOnHome || false}
                      onChange={() => toggleShowOnHome(p._id, p.showOnHome)}
                      className="w-5 h-5"
                    />
                  </td>
                  <td className="p-3 flex flex-wrap gap-2 sm:flex-nowrap">
                    <button
                      onClick={() => handleUpdate(p)}
                      className="bg-blue-600 flex justify-center items-center gap-1 hover:bg-blue-700 text-white px-3 py-2 rounded-md transition duration-200 flex-1 sm:flex-auto cursor-pointer"
                    >
                     <img src={updateIcon} className="h-4 w-4 md:h-6 md:w-6" alt="" />  Update
                    </button>
                    <button
                      onClick={() => handleDelete(p._id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 flex justify-center items-center gap-1 rounded-md transition duration-200 flex-1 sm:flex-auto cursor-pointer"
                    >
                    <img src={deleteIcon} className="h-4 w-4 md:h-6 md:w-6" alt="" /> Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center p-5 text-gray-500">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
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

      {modalData && (
        <ManageProductModal
          product={modalData}
          onClose={() => setModalData(null)}
          onSubmit={handleModalSubmit}
        />
      )}
    </div>
  );
};

export default AllProductsAdmin;
