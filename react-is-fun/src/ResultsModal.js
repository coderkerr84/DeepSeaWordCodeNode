import ReactModal from 'react-modal';
import React, {useState, Component} from 'react';
import Spinner from './Loader';
import './ResultsModal.css';
import ReactTooltip from 'react-tooltip';

class ResultsModal extends React.Component {
    constructor () {
      super();
      this.state = {
      };

    }
    //scoreData={scoreData.TotalScore} scoreDataDetail={scoreData.ClueScores}

    render () {
      console.log("ResultsModal" + this.props.showModal);
      
      if(this.props.showModal == false)
      {
        return "";
      }

      if(this.props.scoreData == null)
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
        return (
              <ReactModal 
              isOpen={this.props.showModal}
              contentLabel="Minimal Modal Example"
              appElement={document.getElementById("root")}
              style={{
                content: {
                  color: 'red',
                   backgroundImage: 'url(/images/Wife.png)',
                   backgroundSize: 'cover',
                   backgroundPosition: 'center',
                  //backgroundColor: 'aliceblue',
                  overflow: 'scroll',
                  filter: 'drop-shadow(1px 2px 4px darkblue)'
                }
              }}
              >
              <span className="DeadSpan">Not all treasure hunters return home with loot...
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
            You {this.props.scoreData.foundTreasure != null && this.props.scoreData.foundTreasure == 1 ? "succesfully found " : "were searching for " } : <span style={resultStyle}>{this.props.scoreData.wordBeingSought}</span>
            <br/>
            You consumed oxygen bottles : <span style={resultStyle}>{this.props.oxygenBottlesUsed}</span>
            <br/>
            Total Score: <span style={resultStyle}>${this.props.scoreData.totalScore}m</span>
            <br/>
            Top Three Scores for {"'"+ this.props.scoreData.wordBeingSought + "'"} : 
            {DisplayTopThree(this.props.scoreData.topThreeScores)}

            How you did against all the clues :
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
        return(
          <div style={biggerFont}>
            <span style={blue}>Congratulations </span>
            <span style={green}>It's </span>
            <span style={orange}>A </span>
            <span style={violet}>*PERFECT* </span>
            <span style={red}>Dive! </span>
          </div>            
        ); 

      }
      function SuccessImage()
      {
        return(
            <img src="/images/Coin.png" width="25px" height="25px"/>
        );
      }

      function FailImage(answerIndex,clueIndex)
      {
        console.log("aI: " + answerIndex + " cI:" +clueIndex);
        let isThisRelevant = (parseInt(clueIndex) <= parseInt(answerIndex));
        if(!isThisRelevant)
        {
          console.log("display N/A for aI: " + answerIndex + " cI:" +clueIndex);
          return "N/A";
        }
        //readme: otherwise it was relevant - a clue they knew about and didn't meet so FAILED
        return(

            <img src="/images/Skull.jpg" width="25px" height="25px"/>
          
        );
      }

      function DisplayTopThree(topThree)
      {
        console.log("DisplayTopThree: " + topThree[0].playerName);
        return(
          <ol>
          <li>{topThree[0] != null && topThree[0] != undefined ? topThree[0].playerName : "...no-one yet!"}<span style={resultStyle}>{topThree[0] != null && topThree[0] != undefined ? "- $" + topThree[0].totalPoints + "m" : ""}</span></li>
          <li>{topThree[1] != null && topThree[1] != undefined ? topThree[1].playerName : "...no-one yet!"}<span style={resultStyle}>{topThree[1] != null && topThree[1] != undefined  ? "- $" + topThree[1].totalPoints + "m" : ""}</span></li>
          <li>{topThree[2] != null && topThree[2] != undefined ? topThree[2].playerName : "...no-one yet!"}<span style={resultStyle}>{topThree[2] != null && topThree[2] != undefined ? "- $" + topThree[2].totalPoints + "m" : ""}</span></li>
          </ol>
        );
      }

    }
  }

var smallerFont = {
  fontSize: 'smaller'
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