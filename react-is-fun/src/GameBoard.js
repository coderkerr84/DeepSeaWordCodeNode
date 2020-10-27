import React from 'react';
import {render} from 'react-dom';
import './GameBoard.css';
import ClueOuter from './ClueOuter';
import Spinner from './Loader';
import UserName from './UserName';
import ResultsModal from './ResultsModal';
import okaySfx from './sounds/okay.mp3'; 
import waterSfx from './sounds/water.mp3'; 
import treasureSfx from './sounds/treasure.mp3'; 
import gaspSfx from './sounds/gasp.mp3'; 
import rejectedSfx from './sounds/rejected.mp3';
import bombSfx from './sounds/bomb.mp3';
import sharkSfx from './sounds/jaws.mp3';
import squirtSfx from './sounds/squirt.mp3'; 
import UIfx from 'uifx';

const okaySound = new UIfx(okaySfx);
okaySound.setVolume(0.4);
const waterSound = new UIfx(waterSfx);
waterSound.setVolume(0.6);
const treasureSound = new UIfx(treasureSfx);
treasureSound.setVolume(1.0);
const gaspSound = new UIfx(gaspSfx);
gaspSound.setVolume(0.5);
const rejectedSound = new UIfx(rejectedSfx);
rejectedSound.setVolume(0.7);
const bombSound = new UIfx(bombSfx);
bombSound.setVolume(0.9);
const sharkSound = new UIfx(sharkSfx);
sharkSound.setVolume(0.3);
const squirtSound = new UIfx(squirtSfx);
squirtSound.setVolume(0.7);

function getRandomInt(min, max) {
  var num = Math.floor(Math.random() * Math.floor(max));
  console.log("getRandomInt: " + min + " and " + max);
  console.log("num :" + num);
  if(num >= min && num <= max)
  {
    return num;
  }
  return 0;
}

class GameBoard extends React.Component
{
    addressOfService = "deepseaword.com"; // localhost:5000 | deepseaword.com
    // const [currentRoundBeingPlayed, setCount] = useState(1);
    constructor(props) {
        super(props);
        this.state = {
          userGuesses: Array(7).fill(null),
          currentRound: 1,
          oxygenBottlesBought: 0,
          oxygenBottlesApplied: 0,
          initializeTimers: Array(7).fill(null),
          clues: null,
          roundTheyWereOnWhenTimerExpired: null,
          isLoadingPage: true,
          wordLookupFeedbackMessages: Array(7).fill(null),
          userName: "",
          showModal: false,
          dictionaryCheckInProgress: false,
          scoreData: null,
          scoreLoading: false,
          resurfaceClicked: false,
          highScoreData: null,
          foundTreasureInRound: null,
          sharkAppearsInRound: getRandomInt(1,4),
          squidAppearsInRound: getRandomInt(5,7),
          mineAppearsInRound: getRandomInt(6,8),
          gameStarted: 0,
          isDemoMode: 0
        };
      }

     updateWordFeedback(thisRoundNumber, message){
      const wordLookupFeedbackMessagesCopy = this.state.wordLookupFeedbackMessages.slice();
      wordLookupFeedbackMessagesCopy[thisRoundNumber-1] = message;
      this.setState({wordLookupFeedbackMessages : wordLookupFeedbackMessagesCopy})
     }
    
