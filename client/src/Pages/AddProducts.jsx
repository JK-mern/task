import React, { useState } from "react";
import Navbar from "../components/Navbar";

function AddProducts() {
  const [file, setFile] = useState();
  const [url, setUrl] = useState("")
  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    featured: false,
    image: "",
  });

  const handleChange = (e) => {
    if (e.target.id === "featured")
      setFormData({ ...formData, [e.target.id]: !formData.featured });
    else {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    }
  };

  const uploadImage = async () => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
    data.append("cloud_name", import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);
    data.append("folder", "Cloudinary-React");
    
    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
        }/image/upload`,
        {
          method: "POST",
          body: data,
        }
      );
      const res = await response.json();
      setUrl(res.secure_url)
      setFormData ({...formData,image: res.secure_url } )
    } catch (error) {
      console.log(error);
    }
  };

  console.log(formData)

  return (
    <>
      <Navbar />
      <div className="max-w-screen-2xl  mx-auto px-4   ">
        <h2 className="text-2xl font-bold mb-4 mt-6 lg:mt-10">Add Product</h2>
        <form>
          <div className="mb-4">
            <label
              htmlFor="productName"
              className="block text-sm font-medium text-white"
            >
              Product Name
            </label>
            <input
              type="text"
              id="name"
              name="productName"
              onChange={handleChange}
              required
              className="mt-1 p-2 block w-full rounded-md border-gray-300"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="productDescription"
              className="block text-sm font-medium text-white"
            >
              Product Description
            </label>
            <textarea
              id="description"
              name="productDescription"
              onChange={handleChange}
              required
              rows="3"
              className="mt-1 p-2 block w-full rounded-md border-gray-300"
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox h-4 w-4 text-indigo-600"
                id="featured"
                onChange={handleChange}

              />
              <span className="ml-2 text-sm text-white">Featured Product</span>
            </label>
          </div>
          <div className="mb-4 gap-4 flex items-center justify-between">
            <div>
              <label
                htmlFor="image"
                className="block text-sm font-medium text-white"
              >
                Upload Image
              </label>
              <input
                type="file"
                id="image"
                name="image"
                onChange={handleFile}
                className="mt-4 block w-full text-sm text-gray-500
              file:me-4 file:py-2 file:px-4
              file:rounded-lg file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-600 file:text-white
              hover:file:bg-blue-700
              file:disabled:opacity-50 file:disabled:pointer-events-none"
                accept="image/*"
              />
            </div>
            <div className="mt-5">
              <button
                type="button"
                className="btn btn-success"
                onClick={uploadImage}
              >
                {" "}
                Upload
              </button>
            </div>
          </div>

          <div className="flex flex-col items-center">
            {url && (
              <img
                src={url}
                className="h-52 object-contain w-full max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl rounded-lg shadow-lg mx-auto"
                alt="Uploaded file"
              />
            )}
          </div>

          <div className="flex justify-center items-center mt-5">
            <button
              type="submit"
              className="bg-indigo-600 w-full text-white py-2 px-4 rounded-md hover:bg-indigo-700"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddProducts;
