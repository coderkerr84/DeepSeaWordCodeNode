import React, {useState, Component} from 'react';
import Loader from 'react-loader-spinner'

export default class Spinner extends React.Component {
 //other logic
   render() {
    return(
     <Loader
        type="Puff"
        color="#00BFFF"
        height={100}
        width={100}
        timeout={0} //3 secs

     />
    );
   }
}