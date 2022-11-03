import React from "react";
import SearchInput from "./SearchField";
import Dropdown from "./Dropdown";
import Link from "next/link";
import Image from "next/image";

const Sidebar = ({ searchQuery, onInputChange, allPokemons, onSelect }) => {
  return (
    <div className="sticky top-40 ">
      <div className="flex gap-20 flex-col pl-12 mt-[40px] ">
        <div className="md:w-[250px]">
          <SearchInput
            placeholder="Search name or type"
            onChange={onInputChange}
            value={searchQuery}
          />
        </div>
        <div className="font-bold">
          <div>
            <Dropdown allPokemons={allPokemons} onSelect={onSelect} />
          </div>
        </div>
        <Link href="/fight" className="inline-block" passHref>
          <div className="cursor-pointer text-xl">
            Fight Section
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/3/39/Pokeball.PNG"
              alt="pokeabll"
              height={40}
              width={40}
            />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
