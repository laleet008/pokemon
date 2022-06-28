import Head from "next/head";
import { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import Card from "../components/Card";
import SearchInput from "../components/SearchField";
import styles from "../styles/Home.module.css";
import { getPokemon, getPokemons } from "./api/helper";

const pokemonUrl = "https://pokeapi.co/api/v2/pokemon?offset=200&limit=200";

export default function Home() {
  const [pokemonData, setPokemonData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nextUrl, setNextUrl] = useState("");
  const [prevUrl, setPrevUrl] = useState("");
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    async function fetchData() {
      let res = await getPokemons(pokemonUrl);
      setNextUrl(res.next);
      setPrevUrl(res.previous);

      await fetchPokemon(res.results);
      setLoading(false);
    }
    fetchData();
  }, []);

  const next = async () => {
    setLoading(true);
    let data = await getPokemons(nextUrl);
    await fetchPokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  };

  const prev = async () => {
    if (!prevUrl) return;
    setLoading(true);
    let data = await getPokemons(prevUrl);
    await fetchPokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  };

  const fetchPokemon = async (data) => {
    let currentPokemon = await Promise.all(
      data.map(async (pokemon) => {
        let pokemonDetails = await getPokemon(pokemon);
        return pokemonDetails;
      })
    );
    setPokemonData(currentPokemon);
  };

  // const fileterPokemonData = pokemonData.filter(
  //   (pokemon) => pokemon.name.toLowerCase().includes(keyword)
  //   // || pokemon.types.name.toLowerCase().includes(keyword)
  // );

  // useEffect(() => {
  //   setPokemonData(fileterPokemonData);
  // }, [keyword]);

  const onInputChange = (e) => {
    // e.preventDefault();

    setKeyword(e.target.value.toLowerCase());
  };

  return (
    <div>
      <Head>
        <title>Pokemon</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="favicon.ico" />
      </Head>
      <main>
        <div className="py-4">
          <div className="center-everything h-20">
            <h1 className="text-3xl font-bold text-gray-700">Hi, Pokemon</h1>
          </div>
          <p className="center-everything h-12">
            Total pokemon found:
            {/* {pokemonData.map((pokemonData) => (
                <p key={idd.id}>{pokemonData[pokemonData.length - 1].id}</p>
              ))} */}
            {pokemonData.length}
          </p>

          <div className="flex gap-20 ">
            <div className="flex justify-start md:ml-28 ml-10">
              <div className="flex w-[180px] justify-between">
                <button onClick={prev} className="button-flex">
                  <FaArrowLeft /> Prev
                </button>
                <button onClick={next} className="button-flex">
                  Next <FaArrowRight />
                </button>
              </div>
            </div>
            <div className="md:w-[400px]">
              <SearchInput
                placeholder="search pokemon by name or type"
                onChange={onInputChange}
              />
            </div>
          </div>

          <div flex justify-center items-center>
            {loading ? (
              <div className="center-everything h-screen">
                <h1>Loading....</h1>
              </div>
            ) : (
              <div className="flex flex-wrap justify-center md:mx-12 h-full">
                {pokemonData
                  .filter((value) => {
                    if (keyword === "") {
                      return value;
                    } else if (
                      value.name.toLowerCase().includes(keyword.toLowerCase())
                    ) {
                      return value;
                    }
                  })

                  .map((pokemon) => {
                    return <Card key={pokemon.id} pokemon={pokemon} />;
                  })}
              </div>
            )}

            <div className="flex justify-end md:mr-28 mr-10 ">
              <div className="flex w-[180px] justify-between">
                <button onClick={prev} className="button-flex">
                  <FaArrowLeft /> Prev
                </button>
                <button onClick={next} className="button-flex">
                  Next <FaArrowRight />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>{/* footer */}</footer>
    </div>
  );
}
