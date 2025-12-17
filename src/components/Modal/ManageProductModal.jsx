import { useState } from "react";

const ManageProductModal = ({ product, onClose, onSubmit }) => {
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const [category, setCategory] = useState(product.category);
  const [description, setDescription] = useState(product.description || "");
  const [images, setImages] = useState(product.images || []);
  const [demoVideo, setDemoVideo] = useState(product.demoVideo || "");
  const [paymentOption, setPaymentOption] = useState(
    product?.paymentOption ?? "Cash on Delivery"
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      name,
      price,
      category,
      description,
      images,
      demoVideo,
      paymentOption,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg relative">
        <h3 className="text-xl font-bold mb-4">Update Product</h3>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block mb-1">Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border p-2 w-full rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-1">Price:</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="border p-2 w-full rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-1">Category:</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border p-2 w-full rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-1">Description:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border p-2 w-full rounded"
            />
          </div>

          <div>
            <label className="block mb-1">Images (comma separated URLs):</label>
            <input
              type="text"
              value={images.join(",")}
              onChange={(e) => setImages(e.target.value.split(","))}
              className="border p-2 w-full rounded"
            />
          </div>

          <div>
            <label className="block mb-1">Demo Video URL:</label>
            <input
              type="text"
              value={demoVideo}
              onChange={(e) => setDemoVideo(e.target.value)}
              className="border p-2 w-full rounded"
            />
          </div>

          <div>
            <label className="block mb-1">Payment Options:</label>
            <select
              value={paymentOption}
              onChange={(e) => setPaymentOption(e.target.value)}
              className="border p-2 w-full rounded"
            >
              <option value="Cash on Delivery">Cash on Delivery</option>
              <option value="Stripe">Stripe</option>
            </select>
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-lime-500 text-white rounded hover:bg-lime-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ManageProductModal;
