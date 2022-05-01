import React from 'react';
import styled from 'styled-components';

const NavbarComponent = ({ className }: any) => {
  return (
    <div className={ className }>
      <div className="nav__logo">Logo</div>
    </div>
  )
};

const Navbar = styled(NavbarComponent)`
  max-width: 100%;
  padding: 20px 20px;
  text-align: left;
  background: #634F40;
  color: #E6B794;
  // box-shadow: 2px 3px 7px rgba(0, 0, 0, 0.5);
`;

export default Navbar;