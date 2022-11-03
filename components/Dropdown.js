import React, { useEffect, useRef, useState } from "react";
import { GoChevronDown } from "react-icons/go";

const Dropdown = ({ onSelect, allPokemons }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dataRef = useRef();

  useEffect(() => {
    if (dataRef && dataRef.current) {
      if (isOpen) {
        dataRef.current.style.maxHeight = `${dataRef.current.scrollHeight}px`;
      } else {
        dataRef.current.style.maxHeight = "0px";
      }
    }
  }, [isOpen]);

  const handleDropdownClick = () => {
    setIsOpen((s) => !s);
  };

  return (
    <div>
      <div>
        <h2 className="inline-block mr-10"> Select Type:</h2>
        <GoChevronDown
          onClick={handleDropdownClick}
          className={`inline-block cursor-pointer ease-in-out duration-300  ${
            isOpen ? "rotate-180" : "rotate-0"
          }  `}
        />
      </div>

      <div
        className={`dropdown-menu mt-4 bg-white rounded-lg transition-all ease-in duration-300 max-h-[0px] overflow-hidden `}
        ref={dataRef}
      >
        {[
          ...new Set(allPokemons.map((pokemon) => pokemon.types[0].type.name)),
        ].map((data) => {
          return (
            <div
              key={data}
              className={`flex gap-3 items-center font-normal capitalize first:mt-4 last:mb-4 my-2 ml-4`}
            >
              <input
                type="checkbox"
                className="mt-1"
                value={data}
                onChange={onSelect}
                id={data}
              />
              <label htmlFor={data} className="cursor-pointer">
                {data}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dropdown;
