import React from 'react';
import styled from 'styled-components';

const ButtonTabComponent = ({ className, activeTab, handleTabClick }: any) => {
  return (
    <div className={className}>
      <button className={`${activeTab === 'countDown' && 'selected'}`} onClick={ () => handleTabClick('countDown') }>倒數計時</button>
      <button className={`${activeTab === 'stopwatch' && 'selected'}`} onClick={ () => handleTabClick('stopwatch') }>碼表</button>
    </div>
  )
};

const ButtonTab = styled(ButtonTabComponent)`
  button {
    padding: 6px 13px; 
    border: none;
    background-color: #E6B794;
    font-size: 20px;
    cursor: pointer;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    color: #563014;
    font-weight: bold;
    &.selected {
      background-color: #ae6229;
      color: #F3F0E9;
    }
  }
`;

export default ButtonTab;