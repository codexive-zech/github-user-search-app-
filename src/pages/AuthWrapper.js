import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import loadingGif from "../images/preloader.gif";
import styled from "styled-components";
function AuthWrapper({ children }) {
  const { isLoading, error } = useAuth0(); // making use of auth0 states
  if (isLoading) {
    return (
      <Wrapper>
        <img src={loadingGif} alt="" />
      </Wrapper>
    );
  } // after authentication when loading display loading img
  if (error) {
    return (
      <Wrapper>
        <h1>Ops.. {error.message}</h1>
      </Wrapper>
    );
  } // after authentication and user is invalid display error msg
  return <>{children}</>; // return the children pages when authentication is legit
}

const Wrapper = styled.section`
  min-height: 100vh;
  display: grid;
  place-items: center;
  img {
    width: 150px;
  }
`;

export default AuthWrapper;
