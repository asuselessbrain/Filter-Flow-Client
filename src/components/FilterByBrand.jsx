

const FilterByBrand = ({setBrand, setCurrentPage, brand }) => {
    return (
        <div className="flex-1">
          <select
            onChange={(e) => {
              setBrand(e.target.value);
              setCurrentPage(1);
            }}
            value={brand}
            name="brand"
            id="brand"
            className="border p-4 rounded-md"
          >
            <option value="">Filter By Brand</option>
            <option value="Brand A">Brand A</option>
            <option value="Brand B">Brand B</option>
            <option value="Brand C">Brand C</option>
          </select>
        </div>
    );
};

export default FilterByBrand;