     // readme: very important function!
     checkWord(thisRoundNumber,userGuess){
      //console.log(thisRoundNumber + " checkWord : " +userGuess )
      this.updateWordFeedback(thisRoundNumber,'Checking dictionary...');
      userGuess = userGuess.trim().toUpperCase();

      if(userGuess == "" || userGuess == null)
      {
        this.updateWordFeedback(thisRoundNumber,'Enter word then Submit and Dive');
        rejectedSound.play();
        return false;
      }

      // readme : they have already used this word on prev round
      // and the +1 because the array is indexed at 0.
      if(this.state.userGuesses.indexOf(userGuess) > -1 && parseInt(this.state.userGuesses.indexOf(userGuess) + 1) < thisRoundNumber)
      {
        this.updateWordFeedback(thisRoundNumber,'Can\'t use that word again!');
        rejectedSound.play();
        return false;
      }

      if(this.state.dictionaryCheckInProgress)
      {
        this.updateWordFeedback(thisRoundNumber,'Double-clickers will be left behind!');
        rejectedSound.play();
        return false;
      }

      this.setState({dictionaryCheckInProgress: true}); 
      //https://deepseaworddotnetservice.azurewebsites.net/Entries
      fetch('http://' + this.addressOfService + '/Entries/LookupWord?word=' + userGuess + '&playerName=' + this.state.userName)
        .then(res => res.json())
        .then((data) => {
          //this.setState({ clues: data })
          if(data != null)
          {
            console.log('word def:' + data.definition);
            // readme: word was a real word.
            this.updateWordFeedback(thisRoundNumber,'Found in dictionary.');
            //console.log(userGuess.trim().toUpperCase() + " ? " + this.state.clues.temporaryWord.trim().toUpperCase());
            if(userGuess.trim().toUpperCase() == this.state.clues.temporaryWord.trim().toUpperCase())
            {
              treasureSound.play();
              this.setState({foundTreasureInRound:thisRoundNumber })
              this.updateWordFeedback(thisRoundNumber,'Great! Keep going - valid words earn $$');
            }
            else
            {
              okaySound.play();
              //this.handleSoundOkay();
            }
            this.setState({currentRound: thisRoundNumber+1});

            if(thisRoundNumber < 7)
            {
              this.handleDiverClick(thisRoundNumber+1);
            }
            else
            {
              //readme: kick-off the completion code.
              //perform scoring and open lightbox to display response to that?
              this.setState({showModal: true});
              this.SendToScoringService();  
            }
          }
          else
          {
            if(this.state.mineAppearsInRound == thisRoundNumber){
              bombSound.play();
              this.updateWordFeedback(thisRoundNumber,'NOT found - mine exploded!');
              this.setState({roundTheyWereOnWhenTimerExpired: thisRoundNumber}); 
            }
            else{
              this.updateWordFeedback(thisRoundNumber,'NOT found - try another!');
              rejectedSound.play();
            }     
          }

          this.setState({dictionaryCheckInProgress: false}); 

      })
      .catch( (error)=>
      {
        console.log(error);
        this.updateWordFeedback(thisRoundNumber,'Apparatus failure. Try again')
      });
    }

    SendToScoringService = () => {

              this.setState({scoreLoading: true});
              let clueInfo = Array(7).fill(null);
              clueInfo = this.state.clues.clues.map(item => item.significantClueInfo)

              const formData = new FormData();

              formData.append('GUID', this.state.clues.guid);
              formData.append('userName', this.state.userName);
              //readme: replace 14 lines these with LOOPS!
              formData.append('userGuesses[0]', (this.state.userGuesses[0] != null ? this.state.userGuesses[0] : 'realnull' ));
              formData.append('userGuesses[1]', (this.state.userGuesses[1] != null ? this.state.userGuesses[1] : 'realnull' ));
              formData.append('userGuesses[2]', (this.state.userGuesses[2] != null ? this.state.userGuesses[2] : 'realnull' ));
              formData.append('userGuesses[3]', (this.state.userGuesses[3] != null ? this.state.userGuesses[3] : 'realnull' ));
              formData.append('userGuesses[4]', (this.state.userGuesses[4] != null ? this.state.userGuesses[4] : 'realnull' ));
              formData.append('userGuesses[5]', (this.state.userGuesses[5] != null ? this.state.userGuesses[5] : 'realnull' ));
              formData.append('userGuesses[6]', (this.state.userGuesses[6] != null ? this.state.userGuesses[6] : 'realnull' ));
              formData.append('clueInfo[0]', clueInfo[0]);
              formData.append('clueInfo[1]', clueInfo[1]);
              formData.append('clueInfo[2]', clueInfo[2]);
              formData.append('clueInfo[3]', clueInfo[3]);
              formData.append('clueInfo[4]', clueInfo[4]);
              formData.append('clueInfo[5]', clueInfo[5]);
              formData.append('clueInfo[6]', clueInfo[6]);
              formData.append('oxygenUsed', this.state.oxygenBottlesBought);
              formData.append('isDead', this.state.roundTheyWereOnWhenTimerExpired != null)

              //http://deepseaworddotnetservice.azurewebsites.net
              fetch('http://' + this.addressOfService + '/Entries/SubmitForScoring/', {
                    method: 'POST',
                    body: formData
                  })
                  .then(response => response.json())
                  .then(data => {

                    this.setState({scoreLoading: false, scoreData: data});

                  });

    }

