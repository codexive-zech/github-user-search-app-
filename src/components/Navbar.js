import React from "react";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";

const defaultImage = `https://static.generated.photos/vue-static/face-generator/landing/wall/23.jpg`;

const Navbar = () => {
  const { isAuthenticated, logout, user } = useAuth0(); // making use of auth0 states
  return (
    <Wrapper>
      {/* checking if user is authenticated to display user image */}
      {isAuthenticated ? (
        <img src={user.picture || defaultImage} alt={user.name} />
      ) : null}
      {/* checking if user is authenticated to display user name */}
      {isAuthenticated ? (
        <h4>
          Welcome, <strong>{user.name.toUpperCase()}</strong>
        </h4>
      ) : null}
      {/* checking if user is authenticated to display logout button */}
      {isAuthenticated ? (
        <button onClick={() => logout({ returnTo: window.location.origin })}>
          Logout
        </button>
      ) : null}
    </Wrapper>
  );
};

const Wrapper = styled.nav`
  padding: 1.5rem;
  margin-bottom: 4rem;
  background: var(--clr-white);
  text-align: center;
  display: grid;
  grid-template-columns: auto auto 100px;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  h4 {
    margin-bottom: 0;
    font-weight: 400;
  }
  img {
    width: 35px !important;
    height: 35px;
    border-radius: 50%;
    object-fit: cover;
  }
  button {
    background: transparent;
    border: transparent;
    font-size: 1.2rem;
    text-transform: capitalize;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
`;

export default Navbar;
