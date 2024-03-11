import React from "react";
import Navbar from "../components/Navbar";

function AddProducts() {
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
              id="productName"
              name="productName"
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
              id="productDescription"
              name="productDescription"
              rows="3"
              className="mt-1 p-2 block w-full rounded-md border-gray-300"
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox h-4 w-4 text-indigo-600"
              />
              <span className="ml-2 text-sm text-white">Featured Product</span>
            </label>
          </div>
          <div className="mb-4">
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
