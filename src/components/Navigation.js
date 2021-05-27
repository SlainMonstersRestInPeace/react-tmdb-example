import React from 'react'

import styled from 'styled-components'

import { NavLink } from 'react-router-dom'

const Nav = styled.nav`
a {
  color: var(--acid-green-darker);
  text-decoration: none;
  font-family: "Oswald", sans-serif;
  font-weight: 700;
}

a:hover {
  color: var(--acid-green);
}

a.active {
  color: var(--acid-green);
}
`;

export default () => {
  return (
    <Nav>
      <ul className="list-group list-group-horizontal">
        <li className="list-group-item border-0 bg-transparent">
          <NavLink to="/popular">Popular</NavLink>
        </li>
        <li className="list-group-item border-0 bg-transparent">
          <NavLink to="/now-playing">Now Playing</NavLink>
        </li>
        <li className="list-group-item border-0 bg-transparent">
          <NavLink to="/upcoming">Upcoming</NavLink>
        </li>
        <li className="list-group-item border-0 bg-transparent">
          <NavLink to="/top-rated">Top Rated</NavLink>
        </li>
      </ul>
    </Nav>
  );
}