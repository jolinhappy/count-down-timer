import React from 'react';
import styled from 'styled-components';
import { VolumeUp } from 'react-bootstrap-icons';

const MainCountdownComponent = (props: any) => {
  const { className, currentMode, hours, minutes, seconds, totalMilliseconds, handleInput, handleStart, handleStop, handleReset } = props
  return (
    <div className={className}>
      <div className="main-box__container">
        <h2>倒數</h2>
        <VolumeUp style={{ color: "#563014", cursor: "pointer", position: "absolute", top: "36px", left: "calc(50% + 50px)", fontSize: 24, marginRight: "15px"}}/>
        <div className="time-setting">
          {
            (currentMode === 'set' || currentMode === 'reset' || (currentMode === 'stop' && totalMilliseconds === 0)) && (
              <div>
                <input type="number" max="60" min="0" value={ hours } onChange={ (e: any) =>{ handleInput('hours', e.target.value) } }/>：
                <input type="number" max="60" min="0" value={ minutes } onChange={ (e: any) =>{ handleInput('minutes', e.target.value) } }/>：
                <input type="number" max="60" min="0" value={ seconds } onChange={ (e: any) =>{ handleInput('seconds', e.target.value) } }/>
              </div>
            )                   
          }
          {
            (currentMode === 'start' || (currentMode === 'stop' && totalMilliseconds !== 0)) && (
              <div className={`time ${(currentMode === 'start' && totalMilliseconds) === 0 && 'times-up'}`}>{ hours } : { minutes } : { seconds }</div>
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

const MainCountdown = styled(MainCountdownComponent)`
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
        &.times-up {
          font-weight: bold;
          animation: flash 1s infinite;
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

export default MainCountdown;