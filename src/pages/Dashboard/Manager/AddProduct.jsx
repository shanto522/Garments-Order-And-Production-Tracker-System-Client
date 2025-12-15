import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const AddProduct = () => {
  const axiosSecure = useAxiosSecure();
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    category: "Shirt",
    price: "",
    availableQuantity: "",
    minimumOrder: "",
    images: [],
    demoVideo: "",
    paymentOption: "Cash on Delivery",
    showOnHome: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setProductData({ ...productData, [name]: checked });
    } else if (type === "file") {
      setProductData({ ...productData, images: Array.from(files) });
    } else {
      setProductData({ ...productData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const uploadedImages = [];
      for (const file of productData.images) {
        const formData = new FormData();
        formData.append("image", file);
        const res = await fetch(
          `https://api.imgbb.com/1/upload?key=${
            import.meta.env.VITE_IMAGE_HOST
          }`,
          { method: "POST", body: formData }
        );
        const data = await res.json();
        if (data.success) uploadedImages.push(data.data.url);
      }

      const finalProduct = { ...productData, images: uploadedImages };
      await axiosSecure.post("/products", finalProduct);
      toast.success("Product added successfully!");
      setProductData({
        name: "",
        description: "",
        category: "Shirt",
        price: "",
        availableQuantity: "",
        minimumOrder: "",
        images: [],
        demoVideo: "",
        paymentOption: "Cash on Delivery",
        showOnHome: false,
      });
    } catch (err) {
      console.error(err);
      toast.error("Failed to add product!");
    }
  };

  return (
    <div className=" p-4">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Add Product</h2>
      <div className="overflow-x-auto">
        <form
          onSubmit={handleSubmit}
          className="min-w-full border border-gray-200 shadow-md rounded-lg p-6 space-y-4 bg-white"
        >
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={productData.name}
            onChange={handleChange}
            className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={productData.description}
            onChange={handleChange}
            className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
          <select
            name="category"
            value={productData.category}
            onChange={handleChange}
            className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <option>Shirt</option>
            <option>T-Shirt</option>
            <option>Polo Shirt</option>
            <option>Pant</option>
            <option>Jeans</option>
            <option>Shorts</option>
            <option>Jacket</option>
            <option>Hoodie</option>
            <option>Sweater / Sweatshirt</option>
            <option>Coat</option>
            <option>Blazer</option>
            <option>Dress</option>
            <option>Skirt</option>
            <option>Kurta / Kurti</option>
            <option>Saree</option>
            <option>Salwar / Churidar</option>
            <option>Ethnic Wear / Traditional Wear</option>
            <option>Shoes / Footwear</option>
            <option>Sandals / Slippers</option>
            <option>Socks</option>
            <option>Hat / Cap</option>
            <option>Gloves</option>
            <option>Scarves / Stoles</option>
            <option>Bag / Backpack / Purse</option>
            <option>Belt</option>
            <option>Tie / Bowtie</option>
            <option>Jewelry / Accessories</option>
            <option>Sunglasses</option>
            <option>Underwear / Lingerie</option>
            <option>Nightwear / Pajamas</option>
            <option>Swimwear</option>
            <option>Activewear / Sportswear</option>
          </select>
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={productData.price}
            onChange={handleChange}
            className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
          <input
            type="number"
            name="availableQuantity"
            placeholder="Available Quantity"
            value={productData.availableQuantity}
            onChange={handleChange}
            className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
          <input
            type="number"
            name="minimumOrder"
            placeholder="Minimum Order Quantity"
            value={productData.minimumOrder}
            onChange={handleChange}
            className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
          <input
            type="file"
            name="images"
            multiple
            onChange={handleChange}
            className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
          <input
            type="text"
            name="demoVideo"
            placeholder="Demo Video URL"
            value={productData.demoVideo}
            onChange={handleChange}
            className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <select
            name="paymentOption"
            value={productData.paymentOption}
            onChange={handleChange}
            className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <option>Cash on Delivery</option>
            <option>Stripe</option>
          </select>
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              name="showOnHome"
              checked={productData.showOnHome}
              onChange={handleChange}
              className="w-5 h-5 accent-indigo-500"
            />
            <span className="text-gray-700 font-medium">Show on Home</span>
          </label>
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold transition duration-200 w-full md:w-auto"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
