import ReactModal from 'react-modal';
import React, {useState, Component} from 'react';
import Spinner from './Loader';
import './ResultsModal.css';

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
                // backgroundImage: 'url(/images/treasure.jpg)',
                // backgroundSize: 'auto'
                backgroundColor: 'cornsilk',
                overflow: 'scroll'
              }
            }}
            
          >
            You were searching for : <span style={resultStyle}>{this.props.scoreData.wordBeingSought}</span>
            <br/>
            You consumed oxygen bottles : <span style={resultStyle}>{this.props.oxygenBottlesUsed}</span>
            <br/>
            Total Score: <span style={resultStyle}>{this.props.scoreData.totalScore}</span>
            <br/>
            Top Three Scores for {"'"+ this.props.scoreData.wordBeingSought + "'"} : 
            <ol>
              <li>ChrisKerr84 - <span style={resultStyle}>80pts</span></li>
              <li>AlanCrowe81 - <span style={resultStyle}>78pts</span></li>
              <li>BonnieK13 - <span style={resultStyle}>62pts</span></li>
            </ol>

            Did your answers meet all clues' requirements?
            <table>
              <thead>
                <th></th>
                <th>Clue 1</th>
                <th>Clue 2</th>
                <th>Clue 3</th>
                <th>Clue 4</th>
                <th>Clue 5</th>
                <th>Clue 6</th>
                <th>Clue 7</th>
              </thead>
              <tbody>
                {clueScoringRows}
              </tbody>
            </table>
            <br/>

            <button onClick={this.props.handleReplay} value="Replay">Dive Again!</button>
          </ReactModal>
        </div>
      );

      function SuccessImage()
      {
        return(
            <img src="/images/Coin.png" width="25px" height="25px"/>
        );
      }

      function FailImage(answerIndex,clueIndex)
      {
        console.log("aI: " + answerIndex + " cI:" +clueIndex);
        let isThisRelevant = (answerIndex > clueIndex);
        if(!isThisRelevant)
        {
          return "N/A";
        }
        //readme: otherwise it was relevant - a clue they knew about and didn't meet so FAILED
        return(

            <img src="/images/Skull.jpg" width="25px" height="25px"/>
          
        );
      }

    }
  }

  var resultStyle = {
    color: 'coral',
    fontFamily: 'Arial',
    fontSize: 'larger',
    textAlign: 'left'
  }

  var spinnerStyle = {
    margin: "0 auto"
  }
  export default ResultsModal;