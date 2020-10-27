import React, {useState, Component} from 'react';
import {render} from 'react-dom';

class UserName extends React.Component
{
    //const [count, setCount] = useState(0);
render()
{

    if(this.props.userName != null && this.props.userName != "")
    {
        return (
            <div className='UserName'>
                <label style={style}>Catch your breath <span style={userStyle}>{this.props.userName}</span> and then we'll go again!</label>
            </div>  
        );
    }

    return (       
        <div className='UserName'>
            <label  style={style}>I hereby declare that I, </label>
            <input maxLength="20" type='text' tabIndex={"0"} onKeyUp={(event) => this.props.changeUserName(event.target.value, event.key)} onBlur={(event) => this.props.changeUserName(event.target.value, "Enter")} placeholder=" ... your name ... "/>
            <label  style={style}>accept the risks in exploring the Deep Sea.</label>
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
  var userStyle = {
    color: "yellow",
    fontSize: "largest"
  }
export default UserName;
