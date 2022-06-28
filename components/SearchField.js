import React from "react";
import { FaSearch } from "react-icons/fa";

const SearchInput = ({ ...rest }) => {
  return (
    <div className="flex items-center rounded-lg pl-2 text-[#b3c5cd] bg-[#eef3f6]">
      <FaSearch className="mr-3" />
      <input
        className="border-none bg-transparent py-3 w-full h-full outline-none text-[#b3c5cd]"
        {...rest}
      />
    </div>
  );
};

export default SearchInput;
