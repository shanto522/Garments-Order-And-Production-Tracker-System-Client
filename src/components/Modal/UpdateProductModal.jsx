import { useState } from "react";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const UpdateProductModal = ({ product, isOpen, onClose, onUpdate }) => {
  const axiosSecure = useAxiosSecure();
  const [formData, setFormData] = useState({
    name: product?.name || "",
    description: product?.description || "",
    category: product?.category || "Shirt",
    price: product?.price || "",
    availableQuantity: product?.availableQuantity || "",
    minimumOrder: product?.minimumOrder || "",
    demoVideo: product?.demoVideo || "",
    paymentOption: product?.paymentOption || "Cash on Delivery",
    showOnHome: product?.showOnHome || false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") setFormData({ ...formData, [name]: checked });
    else setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosSecure.put(`/products/${product._id}`, formData);
      toast.success("Product updated successfully!");
      onUpdate(formData);
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update product!");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 font-bold"
        >
          X
        </button>
        <h2 className="text-2xl font-bold mb-4">Update Product</h2>
        <form className="space-y-3" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Product Name"
            className="border p-2 w-full rounded"
            required
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="border p-2 w-full rounded"
            required
          />
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          >
            <option>Shirt</option>
            <option>Pant</option>
            <option>Jacket</option>
            <option>Accessories</option>
          </select>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
            className="border p-2 w-full rounded"
            required
          />
          <input
            type="number"
            name="availableQuantity"
            value={formData.availableQuantity}
            onChange={handleChange}
            placeholder="Available Quantity"
            className="border p-2 w-full rounded"
            required
          />
          <input
            type="number"
            name="minimumOrder"
            value={formData.minimumOrder}
            onChange={handleChange}
            placeholder="Minimum Order"
            className="border p-2 w-full rounded"
            required
          />
          <input
            type="text"
            name="demoVideo"
            value={formData.demoVideo}
            onChange={handleChange}
            placeholder="Demo Video URL"
            className="border p-2 w-full rounded"
          />
          <select
            name="paymentOption"
            value={formData.paymentOption}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          >
            <option>Cash on Delivery</option>
            <option>PayFirst</option>
          </select>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="showOnHome"
              checked={formData.showOnHome}
              onChange={handleChange}
            />
            Show on Home
          </label>
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProductModal;
