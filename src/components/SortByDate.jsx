const SortByDate = ({ setSortByDate, setCurrentPage, sortByDate }) => {
  return (
    <div className="flex-1">
      <select
        onChange={(e) => {
          setSortByDate(e.target.value);
          setCurrentPage(1);
        }}
        value={sortByDate}
        name="sortByDate"
        id="sortByDate"
        className="border p-4 rounded-md"
      >
        <option value="">Sort By Date</option>
        <option value="dsc">Newest First</option>
        <option value="asc">Oldest First</option>
      </select>
    </div>
  );
};

export default SortByDate;
