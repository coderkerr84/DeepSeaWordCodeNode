// Credit: Mateusz Rybczonec
import React, {useState, Component} from 'react';
import './TimerCircle.css';
import UIfx from 'uifx';
import tickSfx from './sounds/tick.mp3'; 

const tickSoundQuiet = new UIfx(tickSfx);
tickSoundQuiet.setVolume(0.4);
const tickSoundUrgent = new UIfx(tickSfx);
tickSoundUrgent.setVolume(0.9);

const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = 20;
const ALERT_THRESHOLD = 7;
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
let oxygenBottlesBought = 0;
let isDemoMode = 0;
let timerRanOutCallback = null;
// readme: not certain I need this next variable? Because this is global to all timers it saves me passing it back to here from the GameBoard state
// but maybe having a copy here is undesirable and i should use the state one.
let roundTheyWereOnWhenTimerExpired = null;

function Init(uniqueKey)
{
        // INIT;
        timerInterval =  Array(7).fill(null);
        
        onTimesUp(uniqueKey);

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

function ResetTimer(calledBy)
{
  console.log("ResetTimer " + calledBy)
  //readme: reset the shared static timer vars - be careful when calling this as don't want to reset in between rounds 
  timePassed = 0;
  timeLeft = TIME_LIMIT;
  oxygenBottlesApplied = 0;
}

function AddToTimer(sec)
{
    console.log('timePassed'+ timePassed);
    timePassed -= sec;
}

function onTimesUp(uniqueKey) {
  console.log("killing timer : " + uniqueKey)
  clearInterval(timerInterval[uniqueKey]);
}

function startTimer(uniqueKey) {
    timerInterval[uniqueKey] = setInterval(() => {
    if(document.getElementById("base-timer-label" + uniqueKey))
    {
      // if(oxygenBottlesApplied < oxygenBottlesBought)
      // {
      //     let diff = oxygenBottlesBought - oxygenBottlesApplied;
      //     //readme : they have paid for oxygen that's not yet been used - use it!
      //     timePassed -= (11 * diff);
      //     oxygenBottlesApplied += diff;
      // }
      if(timeLeft > 0)
      {
        timePassed = timePassed += 1;
        timeLeft = TIME_LIMIT - timePassed;
      }

      // readme: only do stuff if html rendered
        if(timeLeft >= 0){
          document.getElementById("base-timer-label" + uniqueKey).innerHTML = formatTime(
            timeLeft
          );
        }
        setCircleDasharray(uniqueKey);
        setRemainingPathColor(timeLeft,uniqueKey);

        if(timeLeft === 0 && isDemoMode === 1)
        {
          alert("The timer ran out. Try and avoid that by using oxygen refills.\n Because this is the training demo we'll carry on...");
          timeLeft = -1;
          onTimesUp(uniqueKey);
        }

        if (timeLeft === 0 && isDemoMode === 0) {
          onTimesUp(uniqueKey);
          if(timerRanOutCallback != null && timerRanOutCallback != undefined 
            && uniqueKey != null && uniqueKey != undefined)
          {
            timerRanOutCallback(uniqueKey);
            roundTheyWereOnWhenTimerExpired = uniqueKey;
            // readme: so if the timer runs out, then here I reset the timers for the next time they might be used
            ResetTimer("bcoz timer expired on " + uniqueKey + " oxygenApplied: " + oxygenBottlesApplied + " oxyBought: " + oxygenBottlesBought);
          }
        }
        if (timeLeft === 10) tickSoundQuiet.play();
        if (timeLeft === 5) tickSoundUrgent.play();
        
    } else
    {
      // readme: hmm, I dont fully understand this - assume this else hit when doing a "Replay" and clears out stuff ahead of reusing timer class vars
      ResetTimer("bcoz didn't find a timer for " + uniqueKey);
      onTimesUp(uniqueKey);
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
    // readme: dont appear to need each Tier to have their own state.
    // am happy sharing the timer variables globally across all Timers (e.g. TimePassed and oxygenBottlesApplied are used by all 7)
render()
    {
      isDemoMode = this.props.isDemoMode;
      oxygenBottlesBought = this.props.oxygenBottlesBought;
      //console.log("uniqueKey:" + this.props.uniqueKey + " oxygenBottlesApplied:" + oxygenBottlesApplied + " oxygenBottlesBought:" + oxygenBottlesBought + " timePassed: " + timePassed)

      if(oxygenBottlesApplied < oxygenBottlesBought)
      {
        // readme: they appear to have bought oxygen - kill current timer thread,
        // update the global timer numbers, and start a new thread. Designed to stop race conditions.
         
        if(this.props.uniqueKey == this.props.currentRoundBeingPlayed){
          // readme: stop the exact timer in question.
          onTimesUp(this.props.uniqueKey); 
         
         // readme: these are global vars shared by all timers, update all.
          let diff = oxygenBottlesBought - oxygenBottlesApplied;
          timePassed -= (11 * diff);
          oxygenBottlesApplied += diff;
          console.log("oxygenBottlesApplied:" + oxygenBottlesApplied);
          startTimer(this.props.uniqueKey);
         }
         else
         {
           //console.log("not the timer we care about: " +this.props.uniqueKey);
         }
      }

      if(this.props.initializeTimers[0] == null)
      {
        // readme: bit of an assumption - if the first timer is null, the game has been started or replayed so reset timer.
        ResetTimer("Init.");
      }

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



