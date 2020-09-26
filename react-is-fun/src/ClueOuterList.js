import React, {useState, Component} from 'react';
import {render} from 'react-dom';
import ClueInner from './ClueInner';
import ClueOuter from './ClueOuter';

// readme: hoping to abandon this class

class ClueOuterList extends React.Component
{
    render(){
        //console.log(this.props.clues);
        let parsedClues = JSON.parse(this.props.clues);
        //console.log(parsedClues.table);
        let d = CreateOuters(parsedClues.table, this.props.userGuesses);
        return(
        <div className='ClueOuterList' style={style}>
            {/* here we print out all the contents of the d object */}
            {d.map(x => x)}
        </div>
        );
    }
}

function CreateOuters(clues, userGuesses)
{
    console.log(clues.length); 
    let rows = [];
    for(var i = 1; i < clues.length + 1; i++){
      //console.log('x' + clues.table);  
      rows.push(<ClueOuter roundNum={i} clue={clues[i-1]} key={i} userGuess={userGuesses[i-1]}/>);
    }
    return rows;
}

var style = {
    margin: 'auto',
    width: '90%',
    padding: '10px'
  }

export default ClueOuterList;   
