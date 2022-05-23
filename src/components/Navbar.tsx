import React from 'react';
import styled from 'styled-components';

const NavbarComponent = ({ className }: any) => {
  return (
    <div className={ className }>
      <div className="nav__logo">Timer</div>
    </div>
  )
};

const Navbar = styled(NavbarComponent)`
  max-width: 100%;
  padding: 10px 10px;
  text-align: left;
  background: #634F40;
  color: #E6B794;
  .nav__logo {
    font-size: 32px;
    font-weight: bold;
  }
`;

export default Navbar;