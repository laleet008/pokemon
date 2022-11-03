import React, { useEffect, useState } from "react";

import styles from "./pokemon-fight.module.scss";

import Card from "../../components/Card";
import Battle from "./Battle";

const PokemonFight = ({ data }) => {
  const pokeData = data.results;
  const [selectedPokemon1, setSelectedPokemon1] = useState();
  const [selectedPokemon2, setSelectedPokemon2] = useState();
  const [pokemon1, setPokemon1] = useState();
  const [pokemon2, setPokemon2] = useState();
  const [resetBattle, setResetBattle] = useState(false);
  const [move1, setMove1] = useState([]);
  const [move2, setMove2] = useState([]);



  // const PokemonHP1 = pokemon1.stats[0].base_stat;
  // const PokemonHP2 = pokemon1.stats[0].base_stat;

  useEffect(() => {
    if (resetBattle) {
      setMove1([]);
      setMove2([]);
      setResetBattle(false);
    }
  }, [resetBattle, setResetBattle]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(selectedPokemon1);
      const res = await data.json();
      setPokemon1(res);
    };
    if (selectedPokemon1) {
      fetchData();
    }
  }, [selectedPokemon1]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(selectedPokemon2);
      const res = await data.json();
      setPokemon2(res);
    };
    if (selectedPokemon2) {
      fetchData();
    }
  }, [selectedPokemon2]);

  // random move for pokemon 1
  useEffect(() => {
    const getMovesDetails = async (url) => {
      const power1 = fetch(url)
        .then((res) => res.json())
        .then((data) => {
          setMove1((s) => [...s, data.power || 0]);
        });
      return power1;
    };
    if (pokemon1) {
      for (let move of pokemon1.moves.slice(0, 4)) {
        getMovesDetails(move.move.url);
      }
    }
  }, [pokemon1]);

  // random move for pokemon 2
  useEffect(() => {
    const getMovesDetails = async (url) => {
      const power2 = fetch(url)
        .then((res) => res.json())
        .then((data) => {
          setMove2((s) => [...s, data.power || 0]);
        });

      return power2;
    };

    if (pokemon2) {
      for (let move of pokemon2.moves.slice(0, 4)) {
        getMovesDetails(move.move.url);
      }
    }
  }, [pokemon2]);



  

  let handleChange1 = (event) => {
    setSelectedPokemon1(event.target.value);
    
  };

  let handleChange2 = (event) => {
    setSelectedPokemon2(event.target.value);
    
  };

  return (
    <div className={styles.container__fight}>
      <div className={styles.container__fight_heading}>
        <h1>Fight Pokemon</h1>
      </div>
      <div className="w-full flex justify-center items-center">
        <div className={styles.container__fight_select}>
          <select
            value={selectedPokemon1}
            onChange={handleChange1}
            placeholder="select pokemon 1"
          >
            <option>Select Pokemon 1</option>
            {pokeData.map((s, i) => (
              <option key={i * 5} value={s.url}>
                {s.name}
              </option>
            ))}
          </select>
          <select value={selectedPokemon2} onChange={handleChange2}>
            <option>Select Pokemon 2</option>
            {pokeData.map((s, i) => (
              <option key={i * 2} value={s.url}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="w-full flex justify-center items-center">
        <div className={styles.container__card}>
          <div
            className={`pointer-events-none 
              
              `}
          >
            {pokemon1 && <Card pokemon={pokemon1} />}
          </div>

          <div>
            {pokemon1 && pokemon2 && (
              <div>
                <Battle
                  pokemon1={pokemon1}
                  resetBattle={resetBattle}
                  pokemon2={pokemon2}
                  setResetBattle={setResetBattle}
                  move1={move1}
                  move2={move2}
                />
              </div>
            )}
          </div>
          <div
            className={`pointer-events-none 
            `}
          >
            {pokemon2 && <Card pokemon={pokemon2} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1024");
  const data = await res.json();

  return {
    props: { data },
  };
}

export default PokemonFight;
