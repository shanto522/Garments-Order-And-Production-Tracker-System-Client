import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const UpdateProductModal = ({ product, isOpen, onClose, onUpdate }) => {
  const axiosSecure = useAxiosSecure();

  // formData state
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "Shirt",
    price: "",
    availableQuantity: "",
    minimumOrder: "",
    demoVideo: "",
    paymentOption: "Cash on Delivery",
    showOnHome: false,
  });

  // Update formData whenever a new product is selected
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        description: product.description || "",
        category: product.category || "Shirt",
        price: product.price || "",
        availableQuantity: product.availableQuantity || "",
        minimumOrder: product.minimumOrder || "",
        demoVideo: product.demoVideo || "",
        paymentOption: product.paymentOption || "Cash on Delivery",
        showOnHome: product.showOnHome || false,
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosSecure.put(`/products/${product._id}`, formData);
      toast.success("Product updated successfully!");
      onUpdate({ ...product, ...formData });
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update product!");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 px-4 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-lg relative">
        <button
          onClick={onClose}
          className="absolute top-4 px-4 py-2 bg-gray-500 right-2 text-white rounded-xl cursor-pointer font-bold"
        >
          Close
        </button>
        <h2 className="text-2xl font-bold mb-4">Update Product</h2>

        <form className="space-y-3" onSubmit={handleSubmit}>
          <div>
            <label className="font-semibold mb-1 block">Product Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Product Name"
              className="border p-2 w-full rounded"
              required
            />
          </div>

          <div>
            <label className="font-semibold mb-1 block">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description"
              className="border p-2 w-full rounded"
              required
            />
          </div>

          <div>
            <label className="font-semibold mb-1 block">Category</label>
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
          </div>

          <div>
            <label className="font-semibold mb-1 block">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Price"
              className="border p-2 w-full rounded"
              required
            />
          </div>

          <div>
            <label className="font-semibold mb-1 block">
              Available Quantity
            </label>
            <input
              type="number"
              name="availableQuantity"
              value={formData.availableQuantity}
              onChange={handleChange}
              placeholder="Available Quantity"
              className="border p-2 w-full rounded"
              required
            />
          </div>

          <div>
            <label className="font-semibold mb-1 block">Minimum Order</label>
            <input
              type="number"
              name="minimumOrder"
              value={formData.minimumOrder}
              onChange={handleChange}
              placeholder="Minimum Order"
              className="border p-2 w-full rounded"
              required
            />
          </div>

          <div>
            <label className="font-semibold mb-1 block">Demo Video URL</label>
            <input
              type="text"
              name="demoVideo"
              value={formData.demoVideo}
              onChange={handleChange}
              placeholder="Demo Video URL"
              className="border p-2 w-full rounded"
            />
          </div>

          <div>
            <label className="font-semibold mb-1 block">Payment Option</label>
            <select
              name="paymentOption"
              value={formData.paymentOption}
              onChange={handleChange}
              className="border p-2 w-full rounded"
            >
              <option>Cash on Delivery</option>
              <option>Stripe</option>
            </select>
          </div>

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
