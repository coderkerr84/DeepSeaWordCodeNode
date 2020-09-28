import React, {useState, Component} from 'react';
import {render} from 'react-dom';

class UserName extends React.Component
{
    //const [count, setCount] = useState(0);
render()
{
    return (       
        <div className='UserName'>
            <label  style={style}>I, the willing diver, </label>
            <input type='text' tabIndex={"0"} onBlur={(event) => this.props.changeUserName(event.target.value)} placeholder=" ... your name ... "/>
            
            <label  style={style}>accept the risk in exploring the deep ocean.</label>
            <br/>
            <br/>
            Click anywhere to advance.
        </div>  
    )
    }
}
var style = {
    fontFamily: 'Phosphate,Futura,Rockwell',
    margin: '5px 5px 0px 5px',
    padding: '5px',
    fontSize: "larger"
  }
export default UserName;
