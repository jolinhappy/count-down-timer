import React from 'react';
import styled from 'styled-components';

const MainStopWatchComponent = (props: any) => {
  const { className,
          currentMode,
          hours,
          minutes,
          seconds,
          headMilliseconds,
          tailMilliseconds,
          handleStart,
          handleStop,
          handleReset
        } = props;
  return (
    <div className={className}>
      <div className="main-box__container">
        <h2>碼表</h2>
        <div className="time-setting">
          {
            (
              <div className="time">{ hours } : { minutes } : { seconds }.{ headMilliseconds }<span>{ tailMilliseconds }</span></div>
            )
          }
        </div>
        <div className="button-group">
          {
            (currentMode === 'set' || currentMode === 'reset' || currentMode === 'stop') && (
              <button className='start' onClick={ handleStart }>Start</button>
            )
          }
          {
            currentMode === 'start' && (
              <div>
                <button className='stop' onClick={ handleStop }>Stop</button>
                <button className='reset' onClick={ handleReset }>Reset</button>
              </div> 
            )
          }
        </div>
      </div>      
    </div>
  )
}

const MainStopWatch = styled(MainStopWatchComponent)`
  .main-box__container {
    padding: 30px;
    position: relative;
    h2 {
      font-size: 40px;
      font-weight: bold;
    }
    .time-setting {
      font-size: 80px;
      margin: 30px 0;
      input {
        height: 90px;
        width: 120px;
        font-size: 80px;
        text-align: center;
        border-radius: 10px;
        &[type=number]::-webkit-outer-spin-button,
        &[type=number]::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;            
        }
      }
      .time {
        font-size: 95px;
        span {
          font-size: 30px;
        }
      }
    }
    .button-group {
      margin-top: 40px;
      button {
        width: 90px;
        height: 50px;
        border-radius: 8px;
        border: none;
        font-size: 20px;
        cursor: pointer;
        color: #F3F0E9;
        & + button {
          margin-left: 40px;
        }
        &.start {
          background-color: #2F5233;
          &:hover {
            background-color: #3c6941;
          }
        }
        &.stop {
          background-color: #A82810;
          &:hover {
            background-color: #c52f13;
          }
        }
        &.reset {
          background-color: #275070;
          &:hover {
            background-color: #31658e;
          }
        }
      }
    }
  }
`;

export default MainStopWatch;