import React, {useState, Component} from 'react';
import {render} from 'react-dom';
import Timer from './Timer';
import './ClueOuter.css';
import UserGuess from './UserGuess'; 
import ClueScore from './ClueScore';
import TimerCircle from './TimerCircle.js';

class ClueOuter extends React.Component
{

    render(){
        let clue = this.props.clue;
        let thisRoundId = clue.roundId;
        let userGuess = this.props.userGuess;
        let clueOuterClassName = this.props.currentRoundBeingPlayed >= thisRoundId ? "clueOuterInPlay clueOuter" : "clueOuterNotInPlay clueOuter";
        let isThisTheCurrentRound = this.props.currentRoundBeingPlayed == thisRoundId;
        let diverClassName = isThisTheCurrentRound ? "showBlock" : "hideBlock";
        let isDiverDead = this.props.roundTheyWereOnWhenTimerExpired != null;
        let diverDisplay = DiverDisplayFunction(this.props.initializeTimers[clue.roundId - 1],this.props.roundTheyWereOnWhenTimerExpired, clue.roundId);

        function DiverDisplayFunction(initializedTimer, roundTheyWereOnWhenTimerExpired, roundId){
            //readme: if timer initialized for this round then clock has started so hide the diver...
            if(initializedTimer != null){
                //readme: ...unless the timer has run out in which case display the diver on that round
                //console.log('roundId:'+roundId+' roundExpired '+ roundTheyWereOnWhenTimerExpired + ' initializedTimer: ' + initializedTimer)
                if(roundTheyWereOnWhenTimerExpired != null && roundId == roundTheyWereOnWhenTimerExpired){
                    return '';
                }
                return  'none'
            }
            return '';
        }
        const OXYGEN_BOTTLES_AVAILABLE = 5;
        //console.log("lol :" +isThisTheCurrentRound);
        return(
        
        <div className={clueOuterClassName}>
            <div style={roundStyle}>
                {clue.roundId}
            </div>
  
            {/* readme: this below probably should be another Component */}
            <div style={inlineBlock} name={"ClueOuterDiv" + clue.roundId}>
                <div style={floatLeft}>
                    {ClueInner(clue, this.props.changeUserGuess, this.props.wordLookupFeedbackMessages[clue.roundId-1], isThisTheCurrentRound)}
                </div>
                <TimerCircle 
                    initializeTimers={this.props.initializeTimers} 
                    style={this.props.roundTheyWereOnWhenTimerExpired == clue.roundId ? displayNone : floatLeft} 
                    uniqueKey={clue.roundId}
                    haltTimer={clue.roundId < this.props.currentRoundBeingPlayed || this.props.resurfaceClicked}
                    oxygenBottlesUsed={this.props.oxygenBottlesUsed}
                    currentRoundBeingPlayed={this.props.currentRoundBeingPlayed}
                    timerRanOut={this.props.timerRanOut}
                    /> 
                <div style={{...floatLeft,...{position:"relative"}}} className={diverClassName}>
                    <span style={{...diverSpanStyle,...{display:diverDisplay}}}>{clue.roundId == 1 && !isDiverDead ? "Click Diver To Start" : ""}</span>
                    <span style={{...diverSpanStyle,...{display:diverDisplay}}}>{isDiverDead ? "Dead! Submit and Dive to recover body" : ""}</span>
                    <img src="images/diver2.png" height="80px" style={{...isDiverDead ? diverStyleDead : diverStyleAlive,...{display:diverDisplay,paddingBottom:"20px"}}} onClick={(event) => this.props.onDiverClick(clue.roundId)}>
                    </img>                    
                </div>
                <div style={floatRight}>
                    <div style={buttonPadding}>
                        <button disabled={!isThisTheCurrentRound} className="button" style={{backgroundColor:"coral"}} tabIndex={clue.roundId + "1"}  onClick={(event) => this.props.onClick(clue.roundId)}>
                            {clue.roundId == 7 ? "Complete!" : "Submit And Dive"}
                        </button>
                    </div>
                    <div style={buttonPadding}>
                        <button disabled={!isThisTheCurrentRound}  className="button" style={{backgroundColor:"antiquewhite"}} onClick={(event) =>  this.props.onClickResurface(clue.roundId)}>
                                Resurface
                        </button>
                    </div>
                    <div style={buttonPadding}>
                        <button disabled={!isThisTheCurrentRound || (OXYGEN_BOTTLES_AVAILABLE - this.props.oxygenBottlesUsed) < 1} className="button" onClick={(event) => this.props.onClickOxygen(clue.roundId)}>
                                Refill O<sub>2</sub> (+10s)
                        </button>
                        <span style={displayBlock}>{ (OXYGEN_BOTTLES_AVAILABLE - this.props.oxygenBottlesUsed) + "+ bottles remain"}</span>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}

// readme: this was once a separate component but I was having to pass from parent to child to child and it felt messy
function ClueInner(clue, onChange, wordLookupFeedbackMessage, isThisTheCurrentRound){
    // console.log(clue.roundId);   
    return (
        <div className='ClueInner' style={style}>
            <label className='ClueInnerLabel'>{clue.clueText}</label>
            
            <UserGuess isThisTheCurrentRound={isThisTheCurrentRound} changeUserGuess={onChange} clueId={clue.roundId} wordLookupFeedbackMessage={wordLookupFeedbackMessage}/>  

            {/* consider making this ClueScores into another component?    */}
            {/* <div className='ClueScores' style={textAlignLeft}>                
                {[...Array(clue.roundId)].map((e, i) =>  <ClueScore key={i}/>)}
            </div> */}
         
        </div>
    );
}
var textAlignLeft ={
    textAlign: 'left'
}
// var diverFontSize={
//     fontSize: 'xlarge'
// }

var diverStyleAlive ={
    display: 'block',
    margin: 'auto',
    transform: 'rotate(0deg)'
}
var diverStyleDead ={
    display: 'block',
    margin: 'auto',
    transform: 'rotate(180deg)',
    filter: 'grayscale(1)'
}
var diverSpanStyle={
    position: 'absolute',
    left: '0',
    right: '0',
    bottom: '1%'
}
var style = {
    fontFamily: 'Arial',
    margin: '10px',
    padding: '10px',
    textAlignLast: 'center'
  }
var roundStyle = {
    backgroundColor: 'steelblue',
    color: 'white',
    fontFamily: 'Arial',
    left: '10px',
    width: '20px',
    textAlign: 'center'
  }

  var styleTimer = {
    textAlign: 'center',
    backgroundColor : 'skyblue',
    width: '80px',
    padding: '5px',
    margin: 'auto',
    borderRadius: '25px'
  }

  var inlineBlock = {
    display: 'inline-block',
    width: '100%'
  }

var buttonPadding = {
    padding: '5px'
}

  var floatRight = {
    float: 'right',
    width: '33%',
    textAlign: 'center'
  }

  var floatNone = {
      float: 'none',
      width: '33%'
  }

  var floatLeft = {
    float: 'left',
    width: '33%'
  }

  var displayBlock={
    display: 'block'
  }

  var displayNone ={
      display: 'none'
  }

export default ClueOuter;
