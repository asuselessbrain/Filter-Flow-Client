const MinPrice = ({minPrice,setMinPrice,setCurrentPage}) => {
  return (
    <div className="flex-1">
      <input
        type="number"
        placeholder="Min Price"
        value={minPrice}
        onChange={(e) => {
          setMinPrice(e.target.value);
          setCurrentPage(1);
        }}
        className="border p-4 rounded-md"
      />
    </div>
  );
};

export default MinPrice;
