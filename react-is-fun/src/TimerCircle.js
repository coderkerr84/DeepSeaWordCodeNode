// Credit: Mateusz Rybczonec
import React, {useState, Component} from 'react';
import './TimerCircle.css';

const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = 10;
const ALERT_THRESHOLD = 5;
const TIMER_NEEDS_INITIALIZING = 1;
const TIMER_HAS_BEEN_INITIALIZED = 2;


const COLOR_CODES = {
  info: {
    color: "green"
  },
  warning: {
    color: "orange",
    threshold: WARNING_THRESHOLD
  },
  alert: {
    color: "red",
    threshold: ALERT_THRESHOLD
  }
};

//readme: these variables are shared by all TimerCircles (unlike State which they each have their own)
const TIME_LIMIT = 90;
let timePassed = 0;
let timeLeft = TIME_LIMIT;
let timerInterval =  Array(7).fill(null);
let remainingPathColor = COLOR_CODES.info.color;
let oxygenBottlesApplied = 0;
let timerRanOutCallback = null;
// readme: not certain I need this next variable? Because this is global to all timers it saves me passing it back to here from the GameBoard state
// but maybe having a copy here is undesirable and i should use the state one.
let roundTheyWereOnWhenTimerExpired = null;

function Init(uniqueKey)
{
        onTimesUp();

        /*
        * readme: bring these two back in if you want the timer to NOT be shared across all rounds
        timePassed = 0;
        timeLeft = TIME_LIMIT;
        */
        timerInterval[uniqueKey] = null;
        remainingPathColor = COLOR_CODES.info.color;
    
        console.log('Timer started' + uniqueKey);
        document.getElementById("TimerCircle" + uniqueKey).innerHTML = '<div class="base-timer"><svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">   <g class="base-timer__circle">    <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>    <path      id="base-timer-path-remaining'+uniqueKey+'"      stroke-dasharray="283"       class="base-timer__path-remaining '+remainingPathColor+'"      d="        M 50, 50        m -45, 0        a 45,45 0 1,0 90,0        a 45,45 0 1,0 -90,0      "    ></path>  </g></svg><span id="base-timer-label'+uniqueKey+'" class="base-timer__label">'+formatTime(timeLeft)+'</span></div>';
        startTimer(uniqueKey);
}

function AddToTimer(sec)
{
    console.log('timePassed'+ timePassed);
    timePassed -= sec;
}

function onTimesUp(uniqueKey) {
  clearInterval(timerInterval[uniqueKey]);
}

function startTimer(uniqueKey) {
    timerInterval[uniqueKey] = setInterval(() => {
    timePassed = timePassed += 1;
    timeLeft = TIME_LIMIT - timePassed;
    document.getElementById("base-timer-label" + uniqueKey).innerHTML = formatTime(
      timeLeft
    );
    setCircleDasharray(uniqueKey);
    setRemainingPathColor(timeLeft,uniqueKey);

    if (timeLeft === 0) {
      onTimesUp(uniqueKey);
      if(timerRanOutCallback != null && timerRanOutCallback != undefined 
        && uniqueKey != null && uniqueKey != undefined)
      {
        timerRanOutCallback(uniqueKey);
        roundTheyWereOnWhenTimerExpired = uniqueKey;
      }
    }
  }, 1000);
}

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;

  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  return `${minutes}:${seconds}`;
}

function setRemainingPathColor(timeLeft,uniqueKey) {
  const { alert, warning, info } = COLOR_CODES;
  if (timeLeft <= alert.threshold) {
    document
      .getElementById("base-timer-path-remaining" + uniqueKey)
      .classList.remove(warning.color);
    document
      .getElementById("base-timer-path-remaining" + uniqueKey)
      .classList.add(alert.color);
  } else if (timeLeft <= warning.threshold) {
    document
      .getElementById("base-timer-path-remaining" + uniqueKey)
      .classList.remove(info.color);
    document
      .getElementById("base-timer-path-remaining" + uniqueKey)
      .classList.add(warning.color);
  }
}

function calculateTimeFraction() {
  const rawTimeFraction = timeLeft / TIME_LIMIT;
  return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
}

function setCircleDasharray(uniqueKey) {
  const circleDasharray = `${(
    calculateTimeFraction() * FULL_DASH_ARRAY
  ).toFixed(0)} 283`;
  document
    .getElementById("base-timer-path-remaining" + uniqueKey)
    .setAttribute("stroke-dasharray", circleDasharray);
}

class TimerCircle extends React.Component
{ 
    // readme: dont appear to need each Timer to have their own state.
    // am happy sharing the timer variables globally across all Timers (e.g. TimePassed and oxygenBottlesApplied are used by all 7)
render()
    {
      timerRanOutCallback = this.props.timerRanOut;
        //console.log('Got here' + this.props.initializeTimers[this.props.uniqueKey - 1] + ' ' + this.props.uniqueKey);
        
        // readme: '1' means the timer's div is ready and the timer can be initialized. '2' means it's all setup, dont reinit it as that would reset it.
        if(this.props.initializeTimers[this.props.uniqueKey - 1] == TIMER_NEEDS_INITIALIZING)
        {
            Init(this.props.uniqueKey);
            //readme: to my surprise changing this array prop seems to change the STATE (possibly am breaking a pattern)
            //readme: will leave for now, but could change later to a callback to the GameBoard and change the state in there instead.
            this.props.initializeTimers[this.props.uniqueKey - 1] = TIMER_HAS_BEEN_INITIALIZED;
        }

        // readme: haltTimer will be true for any rounds that aren't the current round.
        if(this.props.haltTimer)
        {   
            onTimesUp(this.props.uniqueKey);          
        }

        if(oxygenBottlesApplied < this.props.oxygenBottlesUsed &&
            this.props.currentRoundBeingPlayed == this.props.uniqueKey)
        {
            //readme: 11 because it takes about 1s for the 10 to be added!
            //readme: note the condition checking what round we are on, necessary or ALL 7 timers would think they needed to update the timer.
            AddToTimer(11);
            oxygenBottlesApplied++;
        }

        return(
            <div id={"TimerCircle" + this.props.uniqueKey} style={this.props.style}></div>
        );
    }
    //readme: putting this here solved a problem of a red warning the browser dev console when setting state inside Render()
    componentDidUpdate()
    {
        //readme: have no longer got a reason to use this...
    }
}

export default TimerCircle;