    handleReplay = () => {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      this.componentDidMount();
      this.fetchNewWord();
      //this.render();
    }

    handleSoundOkay = () => {
      okaySound.play()
    }

    handleResurfaceClick = (thisRoundNumber) =>{
      this.setState({resurfaceClicked: true});
      this.setState({showModal: true});
      this.SendToScoringService();  
    }

    handleSubmitAndDiveClick = (thisRoundNumber) => {
      //readme: checking the word is good before advancing
        console.log(this.state.mineAppearsInRound);
        if(this.state.initializeTimers[0] == null)
        {
          alert("Please click the diver image to start the timer \n  ");
        }
        else if(this.state.roundTheyWereOnWhenTimerExpired != null)
        {
          this.setState({showModal: true});
          this.SendToScoringService();  
        }
        else
        {
          this.checkWord(thisRoundNumber, this.state.userGuesses[thisRoundNumber-1]);
        }
    };

      // readme: is really a "move to next round" function - believed to only be possible to trigger once per round
      // so doesn't have any protection to prevent multiple calls to it.
      handleDiverClick = (thisRoundNumber) =>{
        this.progressToNextRound(thisRoundNumber);
      }

      // readme: basically init the first timer, triggered by OnFocus on first word, so might (accidentally) be triggered many times
      // hence need for "gameStarted" to ensure only first time does something.
      startTimer = (thisRoundNumber) =>{
        if(thisRoundNumber===1 && this.state.gameStarted == 0) {
          this.progressToNextRound(thisRoundNumber);
        }
      }

      progressToNextRound(thisRoundNumber){
        //console.log("url :" + window.location.search);
        this.setState({gameStarted : 1})
        if(thisRoundNumber===1) waterSound.play();
        //console.log("thisROundNum : " + thisRoundNumber + " sk : " + this.state.sharkAppearsInRound);
        if(thisRoundNumber === this.state.sharkAppearsInRound) sharkSound.play();
        if(thisRoundNumber === this.state.squidAppearsInRound) squirtSound.play();
          //alert('Clicked on diver' + thisRoundNumber);
          const initializeTimersCopy = this.state.initializeTimers.slice();
          // readme: timer has been initialized
          initializeTimersCopy[thisRoundNumber-1] = 1;
          this.setState({initializeTimers : initializeTimersCopy})
          
      }

      handleOxygenClick = (thisRoundNumber) => {
        gaspSound.play();
        //readme: not sure if I'll want to count which round the oxygen was used in, might leave param there til i decide
        let oxygenBottlesBoughtNew = this.state.oxygenBottlesBought + 1;
        this.setState({oxygenBottlesBought: oxygenBottlesBoughtNew});
      };
      
    //readme: this is an example of 2 pieces of info being returned to the parent from a child so we can update the state
      handleChangeUserGuess = (userGuess,i, key) => {
        console.log("key was :" + key);

        const userGuessesCopy = this.state.userGuesses.slice();
        userGuessesCopy[i-1] = userGuess.trim().toUpperCase();
        this.setState({userGuesses: userGuessesCopy});
          
        if(key == "Enter")
        {
          // readme: they pressed enter, assume they want to trigger a SubmitAndDive
          this.handleSubmitAndDiveClick(i);
        }
     }

