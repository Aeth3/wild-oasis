import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
// import { useState } from "react";
import useCabins from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";
// import { useEffect, useState } from "react";

// const TableHeader = styled.header`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;

//   background-color: var(--color-grey-50);
//   border-bottom: 1px solid var(--color-grey-100);
//   text-transform: uppercase;
//   letter-spacing: 0.4px;
//   font-weight: 600;
//   color: var(--color-grey-600);
//   padding: 1.6rem 2.4rem;
// `;

function CabinTable() {
  const [searchParams] = useSearchParams();
  // const [isAnyDeleting, setIsAnyDeleting] = useState(false);
  const { cabins, isLoading } = useCabins();
  // const [currentFormIndex, setCurrentFormIndex] = useState(null);
  // const sortedCabins = cabins?.sort((a, b) => a.name - b.name);
  // function handleSelected(index) {
  //   setCurrentFormIndex(index !== currentFormIndex ? index : null);
  // }

  // const [filteredCabins, setFilteredCabins] = useState(sortedCabins);
  const filterValue = searchParams.get("discount") || "all";

  let filteredCabins;

  if (filterValue === "all") filteredCabins = cabins;
  if (filterValue === "no-discount")
    filteredCabins = cabins?.filter((cabin) => cabin.discount === 0);
  if (filterValue === "with-discount")
    filteredCabins = cabins?.filter((cabin) => cabin.discount > 0);

  const sortValue = searchParams.get("sortBy") || "name-asc";
  const [field, direction] = sortValue.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  const sortedCabins = filteredCabins?.sort(
    (a, b) => (a[field] - b[field]) * modifier
  );
  // if (sortValue === "name-asc")
  //   sortedCabins = cabins?.sort((a, b) => a.name - b.name);
  // if (sortValue === "name-desc")
  //   sortedCabins = cabins?.sort((a, b) => b.name - a.name);
  // if (sortValue === "regularPrice-asc")
  //   sortedCabins = cabins?.sort((a, b) => a.regularPrice - b.regularPrice);
  // if (sortValue === "regularPrice-desc")
  //   sortedCabins = cabins?.sort((a, b) => b.regularPrice - a.regularPrice);
  // if (sortValue === "maxCapacity-asc")
  //   sortedCabins = cabins?.sort((a, b) => a.maxCapacity - b.maxCapacity);
  // if (sortValue === "maxCapacity-desc")
  //   sortedCabins = cabins?.sort((a, b) => b.maxCapacity - a.maxCapacity);
  // if (sortValue === "discount-asc")
  //   sortedCabins = cabins?.sort((a, b) => a.discount - b.discount);
  // if (sortValue === "discount-desc")
  //   sortedCabins = cabins?.sort((a, b) => b.discount - a.discount);

  // useEffect(
  //   function () {
  //     function filterCabins() {
  //       if (filterValue === "no-discount") {
  //         const noDiscountCabins = sortedCabins?.filter(
  //           (cabin) => cabin.discount === 0
  //         );
  //         setFilteredCabins(noDiscountCabins);
  //       } else if (filterValue === "with-discount") {
  //         const noDiscountCabins = sortedCabins?.filter(
  //           (cabin) => cabin.discount > 0
  //         );
  //         setFilteredCabins(noDiscountCabins);
  //       } else {
  //         setFilteredCabins(sortedCabins);
  //       }
  //     }
  //     filterCabins();
  //   },
  //   [filterValue, sortedCabins]
  // );
  if (isLoading) return <Spinner />;
  if (!cabins.length) return <Empty resourceName={"cabins"} />;
  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={sortedCabins}
          render={(cabin, i) => (
            <CabinRow
              key={cabin.id}
              cabin={cabin}
              index={i}
              // currentFormIndex={currentFormIndex}
            />
          )}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
