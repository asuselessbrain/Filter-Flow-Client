const MaxPrice = ({ maxPrice, setMaxPrice, setCurrentPage }) => {
  return (
    <div className="flex-1">
      <input
        type="number"
        placeholder="Max Price"
        value={maxPrice}
        onChange={(e) => {
          setMaxPrice(e.target.value);
          setCurrentPage(1);
        }}
        className="border p-4 rounded-md"
      />
    </div>
  );
};

export default MaxPrice;
