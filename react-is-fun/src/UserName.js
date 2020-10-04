import React, {useState, Component} from 'react';
import {render} from 'react-dom';

class UserName extends React.Component
{
    //const [count, setCount] = useState(0);
render()
{
    return (       
        <div className='UserName'>
            <label  style={style}>I hereby declare that I, </label>
            <input maxLength="20" type='text' tabIndex={"0"} onBlur={(event) => this.props.changeUserName(event.target.value)} placeholder=" ... your name ... "/>
            <label  style={style}>accept the risk in exploring the Deep Sea.</label>
            <br/>
            <br/>
            <a href="#" style={{color:"aliceblue"}} >Then click anywhere to advance.</a>
        </div>  
    )
    }
}
var style = {
    fontFamily: 'Phosphate,Futura,Rockwell,Impact',
    margin: '5px 5px 0px 5px',
    padding: '5px',
    fontSize: "larger"
  }
export default UserName;
