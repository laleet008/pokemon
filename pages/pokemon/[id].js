import React, { useEffect } from "react";
import cx from "classnames";

import styles from "./detail.module.scss";
import Image from "next/image";

function Post({ data }) {
  useEffect(() => {
    if (data.stats && data.stats.length > 0) {
      for (let stat of data.stats) {
        document.documentElement.style.setProperty(
          `--progress-${stat.stat.name}`,
          `${stat.base_stat > 100 ? "100" : stat.base_stat}%`
        );
      }
    }
  }, [data]);

  return (
    <main className={styles.container}>
      <div className={styles.container__pokemon}>
        <Image
          height={120}
          width={120}
          src={data.sprites.front_default}
          alt="pokemon"
        />

        <h2>{data.name}</h2>
        <div className={styles.container__pokemon_type}>
          {data.types.map((type, i) => {
            return (
              <div key={type + i} className="">
                {type.type.name}
              </div>
            );
          })}
        </div>
        <h3>Stats</h3>
        <div className={styles.container__pokemon_stats}>
          <div className={styles.container__pokemon_stats_col}>
            {data.stats.map((stat, i) => {
              if (i < 3) {
                return (
                  <div
                    key={stat.stat.name + i}
                    className={styles.container__pokemon_stats_col_single}
                  >
                    <span className=""> {stat.stat.name}</span>
                    <div
                      className={cx(
                        styles[`progress_stat_${stat.stat.name}`],
                        styles.progress_stat
                      )}
                    >
                      <div className={styles.fill}></div>

                      <span className="text-white absolute">
                        {stat.base_stat}
                      </span>
                    </div>
                  </div>
                );
              }
            })}
          </div>

          <div></div>

          <div className={styles.container__pokemon_stats_col}>
            {data.stats.map((stat, i) => {
              if (i >= 3) {
                return (
                  <div
                    key={stat.stat.name + i}
                    className={styles.container__pokemon_stats_col_single}
                  >
                    <span className=""> {stat.stat.name}</span>
                    <div
                      className={cx(
                        styles[`progress_stat_${stat.stat.name}`],
                        styles.progress_stat
                      )}
                    >
                      <div className={styles.fill}></div>

                      <span className="text-white absolute">
                        {stat.base_stat}
                      </span>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </div>
      </div>
    </main>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.params;

  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const data = await res.json();

  return {
    props: { data },
  };
}

export default Post;
