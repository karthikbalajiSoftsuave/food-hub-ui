import React from "react";

const FilterPopover: React.FC<{ filterProps: any }> = ({ filterProps }) => {
  return <div className="filterContainer">
    {/* {  filterProps.map((column: any, index: number) => {
        return(
            <div key={index} className="filterItems">
                <div className="filter-header">{column.label}</div>
                {column.type === 'select' ? }
            </div>
        )
    })} */}
    filterPOpover
  </div>;
};

export default FilterPopover;
