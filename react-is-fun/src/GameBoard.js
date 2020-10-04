import React, {useState, Component} from 'react';
import {render} from 'react-dom';
import './GameBoard.css';
import ClueOuter from './ClueOuter';
import Spinner from './Loader';
import UserName from './UserName';
import ResultsModal from './ResultsModal';

class GameBoard extends React.Component
{
    addressOfService = "deepseaword.com"; //localhost:5000
    // const [currentRoundBeingPlayed, setCount] = useState(1);
    constructor(props) {
        super(props);
        this.state = {
          userGuesses: Array(7).fill(null),
          currentRound: 1,
          oxygenBottlesUsed: 0,
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
          resurfaceClicked: false
        };
      }

     updateWordFeedback(thisRoundNumber, message){
      const wordLookupFeedbackMessagesCopy = this.state.wordLookupFeedbackMessages.slice();
      wordLookupFeedbackMessagesCopy[thisRoundNumber-1] = message;
      this.setState({wordLookupFeedbackMessages : wordLookupFeedbackMessagesCopy})
     }
 
     checkWord(thisRoundNumber,userGuess){
      console.log(thisRoundNumber + " checkWord : " +userGuess )
      this.updateWordFeedback(thisRoundNumber,'Checking dictionary...');

      if(userGuess == "" || userGuess == null)
      {
        this.updateWordFeedback(thisRoundNumber,'Enter word then Submit and Dive');
        return false;
      }
      if(this.state.dictionaryCheckInProgress)
      {
        this.updateWordFeedback(thisRoundNumber,'Double-clickers will be left behind!');
        return false;
      }

      this.setState({dictionaryCheckInProgress: true}); 
      
      //https://deepseaworddotnetservice.azurewebsites.net/Entries
      fetch('http://' + this.addressOfService + '/Entries/LookupWord?word=' + userGuess)
        .then(res => res.json())
        .then((data) => {
          //this.setState({ clues: data })
          if(data != null)
          {
            //console.log('word def:' + data.definition);
            // readme: word was a real word.
            this.updateWordFeedback(thisRoundNumber,'Found in dictionary.');
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
            this.updateWordFeedback(thisRoundNumber,'NOT found - try another!');
          }
          this.setState({dictionaryCheckInProgress: false}); 

      })
      .catch( ()=>
      {
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
              formData.append('userGuesses[0]', this.state.userGuesses[0]);
              formData.append('userGuesses[1]', this.state.userGuesses[1]);
              formData.append('userGuesses[2]', this.state.userGuesses[2]);
              formData.append('userGuesses[3]', this.state.userGuesses[3]);
              formData.append('userGuesses[4]', this.state.userGuesses[4]);
              formData.append('userGuesses[5]', this.state.userGuesses[5]);
              formData.append('userGuesses[6]', this.state.userGuesses[6]);
              formData.append('clueInfo[0]', clueInfo[0]);
              formData.append('clueInfo[1]', clueInfo[1]);
              formData.append('clueInfo[2]', clueInfo[2]);
              formData.append('clueInfo[3]', clueInfo[3]);
              formData.append('clueInfo[4]', clueInfo[4]);
              formData.append('clueInfo[5]', clueInfo[5]);
              formData.append('clueInfo[6]', clueInfo[6]);
              formData.append('oxygenUsed', this.state.oxygenBottlesUsed);
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
      this.componentDidMount()
      //this.render();
    }

    handleResurfaceClick = (thisRoundNumber) =>{
      this.setState({resurfaceClicked: true});
      this.setState({showModal: true});
      this.SendToScoringService();  
    }

    handleSubmitAndDiveClick = (thisRoundNumber) => {
      //readme: checking the word is good before advancing

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

      handleDiverClick = (thisRoundNumber) =>{
          //alert('Clicked on diver' + thisRoundNumber);
          const initializeTimersCopy = this.state.initializeTimers.slice();
          // readme: timer has been initialized
          initializeTimersCopy[thisRoundNumber-1] = 1;
          this.setState({initializeTimers : initializeTimersCopy})
      }

      handleOxygenClick = (thisRoundNumber) => {
        //readme: not sure if I'll want to count which round the oxygen was used in, might leave param there til i decide
        let oxygenBottlesUsedNew = this.state.oxygenBottlesUsed + 1;
        this.setState({oxygenBottlesUsed: oxygenBottlesUsedNew});
      };
      
    //   readme: this is an example of 2 pieces of info being returned to the parent from a child so we can update the state
      handleChangeUserGuess = (userGuess,i) => {
        const userGuessesCopy = this.state.userGuesses.slice();
        userGuessesCopy[i-1] = userGuess;
        this.setState({userGuesses: userGuessesCopy});
     }

     handleEnterUserName = (theirUserName) => {
       this.setState({userName: theirUserName});
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
        oxygenBottlesUsed: 0,
        initializeTimers: Array(7).fill(null),
        clues: null,
        roundTheyWereOnWhenTimerExpired: null,
        isLoadingPage: true,
        wordLookupFeedbackMessages: Array(7).fill(null),
        showModal: false,
        dictionaryCheckInProgress: false,
        scoreData: null,
        scoreLoading: false,
        resurfaceClicked: false
        //userName: ""
      });
        
      fetch('http://' + this.addressOfService + '/Entries/GetWordWithClues')
          .then(res => res.json())
          .then((data) => {
            this.setState({ clues: data, isLoadingPage: false })
        })
        .catch(console.log)
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
                    In every round submit a word that meets that clue and all previous clues. <br/> 
                    Dont run out of oxygen! If the timer expires so do you! <br/> 
                    High scores require: speed, valid words, limited oxygen refills 
                    and finding that treasure!  
                  
                    {this.state.isLoadingPage || this.state.userName == "" ? <div><Spinner/><UserName changeUserName={this.handleEnterUserName}/></div>  : this.renderClues(parsedClues)}
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
            return null;
          }

          return(
              
                  <ResultsModal isDead={this.state.roundTheyWereOnWhenTimerExpired != null} clues={this.state.clues.clues} scoreData={this.state.scoreData} userGuesses={this.state.userGuesses} oxygenBottlesUsed={this.state.oxygenBottlesUsed} showModal={this.state.showModal} handleReplay={this.handleReplay}/>
              
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
                    oxygenBottlesUsed={this.state.oxygenBottlesUsed}  
                    timerRanOut={this.handleTimerRanOut}
                    roundTheyWereOnWhenTimerExpired={this.state.roundTheyWereOnWhenTimerExpired}
                    wordLookupFeedbackMessages={this.state.wordLookupFeedbackMessages}    
                    resurfaceClicked={this.state.resurfaceClicked}              
                    />   
            );
        }
}

var instructionsStyle = {
    //backgroundColor: 'lightblue',
    color: 'white',
    // readme: hehe 'Arial', get it?
    fontFamily: 'Arial',
    fontSize: '13px',
    // margin: '20px 200px 40px 200px',
    padding: '20px',

    textAlign: 'center',
    // readme: better on mobile if no % here
    // width: '60%'
}

var style = {
    backgroundColor: 'lightblue',
    color: 'darkblue',
    // readme: hehe 'Arial', get it?
    fontFamily: 'Arial',
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
    fontFamily: 'Phosphate,Futura,Rockwell',
    fontSize: '45px',
    textAlign: 'Center',
    top: '0px'
  }


export default GameBoard;
