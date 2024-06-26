import { useSearchParams } from "react-router-dom";
import Select from "./Select";

function SortBy({ options, sortField }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentSort = searchParams.get(sortField) || "";
  function handleChange(e) {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }
  return (
    <Select
      options={options}
      type={"white"}
      onChange={handleChange}
      value={currentSort}
    />
  );
}

export default SortBy;
