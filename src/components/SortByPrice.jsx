

const SortByPrice = ({setSort, setCurrentPage,sort }) => {
    return (
        <div className="flex-1">
          <select
            onChange={(e) => {
              setSort(e.target.value);
              setCurrentPage(1);
            }}
            value={sort}
            name="sort"
            id="sort"
            className="border p-4 rounded-md"
          >
            <option value="">Sort By Price</option>
            <option value="asc">Low to High</option>
            <option value="dsc">High to Low</option>
          </select>
        </div>
    );
};

export default SortByPrice;