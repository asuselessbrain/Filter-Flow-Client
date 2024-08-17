

const FilterByCategory = ({setFilter, setCurrentPage, filter }) => {
    return (
        <div className="flex-1">
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
    );
};

export default FilterByCategory;