     handleEnterUserName = (theirUserName, key) => {
       //console.log("key was :" + key);
       if(key == "Enter" && theirUserName.trim().length > 0)
       {
        this.setState({userName: theirUserName});
        this.fetchNewWord(theirUserName.trim());
       }
     }

      fetchNewWord(theirUserName){
        var userName = this.state.userName;
        if(userName.length == 0) userName = theirUserName;

        fetch('http://' + this.addressOfService + '/Entries/GetWordWithClues?userName=' + userName)
        .then(res => res.json())
        .then((data) => {
          this.setState({ clues: data, isLoadingPage: false })
          if(data.isFirstTime)
          {
            this.setupDemoMode();
          }
        })
        .catch(console.log)
     }

     setupDemoMode() {
           // readme: first time playing? send them on demo mode.
            // can also put ths shark, jellyfish and bomb to def show .
            this.setState({sharkAppearsInRound: 3, mineAppearsInRound:7, squidAppearsInRound:6, isDemoMode:1});
     }

     handleHighScoreDisplay = () =>{
      this.setState({showModal: true});

          fetch('http://' + this.addressOfService + '/Entries/GetHighScores')
          .then(res => res.json())
          .then((data) => {
            this.setState({ highScoreData: data})
        })
        .catch(console.log)
     }

     handleHighScoreHide = () =>{
      this.setState({showModal: false, highScoreMode: 0});
     }

     handleTimerRanOut = (i) => {
        this.setState({roundTheyWereOnWhenTimerExpired: i})
        //todo: drown him!
     }

     componentDidMount() {
       // readme: resets all state except username and then fetch a new word
      this.setState({
        userGuesses: Array(7).fill(null),
        currentRound: 1,
        oxygenBottlesBought: 0,
        oxygenBottlesApplied: 0,
        initializeTimers: Array(7).fill(null),
        clues: null,
        roundTheyWereOnWhenTimerExpired: null,
        isLoadingPage: true,
        wordLookupFeedbackMessages: Array(7).fill(null),
        showModal: false,
        dictionaryCheckInProgress: false,
        scoreData: null,
        scoreLoading: false,
        resurfaceClicked: false,
        highScoreData: null,
        foundTreasureInRound : null,
        sharkAppearsInRound: getRandomInt(1,4),
        squidAppearsInRound: getRandomInt(5,7),
        mineAppearsInRound: getRandomInt(6,8),
        gameStarted: 0,
        isDemoMode: 0
        //userName: ""
      });
    }


      render()
      {
        // let clues = GetJson();
        // let parsedClues = JSON.parse(clues);
        let parsedClues = this.state.clues; 
        // console.log(parsedClues);
        // console.log(" and ")
        // console.log(parsedClues2);
        return (
            <div className="background center-screen">
                <div className='TitleBar' style={titleStyle}>
                    DeepSeaWord                  
                </div>
                <div style={creditStyle}>
                    by Chris Kerr               
                </div>
                <div className='GameBoard' style={instructionsStyle}>
                    <a href="#" style={{color:"gold", fontWeight: "bold", textAlign:"left", paddingRight:"15px"}} onClick={this.handleHighScoreDisplay} >High Scores</a>
                    &nbsp;
                    <a href="#" style={{color:"coral", fontWeight: "bold", textAlign:"right", paddingLeft:"15px"}} onClick={this.handleHighScoreDisplay} >Dive School</a>
                    {this.state.isLoadingPage || this.state.userName == "" ? <div><Spinner/><UserName userName={this.state.userName} changeUserName={this.handleEnterUserName}/></div>  : this.renderClues(parsedClues)}
                    {this.renderScore()}
                </div>
   
            </div>
            )
        }
        renderScore()
        {
          console.log("renderScore(scoreData)");
          
          if (this.state.clues == null)
          {            
            return(
                
              <ResultsModal highScoreData={this.state.highScoreData} isDead={this.state.roundTheyWereOnWhenTimerExpired != null} scoreData={this.state.scoreData} userGuesses={this.state.userGuesses} oxygenBottlesUsed={this.state.oxygenBottlesBought} showModal={this.state.showModal} handleReplay={this.handleReplay}/>
          
            );
          }

          return(
              
                  <ResultsModal highScoreData={this.state.highScoreData} isDead={this.state.roundTheyWereOnWhenTimerExpired != null} clues={this.state.clues.clues} scoreData={this.state.scoreData} userGuesses={this.state.userGuesses} oxygenBottlesUsed={this.state.oxygenBottlesBought} showModal={this.state.showModal} handleReplay={this.handleReplay}/>
              
          );
        }

