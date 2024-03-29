import React from "react";
// import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Link from "next/link";
import Image from "next/image";

import Moves from "./Moves";

function Card({ pokemon }) {
  return (
    <>
      <Link
        href={`/pokemon/[pokemon.id]`}
        as={`/pokemon/${pokemon.id}`}
        key={pokemon.id}
        passHref
      >
        <div className="bg-gray-100 m-5 rounded-lg px-6 py-6 w-[350px] transition transform hover:shadow-xl hover:scale-105 hover:bg-white cursor-pointer">
          <div className="text-center flex flex-col items-center">
            <Image
              src={pokemon.sprites.front_default}
              alt="pokemon"
              height={100}
              width={100}
            />
            <div className=" capitalize font-bold">{pokemon.name}</div>
          </div>
          <div className="flex justify-center mb-2 items-center">
            {pokemon.types.map((type, i) => {
              return (
                <div key={type + i} className="">
                  {type.type.name}
                </div>
              );
            })}
          </div>
          <p className="font-medium mt-2">Stats</p>
          <div className="flex ">
            <div className="stats-container gap-2 px-2 w-[300px]">
              {pokemon.stats.map((stat, i) => {
                if (i < 3) {
                  return (
                    <div
                      key={stat.stat.name + i}
                      className="ml-2 flex items-center gap-1 text-sm"
                    >
                      <span className="font-medium"> {stat.stat.name}</span> :
                      {"   "}
                      <span className="text-sm">{stat.base_stat}</span>
                    </div>
                  );
                }
              })}
            </div>
            <div className="h-[70px] border-r-2 border-gray-800 w-2"></div>

            <div className="stats-container gap-2 px-2 w-[300px]">
              {pokemon.stats.map((stat, i) => {
                if (i >= 3) {
                  return (
                    <div
                      key={stat.stat.name + i}
                      className="ml-2 flex items-center gap-1 text-sm"
                    >
                      <span className="font-medium"> {stat.stat.name}</span> :
                      {"   "}
                      <span className="text-sm">{stat.base_stat}</span>
                    </div>
                  );
                }
              })}
            </div>
          </div>
          <div>
            <hr className="border-1 mt-4 border-gray-600 " />
          </div>
          <div className=" ">
            <p className="font-medium mt-2">Moves</p>
            <div className="flex flex-wrap gap-8">
              <ul className="move-container ">
                {pokemon.moves.slice(0, 2).map((move, i) => {
                  return (
                    <li className="mt-1 ml-2  flex items-center gap-1" key={i}>
                      <span className="text-sm">
                        <Moves move={move.move} />
                      </span>
                    </li>
                  );
                })}
              </ul>
              <div className="h-[60px] border-r-2 border-gray-800 w-2"></div>
              <ul className="move-container ">
                {pokemon.moves.slice(2, 4).map((move, i) => {
                  return (
                    <li className="mt-1 ml-2  flex items-center gap-1" key={i}>
                      <span className="text-sm">
                        <Moves move={move.move} />
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}

export default Card;
