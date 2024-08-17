import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Card from "../../components/Card";
import Searchbar from "../../components/Searchbar";
import Navbar from "../../components/Navbar";
import Spinner from "../../components/Spinner/Spinner";
import Footer from "../../components/Footer";
import NoProductFound from "../../components/NoProductFound";
import FilterByCategory from "../../components/FilterByCategory";
import FilterByBrand from "../../components/FilterByBrand";
import SortByPrice from "../../components/SortByPrice";
import SortByDate from "../../components/SortByDate";
import MinPrice from "../../components/MinPrice";
import MaxPrice from "../../components/MaxPrice";

const Home = () => {
  const { user, logOut } = useAuth();
  const [product, setProduct] = useState(null);
  const [productPerPage, setProductPerPage] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");
  const [searchText, setSearchText] = useState("");
  const [sortByDate, setSortByDate] = useState("");
  const [minPrice, setMinPrice] = useState(""); // Added state for minimum price
  const [maxPrice, setMaxPrice] = useState("");
  const [brand, setBrand] = useState("");

  const { data: products = [] } = useQuery({
    queryKey: [
      "products",
      currentPage,
      productPerPage,
      filter,
      sort,
      search,
      sortByDate,
      minPrice,
      maxPrice,
      brand,
    ],
    queryFn: async () => {
      const { data } = await axios.get(
        `https://filter-flow-server-rho.vercel.app/products?page=${currentPage}&size=${productPerPage}&filter=${filter}&sort=${sort}&search=${search}&sortByDate=${sortByDate}&minPrice=${minPrice}&maxPrice=${maxPrice}&brand=${brand}`
      );
      return data;
    },
  });

  useEffect(() => {
    const productCount = async () => {
      const { data } = await axios.get(
        `https://filter-flow-server-rho.vercel.app/products-count?filter=${filter}&search=${search}&minPrice=${minPrice}&maxPrice=${maxPrice}&brand=${brand}`
      );
      setProduct(data.count);
    };
    productCount();
  }, [filter, search, minPrice, maxPrice, brand]);

  const numberOfPages = Math.ceil(product / productPerPage);
  const pages = [...Array(numberOfPages).keys()].map((element) => element + 1);

  const handleCurrentPage = (value) => {
    setCurrentPage(value);
  };

  const handleReset = () => {
    setSort("");
    setFilter("");
    setSearch("");
    setSearchText("");
    setSortByDate("");
    setMinPrice("");
    setMaxPrice("");
    setBrand("");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(searchText);
  };
  if(product === 0 ) return <NoProductFound />
  

  return (
    <div className="max-w-[1440px] mx-auto">
      <Navbar />

      <div className="flex justify-between overflow-x-auto gap-4 items-center m-3">
        <FilterByCategory filter={filter} setCurrentPage={setCurrentPage} setFilter={setFilter} />
        <FilterByBrand brand={brand} setCurrentPage={setCurrentPage} setBrand={setBrand} />
        <SortByPrice sort={sort} setCurrentPage={setCurrentPage} setSort={setSort} />
        <SortByDate sortByDate={sortByDate} setCurrentPage={setCurrentPage} setSortByDate={setSortByDate} />
        <MinPrice setCurrentPage={setCurrentPage} setMinPrice={setMinPrice} minPrice={minPrice} />
        <MaxPrice setCurrentPage={setCurrentPage} setMaxPrice={setMaxPrice} maxPrice={maxPrice} />

        <button
          onClick={handleReset}
          className="btn bg-pink-600 hover:bg-pink-700 text-white flex-1"
        >
          Reset
        </button>
      </div>
      <Searchbar
        handleSearch={handleSearch}
        setSearchText={setSearchText}
        searchText={searchText}
      />
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
      <Footer />
    </div>
  );
};

export default Home;
