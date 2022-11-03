import React, { useEffect, useState } from "react";
// import FightingCards from "./FightingCards";
import styles from "./pokemon-fight.module.scss";

const Battle = ({ pokemon1, pokemon2, move1, move2, setResetBattle }) => {
  const [battleReport, setBattleReport] = useState([]);
  // const [counter, setCounter] = useState(0);


  // const attack1 = pokemon1.stats[1].base_stat;
  let defense1 = pokemon1.stats[2].base_stat;
  const speed1 = pokemon1.stats[5].base_stat;
  // const attack2 = pokemon2.stats[1].base_stat;
  const defense2 = pokemon2.stats[2].base_stat;
  const speed2 = pokemon2.stats[5].base_stat;
  const randomMove1 = move1[Math.floor(Math.random() * move1.length)];
  const randomMove2 = move2[Math.floor(Math.random() * move2.length)];
  let message = ''
  let report = []

  const handleBattle = () => {
    let tempDefense1 = defense1;
    let tempDefense2 = defense2;




    setBattleReport([]);
    let pokemon1Health = pokemon1.stats[0].base_stat;
    let pokemon2Health = pokemon2.stats[0].base_stat;
    let nextTurn = speed1 > speed2 ? pokemon1.id : pokemon2.id;
    
    

    while (pokemon1Health > 0 && pokemon2Health > 0) {
      console.log(pokemon1Health, pokemon2Health)

      if (nextTurn === pokemon1.id) {
        
        tempDefense2 = tempDefense2 - randomMove1 > 0 ? defense2 - randomMove1  : 0 ;
        pokemon2Health = tempDefense2 > 0 ? pokemon2Health :  tempDefense2 < randomMove1 ? pokemon2Health -  (randomMove1 - tempDefense2) :  pokemon2Health -  randomMove1;


        message = (`${pokemon1.name} did ${randomMove1} damage to ${
          pokemon2.name
        }, ${
          pokemon2Health > 0
            ? `remaining hp of ${pokemon2.name} is ${pokemon2Health}`
            : `${pokemon2.name} is dead`
        }`)

      
        nextTurn = pokemon2.id;
      } else {
        tempDefense1 = tempDefense1 - randomMove2 > 0 ? defense1 - randomMove2  : 0 ;
         pokemon1Health = tempDefense1 > 0 ? pokemon1Health : tempDefense1 < randomMove2 ? pokemon1Health -  (randomMove2 - tempDefense1) : pokemon1Health - randomMove2;

        message = (`${pokemon2.name} did ${randomMove2} damage to ${
          pokemon1.name
        }, ${
          pokemon1Health > 0
            ? `remaining hp of  ${pokemon1.name} is ${pokemon1Health}`
            : `${pokemon1.name} is dead`
        }`)

        nextTurn = pokemon1.id;
      }
    

      report.push(message)


    }

    setBattleReport(report)

    setResetBattle(true);
  };



  return (
    <div>
      <div className="h-12">
        <div className={styles.container__card_battle}>
          <button onClick={handleBattle}>Battle</button>
        </div>
      </div>
      <div className="mx-10">
        {battleReport.map((report, i) => (
          <li className="my-4" key={i}>
            {report}
          </li>
        ))}
      </div>
      <div>
        {/* <FightingCards
          pokemon1Health={pokemon1Health}
          pokemon2Health={pokemon2Health}
        /> */}
      </div>
    </div>
  );
};

export default Battle;
