import ReactModal from 'react-modal';
import React, {useState, Component} from 'react';
import Spinner from './Loader';
import './ResultsModal.css';
import ReactTooltip from 'react-tooltip';
import UIfx from 'uifx';
import perfectSfx from './sounds/perfect.mp3'; 
import sadSfx from './sounds/sad.mp3'; 

const perfectSound = new UIfx(perfectSfx);
perfectSound.setVolume(0.9);
const sadSound = new UIfx(sadSfx);
sadSound.setVolume(0.4);

function DisplayLeaderboard()
{
  var leadDiv = document.getElementById("LeaderboardDiv");
  leadDiv.style.display = "block";

  var rulesDiv = document.getElementById("RulesDiv");
  rulesDiv.style.display = "none";

  document.getElementById("RulesSpan").className = "fontSmaller";
  document.getElementById("LeaderboardSpan").className = "fontBigger";
}

function DisplayRules()
{
  var leadDiv = document.getElementById("LeaderboardDiv");
  leadDiv.style.display = "none";

  var rulesDiv = document.getElementById("RulesDiv");
  rulesDiv.style.display = "block";

  document.getElementById("RulesSpan").className = "fontBigger";
  document.getElementById("LeaderboardSpan").className = "fontSmaller";
}

class ResultsModal extends React.Component {
    constructor () {
      super();
      this.state = {
      };

    }
    //scoreData={scoreData.TotalScore} scoreDataDetail={scoreData.ClueScores}

