import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import ButtonTab from './ButtonTab';
import MainCountdown from './MainCountdown';
import MainStopWatch from './MainStopWatch';

const MainComponent = ({ className }: any) => {
  type NumberInputType = 'hours' | 'minutes' | 'seconds';
  type TabType = 'countDown' | 'stopwatch';
  type ModeType = 'set' | 'start' | 'stop' | 'reset' | 'pause';
  const src = require("../../assets/music/alarm1.mp3");
  const audio = new Audio(src);
  audio.loop = true;
  const [ activeTab, setActiveTab ] = useState<TabType>('countDown');
  const [ currentMode, setCurrentMode ] = useState<ModeType>('set');
  const [ hours, setHours ] = useState<string>('00');
  const [ minutes, setMinutes ] = useState<string>('00');
  const [ seconds, setSeconds ] = useState<string>('00');
  const [ headMilliseconds, setHeadMilliseconds ] = useState<string>('0');
  const [ tailMilliseconds, setTailMilliseconds ] = useState<string>('00');
  const [ totalMilliseconds, setTotalMilliseconds ] = useState<number>(0);
  const intervalRef = useRef<null | NodeJS.Timeout>(null);

  const resetCurrentState = () => {
    setCurrentMode('set');
    setHours('00');
    setMinutes('00');
    setSeconds('00');
    setHeadMilliseconds('0');
    setTailMilliseconds('00');
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };
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
    if (activeTab === 'countDown') {
      const currentHours = parseInt((milliseconds / (1000 * 60 * 60)).toString());
      const currentMinutes = parseInt((((milliseconds % (1000 * 60 * 60)) / (1000 * 60)).toString()));
      const currentSeconds = parseInt(((milliseconds % (1000 * 60)) / 1000).toString());
      setHours(formattedValue(currentHours.toString()));
      setMinutes(formattedValue(currentMinutes.toString()));
      setSeconds(formattedValue(currentSeconds.toString()));      
    } else {
      const currentHours = parseInt((milliseconds / (1000 * 60 * 60)).toString());
      const currentMinutes = parseInt((((milliseconds % (1000 * 60 * 60)) / (1000 * 60)).toString()));
      const currentSeconds = parseInt(((milliseconds % (1000 * 60)) / 1000).toString());
      const currentHeadMilliseconds = parseInt(milliseconds.toString());
      const currentTailMilliseconds = parseInt(milliseconds.toString());
      setHeadMilliseconds(formattedHeadMilliseconds(currentHeadMilliseconds.toString()));
      setTailMilliseconds(formattedTailMilliseconds(currentTailMilliseconds.toString()));
      setHours(formattedValue(currentHours.toString()));
      setMinutes(formattedValue(currentMinutes.toString()));
      setSeconds(formattedValue(currentSeconds.toString()));
    }
  };
  const formattedValue = (value: string) => {
    return value.length >= 3 ? value.substring(1) : formatNumber(value);
  };
  const formattedHeadMilliseconds = (value: string) => {
    return value.length > 2 ? value.substring(value.length - 3, value.length - 2) : value;
  }
  const formattedTailMilliseconds = (value: string) => {
    return value.length >= 3 ? value.substring(value.length - 2, value.length) : value;
  }
  const handleTabClick = (tab: TabType) => {
    setActiveTab(tab);
    resetCurrentState();
    if (tab === 'stopwatch') {
      audio.pause();
    }
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
    if (activeTab === "countDown") {
      const milliseconds = calculateTotalMilliseconds();
      setTotalMilliseconds(milliseconds);      
    }
  };
  const handleStop = () => {
    setCurrentMode('stop');
    clearInterval(intervalRef.current as NodeJS.Timeout);
    audio.pause();
  };
  const handleReset = () => {
    clearInterval(intervalRef.current as NodeJS.Timeout);
    setCurrentMode('reset');
    audio.pause();
    clearInterval(intervalRef.current as NodeJS.Timeout);
  };

  const handleCountdown = () => {
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
  };
  const handleStopWatch = () => {
    const initDate = new Date();
    intervalRef.current = setInterval(() => {
      setTotalMilliseconds(() =>  {
        const currentDate = new Date();
        const passMilliseconds = totalMilliseconds ? totalMilliseconds + (Number(currentDate) - Number(initDate)) : Number(currentDate) - Number(initDate);
        transformToTime(passMilliseconds);
        return passMilliseconds;
      });
    }, 1);
  };
  useEffect(() => {
    if (currentMode === 'start') {
      switch (activeTab) {
        case "countDown":
          handleCountdown();
          break;
        case "stopwatch":
          handleStopWatch();
          break;
        default:
          handleCountdown();
      }
    } else if (currentMode === 'reset') {
      setTotalMilliseconds(0);
    } 
    else {
      clearInterval(intervalRef.current as NodeJS.Timeout);
    }
  }, [currentMode]);

  useEffect(() => {
    if (currentMode === 'start' && totalMilliseconds === 0) {
      clearInterval(intervalRef.current as NodeJS.Timeout);
      audio.play();
    }
    if (totalMilliseconds === 0) {
      clearInterval(intervalRef.current as NodeJS.Timeout);
      transformToTime(totalMilliseconds);
    }
  }, [totalMilliseconds]);
  
  return (
    <div className={className}>
      <ButtonTab activeTab={ activeTab } handleTabClick={ handleTabClick }/>
      <div className="main-box">
        {/* 主要內容 */}
        {
          activeTab === 'countDown' ? (
            <MainCountdown
              currentMode={ currentMode }
              hours={ hours }
              minutes={ minutes }
              seconds={ seconds }
              totalMilliseconds={ totalMilliseconds }
              handleInput={ handleInput }
              handleStart={ handleStart }
              handleStop={ handleStop }
              handleReset={ handleReset }
            />
          ) : (
            <MainStopWatch
              currentMode={ currentMode }
              hours={ hours }
              minutes={ minutes }
              seconds={ seconds }
              headMilliseconds={ headMilliseconds }
              tailMilliseconds={ tailMilliseconds }
              totalMilliseconds={ totalMilliseconds }
              handleInput={ handleInput }
              handleStart={ handleStart }
              handleStop={ handleStop }
              handleReset={ handleReset }
            />
          )
        }
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
    min-width: 605px;
    background: #F0D8B8;
    border-radius: 10px;
  }
`;

export default Main;