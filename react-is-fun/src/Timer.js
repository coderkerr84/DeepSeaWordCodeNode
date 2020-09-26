import React, { Component } from 'react';
import { View,Text,Button,StyleSheet } from 'react';
import  { useEffect, useState } from "react";
/*
 borrowed from here:
 https://www.digitalocean.com/community/tutorials/react-countdown-timer-react-hooks
 and consider wapping to this more beautiful one:
 https://css-tricks.com/how-to-create-an-animated-countdown-timer-with-html-css-and-javascript/
 
*/
function Timer() {
    const calculateTimeLeft = () => {
      let year = new Date().getFullYear();
      const difference = +new Date(`${year}-10-1`) - +new Date();
      let timeLeft = {};
      const countdownFromSeconds = 60;
      if (difference > 0) {
        timeLeft = {
          seconds: Math.floor((difference / 1000) % countdownFromSeconds),
        };
      }
  
      return timeLeft;
    };
    //readme: hooks?
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
    // readme: this next line appears to be not needed
    const [year] = useState(new Date().getFullYear());
  
    useEffect(() => {
      setTimeout(() => {
        setTimeLeft(calculateTimeLeft());
      }, 1000);
    });
  
    const timerComponents = [];
  
    Object.keys(timeLeft).forEach((interval) => {
      if (!timeLeft[interval]) {
        return;
      }
  
      timerComponents.push(
        <span>
          {timeLeft[interval]} {"s "}
        </span>
      );
    });
    return (
      <span>
        {timerComponents.length ? timerComponents : <span>Time's up!</span>}
      </span>
    );
  }
  
  export default Timer;