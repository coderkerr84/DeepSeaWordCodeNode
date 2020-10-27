import React from 'react';
import {render} from 'react-dom';
import Timer from './Timer';
import './ClueOuter.css';
import UserGuess from './UserGuess'; 
import ClueScore from './ClueScore';
import TimerCircle from './TimerCircle.js';
import Alert from 'react-bootstrap/Alert';

class ClueOuter extends React.Component
{

    render(){
        let clue = this.props.clue;
        let thisRoundId = clue.roundId;
        let userGuess = this.props.userGuess;
        let foundTreasureInThisRound = this.props.foundTreasureInRound == thisRoundId;
        let sharkAppearsInThisRound = this.props.sharkAppearsInRound == thisRoundId;
        let mineAppearsInThisRound = this.props.mineAppearsInRound == thisRoundId;
        let squidAppearsInThisRound = this.props.squidAppearsInRound == thisRoundId;

        //console.log(this.props.foundTreasureInRound + " ... " + thisRoundId);
        let treasureFoundClassName = foundTreasureInThisRound ? " foundTreasure" : "";

        //console.log(treasureFoundClassName);
        let isThisTheCurrentRound = this.props.currentRoundBeingPlayed == thisRoundId;
        let diverClassName = isThisTheCurrentRound ? "showBlock" : "hideBlock";
        let isDiverDead = this.props.roundTheyWereOnWhenTimerExpired != null;
        let diverDisplay = DiverDisplayFunction(this.props.initializeTimers[clue.roundId - 1],this.props.roundTheyWereOnWhenTimerExpired, clue.roundId);
        
        let sharkEncounterClassName = sharkAppearsInThisRound && !foundTreasureInThisRound ? " sharkEncounter" : "" ;
        let mineEncounterClassName = mineAppearsInThisRound && !foundTreasureInThisRound && !sharkAppearsInThisRound ? " mineEncounter" : "" ;
        let squidEncounterClassName = squidAppearsInThisRound && !foundTreasureInThisRound && !sharkAppearsInThisRound && !mineAppearsInThisRound ? " squidEncounter " : "" ;
        let combinedClassNames = treasureFoundClassName + sharkEncounterClassName + mineEncounterClassName + squidEncounterClassName;
        // readme: this needs to come after all the above.
        let clueOuterClassName = this.props.currentRoundBeingPlayed >= thisRoundId ? "clueOuterInPlay clueOuter" + combinedClassNames : "clueOuterNotInPlay clueOuter" + combinedClassNames;

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
            {this.props.isDemoMode === 1 ? HelpAlert(clue.roundId, this.props.playerName) : ""}
            {/* readme: this below probably should be another Component */}
            <div style={inlineBlock} name={"ClueOuterDiv" + clue.roundId}>
                <div style={floatLeft}>
                    {ClueInner(clue, this.props.changeUserGuess, this.props.wordLookupFeedbackMessages[clue.roundId-1], isThisTheCurrentRound, this.props.startTimer, this.props.squidAppearsInRound, this.props.currentRoundBeingPlayed)}
                </div>
                <TimerCircle 
                    initializeTimers={this.props.initializeTimers} 
                    style={this.props.roundTheyWereOnWhenTimerExpired == clue.roundId ? displayNone : floatLeft} 
                    uniqueKey={clue.roundId}
                    haltTimer={clue.roundId < this.props.currentRoundBeingPlayed || this.props.resurfaceClicked || this.props.roundTheyWereOnWhenTimerExpired == clue.roundId}
                    oxygenBottlesBought={this.props.oxygenBottlesBought}
                    currentRoundBeingPlayed={this.props.currentRoundBeingPlayed}
                    timerRanOut={this.props.timerRanOut}
                    oxygenBottlesApplied={this.props.oxygenBottlesApplied}
                    isDemoMode={this.props.isDemoMode}
                    /> 
                <div style={{...floatLeft,...{position:"relative"}}} className={diverClassName}>
                    <span style={{...diverSpanStyle,...{display:diverDisplay}}}>{clue.roundId == 1 && !isDiverDead ? "Enter a word" : ""}</span>
                    <span style={{...diverSpanStyle,...{display:diverDisplay, backgroundColor:"rgb(255,255,255,0.60)", color: "red", fontWeight: "bold", top : "0"}}}>{isDiverDead ? "Submit and Dive to recover body" : ""}</span>
                    <img src="images/diver2.png" height="51px" style={{...isDiverDead ? diverStyleDead : diverStyleAlive,...{display:diverDisplay,paddingBottom:"30px"}}} onClick={(event) => this.props.onDiverClick(clue.roundId)}>
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
                        <button disabled={!isThisTheCurrentRound || (OXYGEN_BOTTLES_AVAILABLE - this.props.oxygenBottlesBought) < 1 || sharkAppearsInThisRound} className="button" onClick={(event) => this.props.onClickOxygen(clue.roundId)}>
                                Refill O<sub>2</sub> (+10s)
                        </button>
                        <span style={displayBlock}>O<sub>2</sub> reserves: {(OXYGEN_BOTTLES_AVAILABLE - this.props.oxygenBottlesBought)}</span>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}

function HelpAlert(thisRoundNumber, playerName)
{
if(thisRoundNumber === 1)
return (
    <Alert variant="Primary">Hey {playerName} as it's your first time diving I'll accompany you.
            Enter any word that meets the first clue shown below on the left - so a word that contains an 'e'. Submit your word by pressing enter or the "Submit and Dive" button. The oxygen timer will then start.
            If your word is found in the dictionary you'll progress to the next round.
            <br/>
            Suggestion: "<strong>Me</strong>" 
    </Alert>
);
if(thisRoundNumber === 2)
return (
    <Alert variant="Primary">A new clue - this time enter a word that meets it and the previous clue.
    We cannot repeat "Me" or any other word we've already entered above. Think fast - oxygen will run out!
    <br/>
    Suggestion: "<strong>Met</strong>"
    </Alert>
);
if(thisRoundNumber === 3)
return (
    <Alert variant="Primary">Argh a shark! Fighting it prevents us refilling oxygen (the timer)!
            Try and focus on entering a word that meets <strong>all 3 clues</strong>
            <br/>
            Suggestion: "<strong>Bed</strong>"
    </Alert>
);
if(thisRoundNumber === 4)
return (
    <Alert variant="Primary">The pressure builds the deeper you dive!
    It's getting harder to think of a word that meets all the clues.
    Entering a word that meets some clues is better than nothing! 
    <br/>
    Suggestion: "<strong>Bled</strong>" 
    </Alert>
);
if(thisRoundNumber === 5)
return (
    <Alert variant="Primary">Timer getting low? Press button to refill oxygen!
    Used it all up? Better Resurface and 'bank' the points earned so far!   
    <br/>
    Suggestion: "<strong>Read</strong>"         
    </Alert>
);
if(thisRoundNumber === 6)
return (
    <Alert variant="Primary">Gosh! A giant squid has shot its load on the previous clues!
    Hope you can remember what they were!! 
    <br/>
    Suggestion: "<strong>Bead</strong>"    
    </Alert>
);
if(thisRoundNumber === 7)
return (
    <Alert variant="Primary">Whoa an old WWII German sea-mine! Be extra careful entering a word this round. 
    If your entry is not found in the dictionary the mine will detonate! Play it safe!
    <br/>
    Suggestion: "<strong>Beard</strong>" <br/>
    (If we'd already entered Beard earlier we'd have to enter something else here - e.g Breed)
    </Alert>
);
}

// readme: this was once a separate component but I was having to pass from parent to child to child and it felt messy
function ClueInner(clue, onChange, wordLookupFeedbackMessage, isThisTheCurrentRound, startTimer, squidAppearsInRound, currentRoundBeingPlayed){
    // console.log(clue.roundId);   
    let haveTheyReachedTheSquidLevelYet = currentRoundBeingPlayed == squidAppearsInRound;

    if(haveTheyReachedTheSquidLevelYet && squidAppearsInRound > 0 && clue.roundId < squidAppearsInRound)
    {
        return (
            <div className='ClueInner' style={style}>
                <span>*<label className='clueSquid'>{clue.clueText}</label>*</span>
                
                <UserGuess 
                    isThisTheCurrentRound={isThisTheCurrentRound} 
                    changeUserGuess={onChange} 
                    clueId={clue.roundId} 
                    wordLookupFeedbackMessage={wordLookupFeedbackMessage}
                    startTimer={startTimer}
                />  
             
            </div>
        );
    }

    return (
        <div className='ClueInner' style={style}>
            <label className='ClueInnerLabel'>{clue.clueText}</label>
            
            <UserGuess 
                isThisTheCurrentRound={isThisTheCurrentRound} 
                changeUserGuess={onChange} 
                clueId={clue.roundId} 
                wordLookupFeedbackMessage={wordLookupFeedbackMessage}
                startTimer={startTimer}
            />  
         
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
    fontFamily: 'Courier,Arial',
    // margin: '10px',
    padding: '10px',
    textAlignLast: 'center',
    backgroundColor: 'rgb(255,255,255,0.70)',
  }
var roundStyle = {
    backgroundColor: 'steelblue',
    color: 'white',
    fontFamily: 'Courier,Arial',
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
    padding: '6px'
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
