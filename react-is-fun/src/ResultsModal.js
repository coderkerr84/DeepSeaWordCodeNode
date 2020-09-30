import ReactModal from 'react-modal';
import React, {useState, Component} from 'react';
import Spinner from './Loader';

class ResultsModal extends React.Component {
    constructor () {
      super();
      this.state = {
      };

    }
    
    render () {
      return (
        <div>

          <ReactModal 
             isOpen={this.props.showModal}
             contentLabel="Minimal Modal Example"
             appElement={document.getElementById("root")}
          >

            You were searching for {this.props.temporaryWord}
            <br/>
            And used oxygen bottles : {this.props.oxygenBottlesUsed}

            <button onClick={this.props.handleReplay} value="Replay">Replay</button>
          </ReactModal>
        </div>
      );
    }
  }
  
  //const props = {};
  
  //ReactDOM.render(<ExampleApp {...props} />, document.getElementById('main'))

  export default ResultsModal;