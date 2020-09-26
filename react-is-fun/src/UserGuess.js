import React, {useState, Component} from 'react';
import {render} from 'react-dom';

class UserGuess extends React.Component
{
    //const [count, setCount] = useState(0);
render()
{
    return (
        
        <div className='UserGuess' style={style}>
            <input style={{width:'100px',height:'30px', fontSize:'larger'}} type='text' tabIndex={this.props.clueId + "0"} onBlur={(event) => this.props.changeUserGuess(event.target.value, this.props.clueId)}>
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
