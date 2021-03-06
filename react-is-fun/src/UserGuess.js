import React, {useState, Component} from 'react';
import {render} from 'react-dom';

class UserGuess extends React.Component
{
    //const [count, setCount] = useState(0);
render()
{
    return (
        
        <div className='UserGuess' style={style}>
            <input 
                disabled={!this.props.isThisTheCurrentRound} 
                style={{width:'85px',height:'30px', fontSize:'larger', padding:'initial'}} 
                type='text' 
                maxLength='20' 
                tabIndex={this.props.clueId + "0"} 
                onKeyUp={(event) => this.props.changeUserGuess(event.target.value, this.props.clueId, event.key)} 
                onBlur={(event) => this.props.changeUserGuess(event.target.value, this.props.clueId, '1')}
                onFocus={(event) => this.props.startTimer(this.props.clueId)}
            >
            </input>
            <div>{this.props.wordLookupFeedbackMessage}</div>
        </div>  
    )
    }
}
var style = {
    fontFamily: 'Arial',
    margin: '5px 5px 0px 0px',
    padding: '1px'
  }
export default UserGuess;
