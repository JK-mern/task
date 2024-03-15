import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";

function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [products, setProducts] = useState([]);
  const [category, setCategory ] = useState('all')
  const nextSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === featuredProducts.length - 1 ? 0 : prevIndex + 1
    );
  };
  const prevSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? featuredProducts.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const findfeaturedProducts = async () => {
      const res = await axios.get("/api/product/featuredProduct");
      const data = res.data;
      const images = data.map((item) => item.image);
      setFeaturedProducts(images);
    };

    findfeaturedProducts();
  }, []);

  useEffect (()=>{
    const sortProducts = async() =>{
      let products = await axios.get(`/api/product/sort/${category}`)
      setProducts(products.data)
    }
    sortProducts()
  },[category])

  const handleChange = (e) =>{
    setCategory(e.target.value)
  }

  // useEffect(() => {
  //   const normalProduct = async () => {
  //     const products = await axios.get("/api/product/normalProduct");
  //     setProducts(products.data);
  //   };

  //   normalProduct();
  // }, []);


  return (
    <div>
      <Navbar />

      {featuredProducts && (
        <div className="carousel w-full">
          <div
            id="slide1"
            className="carousel-item relative  w-full  h-[200px] md:h-[450px] "
          >
            <img src={featuredProducts[activeIndex]} className="w-full " />
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <button onClick={prevSlide} className="btn btn-circle">
                ❮
              </button>
              <button onClick={nextSlide} className="btn btn-circle">
                ❯
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="max-w-screen-2xl mx-auto   flex mt-5  mb-4 p-3 gap-5 items-center">
        <label
          htmlFor="productCategory"
          className=" text-lg font-medium text-white"
        >
          Product Category :
        </label>
        <select
          id="category"
          name="category"
          onChange={handleChange}
          className="mt-1 p-3 block w-96 text-white bg-slate-800 rounded-xl border-gray-300  lowercase"
        >
          <option value="" disabled>
            Select a category
          </option>
          <option value="all">all</option>
          <option value="smartphone">Smartphone</option>
          <option value="camera">Camera</option>
          <option value="clothes">Clothes</option>
          <option value="food">Food</option>
          <option value="laptop">Laptop</option>
        </select>
      </div>

      <div className="max-w-screen-2xl mx-auto  flex flex-col flex-wrap md:flex-row gap-6 m-10  ">
        {products &&
          products.map((product) => (
            <div className="  mr-3 lg:mr-0 px-3 gap-4   mt-5 shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]">
              <img
                src={product.image}
                alt=""
                className="h-[320px] sm:h-[220px] w-full object-cover  lg:hover:scale-110  lg:transition-scale  lg:duration-300"
              />
              <div className="p-3 flex flex-col gap-2 w-full ">
                <p className="text-white text-lg  font-semibold truncate my-3">
                  {product.name}
                </p>

                <p className="text-sm text-white line-clamp-3">
                  {product.description}
                </p>
              </div>
              <button className="btn btn-primary rounded-md  w-full my-3">
                Buy Now
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Home;
