import { useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Card from "../../components/Card";

const Home = () => {
  const { user, logOut } = useAuth();

  const { data: products = [] } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data } = await axios.get("http://localhost:3000/products/");
      return data;
    },
  });

  return (
    <div className="max-w-[1440px] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <Card key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Home;
