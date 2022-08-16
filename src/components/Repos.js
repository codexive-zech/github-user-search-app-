import React, { useContext } from "react";
import styled from "styled-components";
import { GithubContext } from "../context/context";
import { Pie3D, Column3D, Bar3D, Doughnut2D } from "./Charts";

// dev-i512nehz
const Repos = () => {
  const { githubRepos } = useContext(GithubContext);

  const languages = githubRepos.reduce((total, item) => {
    const { language, stargazers_count } = item;
    if (!language) return total; // if language value return out
    // checking if language prop does not exist in the object
    if (!total[language]) {
      total[language] = { label: language, value: 1, stars: stargazers_count };
    }
    // checking if language prop already exist in the object
    else {
      total[language] = {
        ...total[language],
        value: total[language].value + 1,
        stars: total[language].stars + stargazers_count,
      };
    }
    return total;
  }, {}); // return an object

  const mostUsedLanguage = Object.values(languages) // convert the returned object to an array
    .sort((a, b) => {
      return b.value - a.value;
    }) // sort for the highest values
    .slice(0, 5); // set out only the best 5 lang

  const mostPopularLanguage = Object.values(languages)
    .sort((a, b) => {
      return b.stars - a.stars;
    })
    .map((item) => {
      return { ...item, value: item.stars };
    })
    .slice(0, 5);

  const stars = githubRepos.reduce((total, item) => {
    const { stargazers_count, name } = item;
    total[stargazers_count] = { label: name, value: stargazers_count };
    return total;
  }, {});

  const mostStarredRepo = Object.values(stars).slice(-5).reverse();

  const forks = githubRepos.reduce((total, item) => {
    const { name, forks } = item;
    total[forks] = { label: name, value: forks };
    return total;
  }, {});

  const mostForkedRepo = Object.values(forks).slice(-5).reverse();

  return (
    <section className="section">
      <Wrapper className="section-center">
        <Pie3D data={mostUsedLanguage} />
        <Column3D data={mostStarredRepo} />
        <Doughnut2D data={mostPopularLanguage} />
        <Bar3D data={mostForkedRepo} />
      </Wrapper>
    </section>
  );
};

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`;

export default Repos;
