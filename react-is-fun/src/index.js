import React, {Component} from 'react';
import {render} from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Chris from './Chris';
import GameBoard from './GameBoard';

let bookList = [
  {"title" : "the sun also rises", "author" : "Orson Welles", "pages": 222},
  {"title" : "Harry Potter", "author" : "JK Rowling", "pages": 333} 
]

const Book = ({title, author, pages, freeBookmark}) => {
  return(
    <section>
      <h2>{title}</h2>
      <p>by: {author}</p>
      <p>Pages: {pages} pages</p>
      <p>Free Bookmark Today {freeBookmark ? 'yes!' : 'no!'}</p>
    </section>
  )
}

 class Library extends React.Component{
   state = {  
     open: true,
     freeBookmark: true 
    }

   toggleOpenClosed = () => {
      this.setState( prevState => ({
        open: !prevState.open
      }))
  }         
  render() {
     const { books } = this.props
    return (
    <div>
      <h1>The library is {this.state.open ? 'open' : 'closed'}</h1>
      <button onClick={this.toggleOpenClosed}>Change</button>
      {books.map(
          (book, i) => 
            <Book 
              key={i}
              title={book.title} 
              author={book.author} 
              pages={book.pages}
              freeBookmark={this.state.freeBookmark}/>
    )}
    </div>
  )
  }
}


const title = React.createElement(
  'h1',
  {id: 'title', className: 'header'},
  'Hello Chris'
);

let skiData = {
  total: 50,
  powder: 20,
  backCountry: 10,
  goal: 100
}

const getPercent = decimal => {
  return decimal * 100 + '%'
}
const calcGoalProgress = (total, goal) => {
  return getPercent(total/goal)
}

class Message extends Component{
  render(){
    console.log(this.props)
    return (
      <div>
        <h1 style={{color: this.props.color}}>
    {this.props.msg}
        </h1>
        <p>
          I'll check back in {this.props.minutes} minutes
        </p>
      </div>
    )
  }
}

const SkiDayCounter = ({total,powder,backCountry, goal}) => {
    return (
      <section>
        <div>
          <p>
            Total Days : {total}
          </p>
        </div>
        <div>
          <p>
            Powder Days : {powder}
          </p>
        </div>
        <div>
          <p>
            BackCountry Days : {backCountry}
          </p>
        </div>
        <div>
          <p>
            Goal Progress : {calcGoalProgress(total,goal)}
          </p>
        </div>
      </section>
    )
}

var style = {
  backgroundColor: 'orange',
  color: 'white',
  fontFamily: 'Arial'
}

// ReactDOM.render(
//   <Message color="blue" minutes={50} msg="how are you?"/>,
//   document.getElementById('root')
// );


// render(
//   <SkiDayCounter 
//   total={skiData.total}
//   powder = {skiData.powder}
//   backCountry = {skiData.backCountry}
//   goal = {skiData.goal}
//   />,
//   document.getElementById('root')
// );

// render(
//   <Library books={bookList}/>,
//   document.getElementById('root')  
// )

render(
  <GameBoard/>,
  document.getElementById('root') 
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