    render () {
      //console.log("ResultsModal" + this.props.showModal);
      
      if(this.props.showModal == false)
      {
        return "";
      }

      if(this.props.highScoreData != null)
      {
        const highScoringRows = []
        for (let index = 0; index < this.props.highScoreData.length; index++) {
          const element = this.props.highScoreData[index];
          highScoringRows.push(
          <tr key={element.playerName}>
            <td>{element.playerName}</td>
            <td>{element.timesPlayed}</td>
            <td>{element.perfectDives}</td>
            <td>{(element.foundTreasure / element.timesPlayed).toFixed(2) * 100}%</td>
            <td>{(element.oxygenTanksUsed / element.timesPlayed).toFixed(2)}</td>
            <td>${element.averagePointsPerDive}m</td>
            <td>{element.longestStreak}</td>
            <td>{element.currentStreak}</td>
            <td>${element.totalPoints}m</td>
          </tr>)
        }

        return (
          <ReactModal 
          isOpen={this.props.showModal}
          contentLabel="Minimal Modal Example"
          appElement={document.getElementById("root")}
          >
            <div>
              <span id="LeaderboardSpan" className="fontBigger"><a href="#" onClick={()=>DisplayLeaderboard()}>Leaderboard</a></span>
              <span> / </span>
              <span id="RulesSpan" className="fontSmaller"><a href="#" onClick={()=>DisplayRules()}>Rules</a></span>
            </div>
            <div id="LeaderboardDiv">
              <table>
                  <thead>
                    <tr>
                      <th data-tip={"Who"}>Player Name</th>
                      <th data-tip={"Number of Times Played"}># Dives Taken</th>
                      <th data-tip={"Number of Maximum Scores"}># Perfect Dives</th>
                      <th data-tip={"FoundTreasure/TimesPlayed * 100"}>% Treasure Found</th>
                      <th data-tip={"TanksOfOxygenUsed/TimesPlayed"}>Oxygen Reliance</th>
                      <th data-tip={"TotalPoints/TimesPlayed"}>Avg Points Per Dive</th>
                      <th data-tip={"Consecutive dives found treasure"}>Longest Streak</th>
                      <th data-tip={"Consecutive dives found treasure"}>Current Streak</th>
                      <th data-tip={"Total Points"}>Total Points</th>
                    </tr>
                  </thead>
                <tbody>
                  {highScoringRows}
                </tbody>
              </table>
            </div>
            <div id="RulesDiv" style={{display:"none"}}>
              <h1>Dive School (Rules)</h1>
              You are diving for a hidden Treasure Word - a series of 6 clues will reveal information about the word's make-up leading you ever closer to it, 
              <br/>
              until the 7th clue will provide you with the dictionary's definition of the word.
              <br/><br/>
              The Treasure Word is always a noun, so guess those if you can, but any valid word will earn 1 point-per-clue-it-satisfies.
              <br/><br/>
              Even if you successfully guess the Treasure Word before the end, there are still points on the table for you to claim by entering<br/>
              other words that meet as many clues as possible.
              <br/><br/>
              There might be plenty more fish in the sea but you'll only play each noun <span style={boldFont}>once</span> - avoid drowning and scoring zero<br/>
              by using the oxygen to buy more time, or Resurface to "bank" i.e, end your turn and receive points for the words you've already submitted.
              <br/><br/>
              <span style={boldFont,red}>Sharks!</span> randomly appear. While struggling with them you cannot refill oxygen tanks!
              <br/><br/>
              <span style={boldFont,blue}>Mines!</span> randomly appear. Take great care to ensure your next answer is a valid dictionary word as the invalid-word buzzer will trigger the mine!
              <br/><br/>
              <span style={boldFont}>Squid!</span> randomly appear. They'll squirt ink to cover up the previous clues - hope you've memorized them!
              <br/><br/>
              A Perfect Dive is achieved by scoring the maximum 38 points.
              This score can be reached by :
              <ul>
                <li>Getting 1pt for every clue that (each of) your submitted word satisfies. Max = 27pts </li>
                <li> +2pts bonus if you got all 27pts</li>
                <li> +3pts if you found the Treasure word</li>
                <li> +1pts for using no oxygen</li>
                <li> +1pts for every unused oxygen tank (up to 5)</li>
              </ul>
              There's treasure to be found - suit-up and lets dive in!
              <br/><br/>
            </div>
            <button onClick={this.props.handleReplay} className="button" value="Replay">Dive Again!</button>
            <ReactTooltip />
          </ReactModal>
        );
      }

      if(this.props.scoreData == null && this.props.highScoreData == null)
      {
        return (
              <ReactModal 
              isOpen={this.props.showModal}
              contentLabel="Minimal Modal Example"
              appElement={document.getElementById("root")}
              >
              <div style={spinnerStyle}><Spinner/></div>
              </ReactModal>
        );
      }

      if(this.props.isDead)
      {
        sadSound.play();
        return (
              <ReactModal 
              isOpen={this.props.showModal}
              contentLabel="Minimal Modal Example"
              appElement={document.getElementById("root")}
              style={{
                content: {
                  color: 'red',
                   backgroundImage: 'url(/images/funeral.jpg)',
                   backgroundSize: 'cover',
                   backgroundPosition: 'center',
                  backgroundColor: 'black',
                  overflow: 'scroll',
                  filter: 'drop-shadow(1px 2px 4px darkblue)'
                }
              }}
              >
              {/* <span className="DeadSpan">Not all treasure hunters return home with loot...
              <button onClick={this.props.handleReplay} className="button" value="Replay">Dive Again!</button>
              </span> */}
              <span className="DeadSpan">
                You perished in the seas while searching for <span style={resultStyle}>{this.props.scoreData.wordBeingSought}</span>
                <br/>
                Top Three Scores for {"'"+ this.props.scoreData.wordBeingSought + "'"} : 
                {DisplayTopThree(this.props.scoreData.topThreeScores)}
                <button onClick={this.props.handleReplay} className="button" value="Replay">Dive Again!</button>
              </span>
              </ReactModal>
        );
      }

      const clueScoringRows = []

      for (let index = 0; index < 7; index++) {
        const element = this.props.scoreData.clueScores[index];
        clueScoringRows.push(
        <tr>
          <td>{this.props.userGuesses[index]}</td>
          <td>{element.scorePerClue[0] > 0 ? SuccessImage() : FailImage(index, 0)}</td>
          <td>{element.scorePerClue[1] > 0 ? SuccessImage() : FailImage(index, 1)}</td>
          <td>{element.scorePerClue[2] > 0 ? SuccessImage() : FailImage(index, 2)}</td>
          <td>{element.scorePerClue[3] > 0 ? SuccessImage() : FailImage(index, 3)}</td>
          <td>{element.scorePerClue[4] > 0 ? SuccessImage() : FailImage(index, 4)}</td>
          <td>{element.scorePerClue[5] > 0 ? SuccessImage() : FailImage(index, 5)}</td>
          <td>{"N/A"}</td>
        </tr>)
      }

      return (
        <div>
          
          <ReactModal 
             isOpen={this.props.showModal}
             contentLabel="Minimal Modal Example"
             appElement={document.getElementById("root")}
             style={{
              content: {
                color: 'darkblue',
                backgroundColor: 'aliceblue',
                overflow: 'scroll',
                filter: 'drop-shadow(1px 2px 4px darkblue)'
              }
            }}
            
          >
            {this.props.scoreData.isPerfectDive != null && this.props.scoreData.isPerfectDive == 1 ? PerfectDive() : ""}
            <br/>  
            You {this.props.scoreData.foundTreasure != null && this.props.scoreData.foundTreasure == 1 ? "successfully found " : "were searching for " } the Treasure Word : <span style={resultStyle}>{this.props.scoreData.wordBeingSought}</span>
            <br/>
            You consumed oxygen bottles : <span style={resultStyle}>{this.props.oxygenBottlesUsed}</span>
            <br/>
            Current Streak : {DisplayPlayerHighScore(this.props.scoreData.playerHighScore)}
            <br/>
            Total Score: <span style={resultStyle}>${this.props.scoreData.totalScore}m</span>
            <br/>
            Top Scores for {this.props.scoreData.wordBeingSought} : 
            {DisplayTopThree(this.props.scoreData.topThreeScores)}
            <br/>
            How you scored against the clues:
            <br/>
            <span style={smallerFont}> (hover over e.g 'Clue 2' to be reminded of that clue)</span>
            <table>
                <thead>
                  <tr>
                    <th></th>
                    <th data-tip={"'" + this.props.clues[0].clueText + "'"}>Clue 1</th>
                    <th data-tip={"'" + this.props.clues[1].clueText + "'"}>Clue 2</th>
                    <th data-tip={"'" + this.props.clues[2].clueText + "'"}>Clue 3</th>
                    <th data-tip={"'" + this.props.clues[3].clueText + "'"}>Clue 4</th>
                    <th data-tip={"'" + this.props.clues[4].clueText + "'"}>Clue 5</th>
                    <th data-tip={"'" + this.props.clues[5].clueText + "'"}>Clue 6</th>
                    <th data-tip={"'" + this.props.clues[6].clueText + "'"}>Clue 7</th>
                  </tr>
                </thead>
              <tbody>
                {clueScoringRows}
              </tbody>
            </table>
            <br/>

            <button onClick={this.props.handleReplay} className="button" value="Replay">Dive Again!</button>
            <ReactTooltip />
          </ReactModal>
        </div>
      );

      function PerfectDive()
      {
        perfectSound.play();
        return(
          <div style={biggerFont}>
            <span style={blue}>CON</span><span style={orange}>GRAT</span><span style={violet}>ULAT</span><span style={red}>IONS! </span>
            <span style={green}>IT'S </span>
            <span style={orange}>A </span>
            <span style={violet}>*PERFECT* </span>
            <span style={red}>DIVE! </span>
          </div>            
        ); 

      }
      function SuccessImage()
      {
        return(
            <img src="/images/Coin.png" width="25px" height="25px" alt="Success Coin"/>
        );
      }

      function FailImage(answerIndex,clueIndex)
      {
        //console.log("aI: " + answerIndex + " cI:" +clueIndex);
        let isThisRelevant = (parseInt(clueIndex) <= parseInt(answerIndex));
        if(!isThisRelevant)
        {
          //console.log("display N/A for aI: " + answerIndex + " cI:" +clueIndex);
          return "N/A";
        }
        //readme: otherwise it was relevant - a clue they knew about and didn't meet so FAILED
        return(

            <img src="/images/Skull.jpg" width="25px" height="25px" alt="Incorrect Skull"/>
          
        );
      }

      function DisplayTopThree(topThree)
      {
        //console.log("DisplayTopThree: " + topThree[0].playerName);
        return(
          <ol>
          <li>{topThree[0] != null && topThree[0] != undefined ? topThree[0].playerName : "...no-one yet"}<span style={resultStyle}>{topThree[0] != null && topThree[0] != undefined ? " : $" + topThree[0].totalPoints + "m" : ""}</span></li>
          <li>{topThree[1] != null && topThree[1] != undefined ? topThree[1].playerName : "...no-one yet"}<span style={resultStyle}>{topThree[1] != null && topThree[1] != undefined  ? " : $" + topThree[1].totalPoints + "m" : ""}</span></li>
          <li>{topThree[2] != null && topThree[2] != undefined ? topThree[2].playerName : "...no-one yet"}<span style={resultStyle}>{topThree[2] != null && topThree[2] != undefined ? " : $" + topThree[2].totalPoints + "m" : ""}</span></li>
          </ol>
        );
      }
      function DisplayPlayerHighScore(playerHighScore)
      {
        return(
          <span style={resultStyle}>{playerHighScore[0].currentStreak}  consec. treasures found</span>
        );
      }

    }
  }

var smallerFont = {
  fontSize: 'smaller'
}

var boldFont = {
  fontWeight: 'bold'
}

var biggerFont = {
  fontSize: 'larger'
}

  var resultStyle = {
    color: 'coral',
    fontFamily: 'Arial',
    fontSize: 'larger',
    textAlign: 'left'
  }

  var red = {
    color: 'red'
  }
  var violet = {
    color: 'violet'
  }
  var green = {
    color: 'green'
  }
  var orange = {
    color: 'orange'
  }
  var blue = {
    color: 'blue'
  }

  var spinnerStyle = {
    margin: "0 auto"
  }

  export default ResultsModal;