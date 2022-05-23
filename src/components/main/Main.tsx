import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import ButtonTab from './ButtonTab';

const MainComponent = ({ className }: any) => {
  type NumberInputType = 'hours' | 'minutes' | 'seconds';
  type TabType = 'countDown' | 'stopwatch  ';
  type ModeType = 'set' | 'start' | 'stop' | 'reset' | 'pause';
  const src = require("../../assets/music/alarm1.mp3");
  const audio = new Audio(src);
  audio.loop = true;
  const [ activeTab, setActiveTab ] = useState<TabType>('countDown');
  const [ currentMode, setCurrentMode ] = useState<ModeType>('set');
  const [ hours, setHours ] = useState<string>('00');
  const [ minutes, setMinutes ] = useState<string>('00');
  const [ seconds, setSeconds ] = useState<string>('00');
  const [ totalMilliseconds, setTotalMilliseconds ] = useState<number>(0);
  const intervalRef = useRef<null | NodeJS.Timeout>(null);
  const formatNumber = (number: string) => {
    return number.toString().padStart(2, '0');
  };
  const checkHasLetter = (value: string) => {
    return value.match(/[aA-zZ]/g);
  };
  const calculateTotalMilliseconds = () => {
    return Number(hours) * 60 * 60 * 1000 + Number(minutes) * 60 * 1000 + Number(seconds) * 1000;
  };
  const transformToTime = (milliseconds: number) => {
    const currentHours = parseInt((milliseconds / (1000 * 60 * 60)).toString());
    const currentMinutes = parseInt((((milliseconds % (1000 * 60 * 60)) / (1000 * 60)).toString()));
    const currentSeconds = parseInt(((milliseconds % (1000 * 60)) / 1000).toString());

    setHours(formattedValue(currentHours.toString()));
    setMinutes(formattedValue(currentMinutes.toString()));
    setSeconds(formattedValue(currentSeconds.toString()));
  };
  const formattedValue = (value: string) => {
    return value.length >= 3 ? value.substring(1) : formatNumber(value);
  };
  const handleTabClick = (tab: TabType) => {
    setActiveTab(tab);
  };
  const handleInput = (type: NumberInputType, value: string) => {
    const hasLetter = checkHasLetter(value);
    if (hasLetter) return;
    if (isNaN(value as any) || Number(value) > 60) {
      return;
    }
    const formattedValue = value.length >= 3 ? value.substring(1) : formatNumber(value);
    switch (type) {
      case 'hours':
        setHours(formattedValue);
        break;
      case 'minutes':
        setMinutes(formattedValue);
        break;
      case 'seconds': 
        setSeconds(formattedValue);
        break;
      default:
        break;
    }
  };
  const handleStart = () => {
    setCurrentMode('start');
    const milliseconds = calculateTotalMilliseconds();
    setTotalMilliseconds(milliseconds);
  };
  const handleStop = () => {
    setCurrentMode('stop');
    clearInterval(intervalRef.current as NodeJS.Timeout);
    audio.pause();
  };
  const handleReset = async() => {
    setCurrentMode('reset');
    await setTotalMilliseconds(0);
    transformToTime(0);
    audio.pause();
  };

  useEffect(() => {
    if (currentMode === 'start') {
      if (totalMilliseconds > 0) {
        intervalRef.current = setInterval(() => {
          setTotalMilliseconds((prevSeconds: number) =>  {
            if (prevSeconds > 0 ) {
              transformToTime(prevSeconds - 1000);
            }
            return prevSeconds - 1000
          });
        }, 1000);
      }
      if (totalMilliseconds === 0) {
        audio.play();
      }
    } else {
      clearInterval(intervalRef.current as NodeJS.Timeout);
    }
  }, [currentMode]);

  useEffect(() => {
    if (currentMode === 'start' && totalMilliseconds === 0) {
      clearInterval(intervalRef.current as NodeJS.Timeout);
      audio.play();
    }
  }, [totalMilliseconds]);
  
  return (
    <div className={className}>
      <ButtonTab activeTab={ activeTab } handleTabClick={ handleTabClick }/>
      <div className="main-box">
        {/* 主要內容 */}
        <div className="main-box__container">
          <h2>倒數</h2>
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
    </div>
  )
};

const Main = styled(MainComponent)`
  @keyframes flash{
    from {
      color: red;
    }
    to {
      color: black;
    }
  }
  background: #F3F0E9;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .main-box {
    width: auto;
    padding: 0px 20px;
    background: #F0D8B8;
    border-radius: 10px;
    &__container {
      padding: 30px;
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
  }
`;

export default Main;