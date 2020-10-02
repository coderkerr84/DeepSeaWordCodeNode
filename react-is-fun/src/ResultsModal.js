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
                <Spinner/>
              </ReactModal>
        );
      }

      const clueScoringRows = []

      for (let index = 0; index < 7; index++) {
        const element = this.props.scoreData.clueScores[index];
        clueScoringRows.push(
        <tr>
          <td>{this.props.userGuesses[index]}</td>
          <td>{element.scorePerClue[0] > 0 ? SuccessImage() : FailImage()}</td>
          <td>{element.scorePerClue[1] > 0 ? SuccessImage() : FailImage()}</td>
          <td>{element.scorePerClue[2] > 0 ? SuccessImage() : FailImage()}</td>
          <td>{element.scorePerClue[3] > 0 ? SuccessImage() : FailImage()}</td>
          <td>{element.scorePerClue[4] > 0 ? SuccessImage() : FailImage()}</td>
          <td>{element.scorePerClue[5] > 0 ? SuccessImage() : FailImage()}</td>
          <td>{"N/A"}</td>
        </tr>)
      }

      return (
        <div className="backgroundTreasure" style={{backgroundColor:"antiquewhite"}}>
          
          <ReactModal 
             isOpen={this.props.showModal}
             contentLabel="Minimal Modal Example"
             appElement={document.getElementById("root")}
             classNames={{
              overlay: "customOverlay"
            }}
          >
            You were searching for : {this.props.scoreData.wordBeingSought}
            <br/>
            And used oxygen bottles : {this.props.oxygenBottlesUsed}
            <br/>
            Total Score: {this.props.scoreData.totalScore}
            <br/>
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

      function FailImage()
      {
        return(
          <img src="/images/Skull.jpg" width="25px" height="25px"/>
        );
      }

    }
  }



  export default ResultsModal;