        renderClues(parsedClues)
        {
            let rows = [];
            var x = parsedClues;
            if(x != null)
            {
              //console.log(x.clues[0]);
            
              for(var i = 1; i < parsedClues.clues.length + 1; i++){
                  rows.push(this.renderClue(i, parsedClues.clues[i-1]));  
              }
            }

            return rows;
        }

        renderClue(i, clue)
        {
            return (
                //readme: wonder at what point its an antipattern to pass so much down.
                <ClueOuter 
                    style={style} 
                    clue={clue} 
                    key={i} 
                    userGuess={this.state.userGuesses[i-1]} 
                    onClick={this.handleSubmitAndDiveClick} 
                    onClickResurface={this.handleResurfaceClick} 
                    onClickOxygen={this.handleOxygenClick} 
                    changeUserGuess={this.handleChangeUserGuess} 
                    currentRoundBeingPlayed={this.state.currentRound}
                    initializeTimers={this.state.initializeTimers}
                    onDiverClick={this.handleDiverClick}
                    oxygenBottlesBought={this.state.oxygenBottlesBought} 
                    oxygenBottlesApplied={this.state.oxygenBottlesApplied}
                    timerRanOut={this.handleTimerRanOut}
                    roundTheyWereOnWhenTimerExpired={this.state.roundTheyWereOnWhenTimerExpired}
                    wordLookupFeedbackMessages={this.state.wordLookupFeedbackMessages}    
                    resurfaceClicked={this.state.resurfaceClicked}       
                    foundTreasureInRound={this.state.foundTreasureInRound}   
                    sharkAppearsInRound={this.state.sharkAppearsInRound}
                    mineAppearsInRound={this.state.mineAppearsInRound}  
                    squidAppearsInRound={this.state.squidAppearsInRound}  
                    startTimer={this.startTimer}
                    isDemoMode={this.state.isDemoMode}
                    playerName={this.state.userName}
                    />   
            );
        }
}

var instructionsStyle = {
    //backgroundColor: 'lightblue',
    color: 'white',
    // readme: hehe 'Arial', get it?
    fontFamily: 'Courier,Helvetica,Arial',
    fontSize: '13px',
    // margin: '20px 200px 40px 200px',
    padding: '2px',
    minWidth: '50%',
    textAlign: 'center',
    // readme: better on mobile if no % here
    // width: '60%'
}

var style = {
    backgroundColor: 'lightblue',
    color: 'darkblue',
    // readme: hehe 'Arial', get it?
    fontFamily: 'Courier,Helvetica,Arial',
    fontSize: '12px',
    // margin: '20px 200px 40px 200px',
    padding: '20px',
    textAlign: 'left'
  }

  var creditStyle = {
    //backgroundColor: 'lightblue',
    color: 'gold',
    fontFamily: 'Cochin',
    fontSize: '11px',
    textAlign: 'Center',
    top: '0px'
  }


var titleStyle = {
    //backgroundColor: 'lightblue',
    color: 'yellow',
    fontFamily: 'Phosphate,Impact,Helvetica,Arial',
    fontSize: '45px',
    textAlign: 'Center',
    top: '0px'
  }


export default GameBoard;
