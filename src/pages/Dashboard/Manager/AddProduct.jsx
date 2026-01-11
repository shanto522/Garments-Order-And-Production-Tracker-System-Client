import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { CirclePlus, PlusSquare } from "lucide-react";
import addIcon from '../../../assets/add-product.png'
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
  const [previewImages, setPreviewImages] = useState([]);
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "checkbox") {
      setProductData({ ...productData, [name]: checked });
    } else if (type === "file") {
      const fileArray = Array.from(files);
      setProductData({ ...productData, images: fileArray });

      // preview URLs generate
      const previewArray = fileArray.map((file) => URL.createObjectURL(file));
      setPreviewImages(previewArray);
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
      setPreviewImages([]);
    } catch (err) {
      console.error(err);
      toast.error("Failed to add product!");
    }
  };

  return (
    <div className=" p-4">
      <h2 className="text-3xl flex items-center gap-3 font-bold mb-6 text-gray-800"><img src={addIcon} className="h-10 w-10" alt="" /> Add Product</h2>
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
            <option value="">Select Category</option>

            {/* MEN */}
            <option value="men-shirt">Men Shirt</option>
            <option value="men-tshirt">Men T-Shirt</option>
            <option value="men-polo">Men Polo Shirt</option>
            <option value="panjabi">Panjabi / Punjabi</option>
            <option value="men-hoodie">Men Hoodie</option>
            <option value="men-sweater">Men Sweater</option>
            <option value="men-jacket">Men Jacket</option>
            <option value="men-blazer">Men Blazer</option>
            <option value="men-coat">Men Coat</option>
            <option value="men-pant">Men Pant / Trouser</option>
            <option value="men-jeans">Men Jeans</option>
            <option value="men-shorts">Men Shorts</option>
            <option value="men-cargo">Men Cargo Pant</option>

            {/* WOMEN */}
            <option value="women-top">Women Top</option>
            <option value="women-tshirt">Women T-Shirt</option>
            <option value="women-blouse">Women Blouse</option>
            <option value="kurti">Kurti</option>
            <option value="women-tunic">Women Tunic</option>
            <option value="women-pant">Women Pant</option>
            <option value="women-jeans">Women Jeans</option>
            <option value="leggings">Leggings</option>
            <option value="skirt">Skirt</option>
            <option value="palazzo">Palazzo</option>
            <option value="dress">Dress</option>
            <option value="gown">Gown</option>
            <option value="jumpsuit">Jumpsuit</option>
            <option value="saree">Saree</option>
            <option value="salwar">Salwar / Churidar</option>
            <option value="lehenga">Lehenga</option>
            <option value="anarkali">Anarkali</option>

            {/* KIDS */}
            <option value="baby-wear">Baby Wear</option>
            <option value="kids-tshirt">Kids T-Shirt</option>
            <option value="kids-shirt">Kids Shirt</option>
            <option value="kids-pant">Kids Pant</option>
            <option value="kids-shorts">Kids Shorts</option>
            <option value="kids-dress">Kids Dress</option>
            <option value="kids-hoodie">Kids Hoodie</option>
            <option value="school-uniform">School Uniform</option>

            {/* COMMON */}
            <option value="activewear">Activewear / Sportswear</option>
            <option value="nightwear">Nightwear / Pajamas</option>
            <option value="swimwear">Swimwear</option>
            <option value="innerwear">Innerwear</option>
            <option value="loungewear">Loungewear</option>

            {/* ACCESSORIES */}
            <option value="accessories">Accessories</option>
          </select>
          <input
            type="number"
            name="price"
            placeholder="Price"
            min="0"
            value={productData.price}
            onChange={handleChange}
            className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
          <input
            type="number"
            name="availableQuantity"
            placeholder="Available Quantity"
            min="0"
            value={productData.availableQuantity}
            onChange={handleChange}
            className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
          <input
            type="number"
            name="minimumOrder"
            min="1"
            placeholder="Minimum Order Quantity"
            value={productData.minimumOrder}
            onChange={handleChange}
            className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
          {previewImages.length > 0 && (
            <div className="flex gap-2 mt-2">
              {previewImages.map((url, idx) => (
                <img
                  key={idx}
                  src={url}
                  alt={`preview-${idx}`}
                  className=" rounded-xl h-50 object-cover"
                />
              ))}
            </div>
          )}
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
            className="bg-indigo-600 hover:bg-indigo-700 flex justify-center items-center gap-3 text-white px-6 py-3 rounded-lg font-semibold transition duration-200 w-full md:w-auto"
          >
           <CirclePlus /> Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
