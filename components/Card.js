import React from "react";
// import typeColors from "../../helpers/typeColors";
// import "./style.css";

function Card({ pokemon }) {
  return (
    <div className="bg-white m-5 rounded-lg px-6 py-6 w-[300px] ">
      <div className="text-center flex flex-col items-center">
        <img src={pokemon.sprites.front_default} alt="pokemon image" />
        <div className=" capitalize font-bold">{pokemon.name}</div>
      </div>
      <div className="flex justify-center mb-2 items-center">
        {pokemon.types.map((type) => {
          return (
            <div key={type} className="">
              {type.type.name}
            </div>
          );
        })}
      </div>
      <div className=" ">
        <p className="font-medium mt-2">Stats</p>
        <div className="flex flex-wrap gap-2 w-[300px]">
          {pokemon.stats.map((stat, i) => (
            <p key={stat.stat.name + i} className="ml-2">
              {stat.stat.name}
            </p>
          ))}
        </div>
      </div>
      <div className=" ">
        <p className="font-medium mt-2">Moves</p>
        <div className="flex felx-wrap gap-8">
          <ul>
            {pokemon.moves.slice(0, 2).map((move) => (
              <li className="mt-1 ml-2" key={move.name}>
                {move.move.name}
              </li>
            ))}
          </ul>
          <ul>
            {pokemon.moves.slice(2, 4).map((move) => (
              <li className="mt-1" key={move.name}>
                {move.move.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Card;
