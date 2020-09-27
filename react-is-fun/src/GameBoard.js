import React, {useState, Component} from 'react';
import {render} from 'react-dom';
import ClueOuterList from './ClueOuterList';
import './GameBoard.css';
import ClueOuter from './ClueOuter';
import Spinner from './Loader';

class GameBoard extends React.Component
{ 
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
          wordLookupFeedbackMessages: Array(7).fill(null)
        };
      }

     updateWordFeedback(thisRoundNumber, message){
      const wordLookupFeedbackMessagesCopy = this.state.wordLookupFeedbackMessages.slice();
      wordLookupFeedbackMessagesCopy[thisRoundNumber-1] = message;
      this.setState({wordLookupFeedbackMessages : wordLookupFeedbackMessagesCopy})
     }

     checkWord(thisRoundNumber,userGuess){

      this.updateWordFeedback(thisRoundNumber,'Checking dictionary...');

      fetch('https://deepseaworddotnetservice.azurewebsites.net/Entries/LookupWord?word=' + userGuess)
        .then(res => res.json())
        .then((data) => {
          //this.setState({ clues: data })
          if(data != null)
          {
            console.log('word def:' + data.definition);
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
              alert('You were searching for : ' + this.state.clues.temporaryWord
              + '\n' + 'And used oxygen bottles : ' + this.state.oxygenBottlesUsed);
            }
          }
          else
          {
            this.updateWordFeedback(thisRoundNumber,'NOT found - try another!');
          }

      })
      .catch( ()=>
      {
        this.updateWordFeedback(thisRoundNumber,'Apparatus failure. Try again')
      });
    }

      handleSubmitAndDiveClick = (thisRoundNumber) => {
        //readme: checking the word is good before advancing
        this.checkWord(thisRoundNumber, this.state.userGuesses[thisRoundNumber-1]);
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

     handleTimerRanOut = (i) => {
        this.setState({roundTheyWereOnWhenTimerExpired: i})
        //todo: drown him!
     }

     componentDidMount() {
      this.setState({ isLoadingPage: true });
        fetch('https://deepseaworddotnetservice.azurewebsites.net/Entries/GetWordWithClues')
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
        let parsedClues2 = this.state.clues; 

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
                    
                    {this.state.isLoadingPage ? <Spinner/> : this.renderClues(parsedClues2)}
                </div>
            </div>
            )
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
                    onClickOxygen={this.handleOxygenClick} 
                    changeUserGuess={this.handleChangeUserGuess} 
                    currentRoundBeingPlayed={this.state.currentRound}
                    initializeTimers={this.state.initializeTimers}
                    onDiverClick={this.handleDiverClick}
                    oxygenBottlesUsed={this.state.oxygenBottlesUsed}  
                    timerRanOut={this.handleTimerRanOut}
                    roundTheyWereOnWhenTimerExpired={this.state.roundTheyWereOnWhenTimerExpired}
                    wordLookupFeedbackMessages={this.state.wordLookupFeedbackMessages}                  
                    />   
            );
        }
}

function GetJson2()
{
  fetch('https://deepseaworddotnetcore.azurewebsites.net/Entries/GetWordWithClues')
  .then(
    function(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }

      // Examine the text in the response
      response.json().then(function(data) {
        console.log(data);
        return data;
      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });
}

function GetJson()
{

    var obj = {
        table: []
    }
    // PIPE
    obj.table.push({id: 1, clue: "Contains letter 'i'."});
    obj.table.push({id: 2, clue: "Has fewer than 5 letters."});
    obj.table.push({id: 3, clue: "Ends with 'e'"});
    obj.table.push({id: 4, clue: "Syallable count : 1"});
    obj.table.push({id: 5, clue: "Vowel count : 2"});
    obj.table.push({id: 6, clue: "First letter 'P'"});
    obj.table.push({id: 7, clue: "A cask usually containing two hogsheads or 126 gallons"});

    var json = JSON.stringify(obj);
    
    return json;
}

var instructionsStyle = {
    //backgroundColor: 'lightblue',
    color: 'white',
    // readme: hehe 'Arial', get it?
    fontFamily: 'Arial',
    fontSize: '12px',
    // margin: '20px 200px 40px 200px',
    padding: '20px',
    textAlign: 'center',
    width: '60%'
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
    fontFamily: 'Phosphate',
    fontSize: '45px',
    textAlign: 'Center',
    top: '0px'
  }


export default GameBoard;
