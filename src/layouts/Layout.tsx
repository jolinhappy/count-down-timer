import React from 'react';
import styled from 'styled-components';

const LayoutComponent = ({ className, navbar, main }: any) => {
  return (
    <div className={ className }>
      <div className="layout__container">
        <div className="layout-item__nav">
          { navbar }
        </div>
        <div className="layout-item__main">
          { main }
        </div>
      </div>
    </div>
  )
};

const Layout = styled(LayoutComponent)`
  height: 100%;
  .layout__container {
    display: flex;
    flex-direction: column;
    height: 100%;
    .layout-item__main {
      flex: 1;
    }
  }
`;

export default Layout;