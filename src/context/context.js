import React, { useState, useEffect } from "react";
import mockUser from "./mockData.js/mockUser";
import mockRepos from "./mockData.js/mockRepos";
import mockFollowers from "./mockData.js/mockFollowers";
import axios from "axios";

const rootUrl = "https://api.github.com";

const GithubContext = React.createContext();

const GithubProvider = ({ children }) => {
  const [githubUser, setGithubUser] = useState(mockUser);
  const [githubRepos, setGithubRepos] = useState(mockRepos);
  const [githubFollowers, setGithubFollowers] = useState(mockFollowers);
  const [request, setRequest] = useState(0);
  const [error, setError] = useState({ show: false, msg: "" });
  const [isLoading, setIsLoading] = useState(false);

  const checkRequest = () => {
    axios(`${rootUrl}/rate_limit`)
      .then(({ data }) => {
        let { remaining } = data.rate;
        setRequest(remaining);
        if (remaining === 0) {
          displayError(true, "Sorry, You have reached your hourly limit rate");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const searchGithubUser = async (user) => {
    displayError();
    setIsLoading(true);
    const response = await axios(`${rootUrl}/users/${user}`).catch((error) =>
      console.log(error)
    );
    if (response) {
      setGithubUser(response.data);
    } else {
      displayError(true, "Sorry, Username does not exist");
    }
    setIsLoading(false);
    checkRequest();
  };

  const displayGithubFollowers = async (user) => {
    const response = await axios(`${rootUrl}/users/${user}/followers`).catch(
      (err) => console.log(err)
    );
    if (response) {
      setGithubFollowers(response.data);
    }
  };

  const displayGithubRepos = async (user) => {
    const response = await axios(
      `${rootUrl}/users/${user}/repos?per_page=100`
    ).catch((err) => console.log(err));
    if (response) {
      setGithubRepos(response.data);
    }
  };

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
