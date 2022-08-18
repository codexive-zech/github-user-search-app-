import React, { useState, useEffect } from "react";
import mockUser from "./mockData.js/mockUser";
import mockRepos from "./mockData.js/mockRepos";
import mockFollowers from "./mockData.js/mockFollowers";
import axios from "axios";

const rootUrl = "https://api.github.com";

const GithubContext = React.createContext(); // creating context api to share state Data

const GithubProvider = ({ children }) => {
  const [githubUser, setGithubUser] = useState(mockUser); // define the github user state
  const [githubRepos, setGithubRepos] = useState(mockRepos); // define the github repository state
  const [githubFollowers, setGithubFollowers] = useState(mockFollowers); // define the github followers state
  const [request, setRequest] = useState(0); // define the api request state
  const [error, setError] = useState({ show: false, msg: "" }); // define an object for error
  const [isLoading, setIsLoading] = useState(false); // define a loading state

  const checkRequest = () => {
    axios(`${rootUrl}/rate_limit`)
      .then(({ data }) => {
        let { remaining } = data.rate;
        setRequest(remaining); // set request state
        if (remaining === 0) {
          displayError(true, "Sorry, You have reached your hourly limit rate");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }; // making a fetch call to retrieve remaining api limit

  const searchGithubUser = async (user) => {
    displayError(); // invoking the default params for error display
    setIsLoading(true); // set loading state
    const response = await axios(`${rootUrl}/users/${user}`).catch((error) =>
      console.log(error)
    ); // using axios to make api call and catch any error
    // checking if response returned is TRUE
    if (response) {
      setGithubUser(response.data); // set github user state
    } else {
      displayError(true, "Sorry, Username does not exist"); // display error if no user exist
    }
    setIsLoading(false); // set loading state
    checkRequest(); // check api calls left
  }; // making an api call to search for github users

  const displayGithubFollowers = async (user) => {
    const response = await axios(`${rootUrl}/users/${user}/followers`).catch(
      (err) => console.log(err)
    ); // using axios to make api call and catch any error
    // checking if response returned is TRUE
    if (response) {
      setGithubFollowers(response.data); // set github followers state
    }
  }; // displaying github user followers

  const displayGithubRepos = async (user) => {
    const response = await axios(
      `${rootUrl}/users/${user}/repos?per_page=100`
    ).catch((err) => console.log(err)); // using axios to make api call and catch any error
    // checking if response returned is TRUE
    if (response) {
      setGithubRepos(response.data); // set github repository state
    }
  }; // displaying github user repositories

  const displayError = (show = false, msg = "") => {
    setError({ show, msg });
  };
  useEffect(() => {
    checkRequest();
  }, []);

  return (
    <GithubContext.Provider
      value={{
        githubUser,
        githubRepos,
        githubFollowers,
        request,
        error,
        searchGithubUser,
        displayGithubFollowers,
        displayGithubRepos,
        isLoading,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export { GithubProvider, GithubContext };
