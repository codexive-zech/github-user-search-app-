import React, { useContext } from "react";
import styled from "styled-components";
import { GithubContext } from "../context/context";
import { Pie3D, Column3D, Bar3D, Doughnut2D } from "./Charts";

const Repos = () => {
  const { githubRepos } = useContext(GithubContext); // making use of the github users state via context api

  const languages = githubRepos.reduce((total, item) => {
    const { language, stargazers_count } = item; // destructuring github repository state
    if (!language) return total; // if language value return out
    // checking if language prop does not exist in the object
    if (!total[language]) {
      total[language] = { label: language, value: 1, stars: stargazers_count }; // creating language props (label and value) for the chart
    }
    // checking if language prop already exist in the object
    else {
      total[language] = {
        ...total[language], // return back all the prop value
        value: total[language].value + 1, // adding one to the language prop value
        stars: total[language].stars + stargazers_count, // increasing the star count
      };
    }
    return total;
  }, {}); // return an object

  const mostUsedLanguage = Object.values(languages) // convert the returned object to an array
    .sort((a, b) => {
      return b.value - a.value;
    }) // sort for the highest values
    .slice(0, 5); // set out only the best 5 lang

  const mostPopularLanguage = Object.values(languages) // convert the return object to an array
    .sort((a, b) => {
      return b.stars - a.stars;
    }) // sort for the highest values
    .map((item) => {
      return { ...item, value: item.stars };
    }) // iterate over the sorted value to change value prop for star
    .slice(0, 5); // set out only the best 5 lang

  const stars = githubRepos.reduce((total, item) => {
    const { stargazers_count, name } = item; // destructure github repository state
    total[stargazers_count] = { label: name, value: stargazers_count }; // creating stars count prop (label and value) for the chart
    return total;
  }, {}); // return an object

  const mostStarredRepo = Object.values(stars).slice(-5).reverse(); // convert the returned object to an array, set out the highest last 5 and reverse them

  const forks = githubRepos.reduce((total, item) => {
    const { name, forks } = item; // destructure github repository state
    total[forks] = { label: name, value: forks }; // creating forks count prop (label and value) for the chart
    return total;
  }, {}); // return an object

  const mostForkedRepo = Object.values(forks).slice(-5).reverse(); // convert the returned object to an array, set out the highest last 5 and reverse them

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
