import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Card from "../../components/Card";
import Searchbar from "../../components/Searchbar";

const Home = () => {
  const { user, logOut } = useAuth();
  const [product, setProduct] = useState(null);
  const [productPerPage, setProductPerPage] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("");

  const { data: products = [] } = useQuery({
    queryKey: ["products", currentPage, productPerPage, filter, sort],
    queryFn: async () => {
      const { data } = await axios.get(
        `http://localhost:3000/products?page=${currentPage}&size=${productPerPage}&filter=${filter}&sort=${sort}`
      );
      return data;
    },
  });

  useEffect(() => {
    const productCount = async () => {
      const { data } = await axios.get(
        `http://localhost:3000/products-count?filter=${filter}`
      );
      setProduct(data.count);
    };
    productCount();
  }, [filter]);

  const numberOfPages = Math.ceil(product / productPerPage);
  const pages = [...Array(numberOfPages).keys()].map((element) => element + 1);

  const handleCurrentPage = (value) => {
    setCurrentPage(value);
  };

  return (
    <div className="max-w-[1440px] mx-auto">
      <Searchbar />
      <div>
        <select
          onChange={(e) => {
            setFilter(e.target.value);
            setCurrentPage(1);
          }}
          value={filter}
          name="category"
          id="category"
          className="border p-4 rounded-lg"
        >
          <option value="">Filter By Category</option>
          <option value="Accessories">Accessories</option>
          <option value="Electronics">Electronics</option>
          <option value="Fitness">Fitness</option>
          <option value="Furniture">Furniture</option>
          <option value="Home Appliances">Home Appliances</option>
          <option value="Home Automation">Home Automation</option>
          <option value="Kitchen Appliances">Kitchen Appliances</option>
          <option value="Outdoor">Outdoor</option>
          <option value="Personal Care">Personal Care</option>
          <option value="Wearables">Wearables</option>
        </select>
      </div>
      <div>
        <select
        onChange={(e) => {
          setSort(e.target.value);
          setCurrentPage(1);
        }}
        value={sort}
        name="sort" id="sort" className="border p-4 rounded-md">
          <option value="">Sort By Price</option>
          <option value="asc">Low to High</option>
          <option value="dsc">High to Low</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <Card key={product._id} product={product} />
        ))}
      </div>
      <div className="flex justify-center mt-12">
        <button
          onClick={() => handleCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 mx-1 text-gray-700 disabled:text-gray-500 capitalize bg-gray-200 rounded-md disabled:cursor-not-allowed disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:bg-blue-500  hover:text-white"
        >
          <div className="flex items-center -mx-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 mx-1 rtl:-scale-x-100"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 16l-4-4m0 0l4-4m-4 4h18"
              />
            </svg>

            <span className="mx-1">previous</span>
          </div>
        </button>

        {pages.map((btnNum) => (
          <button
            onClick={() => handleCurrentPage(btnNum)}
            key={btnNum}
            className={`hidden ${
              currentPage === btnNum ? "bg-blue-500 text-white" : ""
            } px-4 py-2 mx-1 transition-colors duration-300 transform  rounded-md sm:inline hover:bg-blue-500  hover:text-white`}
          >
            {btnNum}
          </button>
        ))}

        <button
          onClick={() => handleCurrentPage(currentPage + 1)}
          disabled={currentPage === numberOfPages}
          className="px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-gray-200 rounded-md hover:bg-blue-500 disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:text-white disabled:cursor-not-allowed disabled:text-gray-500"
        >
          <div className="flex items-center -mx-1">
            <span className="mx-1">Next</span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 mx-1 rtl:-scale-x-100"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Home;
