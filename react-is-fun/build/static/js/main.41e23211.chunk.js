(this["webpackJsonpreact-is-fun"]=this["webpackJsonpreact-is-fun"]||[]).push([[0],{15:function(e,t,n){e.exports=n.p+"static/media/logo.5d5d9eef.svg"},18:function(e,t,n){e.exports=n(59)},23:function(e,t,n){},24:function(e,t,n){},25:function(e,t,n){},26:function(e,t,n){},27:function(e,t,n){},58:function(e,t,n){},59:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),s=n(6);n(23),n(15),n(24);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));n(8);var l=n(2),o=n(3),i=n(5),c=n(4),u=(n(25),n(7));n(26);var d=function(e){Object(i.a)(n,e);var t=Object(c.a)(n);function n(){return Object(l.a)(this,n),t.apply(this,arguments)}return Object(o.a)(n,[{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"UserGuess",style:p},r.a.createElement("input",{disabled:!this.props.isThisTheCurrentRound,style:{width:"100px",height:"30px",fontSize:"larger"},type:"text",maxLength:"20",tabIndex:this.props.clueId+"0",onBlur:function(t){return e.props.changeUserGuess(t.target.value,e.props.clueId)}}),r.a.createElement("div",null,this.props.wordLookupFeedbackMessage))}}]),n}(r.a.Component),p={fontFamily:"Arial",margin:"5px 5px 0px 0px",padding:"1px"},h=d;n(27);var m={info:{color:"green"},warning:{color:"orange",threshold:10},alert:{color:"red",threshold:5}},g=0,y=90,f=Array(7).fill(null),b=m.info.color,v=0,E=null;function k(e){f=Array(7).fill(null),C(e),f[e]=null,b=m.info.color,console.log("Timer started"+e),document.getElementById("TimerCircle"+e).innerHTML='<div class="base-timer"><svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">   <g class="base-timer__circle">    <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>    <path      id="base-timer-path-remaining'+e+'"      stroke-dasharray="283"       class="base-timer__path-remaining '+b+'"      d="        M 50, 50        m -45, 0        a 45,45 0 1,0 90,0        a 45,45 0 1,0 -90,0      "    ></path>  </g></svg><span id="base-timer-label'+e+'" class="base-timer__label">'+T(y)+"</span></div>",function(e){f[e]=setInterval((function(){document.getElementById("base-timer-label"+e)?(g=g+=1,y=90-g,document.getElementById("base-timer-label"+e).innerHTML=T(y),function(e){var t="".concat((283*function(){var e=y/90;return e-1/90*(1-e)}()).toFixed(0)," 283");document.getElementById("base-timer-path-remaining"+e).setAttribute("stroke-dasharray",t)}(e),function(e,t){var n=m.alert,a=m.warning,r=m.info;e<=n.threshold?(document.getElementById("base-timer-path-remaining"+t).classList.remove(a.color),document.getElementById("base-timer-path-remaining"+t).classList.add(n.color)):e<=a.threshold&&(document.getElementById("base-timer-path-remaining"+t).classList.remove(r.color),document.getElementById("base-timer-path-remaining"+t).classList.add(a.color))}(y,e),0===y&&(C(e),null!=E&&void 0!=E&&null!=e&&void 0!=e&&(E(e),e,x("bcoz timer expired on "+e)))):(x("bcoz didn't find a timer for "+e),C(e))}),1e3)}(e)}function x(e){console.log("ResetTimer "+e),g=0,y=90}function C(e){clearInterval(f[e])}function T(e){var t=Math.floor(e/60),n=e%60;return n<10&&(n="0".concat(n)),"".concat(t,":").concat(n)}var O=function(e){Object(i.a)(n,e);var t=Object(c.a)(n);function n(){return Object(l.a)(this,n),t.apply(this,arguments)}return Object(o.a)(n,[{key:"render",value:function(){var e;return null==this.props.initializeTimers[0]&&x("Init."),E=this.props.timerRanOut,1==this.props.initializeTimers[this.props.uniqueKey-1]&&(k(this.props.uniqueKey),this.props.initializeTimers[this.props.uniqueKey-1]=2),this.props.haltTimer&&C(this.props.uniqueKey),v<this.props.oxygenBottlesUsed&&this.props.currentRoundBeingPlayed==this.props.uniqueKey&&(e=11,console.log("timePassed"+g),g-=e,v++),r.a.createElement("div",{id:"TimerCircle"+this.props.uniqueKey,style:this.props.style})}},{key:"componentDidUpdate",value:function(){}}]),n}(r.a.Component),I=function(e){Object(i.a)(n,e);var t=Object(c.a)(n);function n(){return Object(l.a)(this,n),t.apply(this,arguments)}return Object(o.a)(n,[{key:"render",value:function(){var e=this,t=this.props.clue,n=t.roundId,a=(this.props.userGuess,this.props.currentRoundBeingPlayed>=n?"clueOuterInPlay clueOuter":"clueOuterNotInPlay clueOuter"),s=this.props.currentRoundBeingPlayed==n,l=s?"showBlock":"hideBlock",o=null!=this.props.roundTheyWereOnWhenTimerExpired,i=function(e,t,n){if(null!=e)return null!=t&&n==t?"":"none";return""}(this.props.initializeTimers[t.roundId-1],this.props.roundTheyWereOnWhenTimerExpired,t.roundId);return r.a.createElement("div",{className:a},r.a.createElement("div",{style:j},t.roundId),r.a.createElement("div",{style:W,name:"ClueOuterDiv"+t.roundId},r.a.createElement("div",{style:F},function(e,t,n,a){return r.a.createElement("div",{className:"ClueInner",style:B},r.a.createElement("label",{className:"ClueInnerLabel"},e.clueText),r.a.createElement(h,{isThisTheCurrentRound:a,changeUserGuess:t,clueId:e.roundId,wordLookupFeedbackMessage:n}))}(t,this.props.changeUserGuess,this.props.wordLookupFeedbackMessages[t.roundId-1],s)),r.a.createElement(O,{initializeTimers:this.props.initializeTimers,style:this.props.roundTheyWereOnWhenTimerExpired==t.roundId?N:F,uniqueKey:t.roundId,haltTimer:t.roundId<this.props.currentRoundBeingPlayed||this.props.resurfaceClicked,oxygenBottlesUsed:this.props.oxygenBottlesUsed,currentRoundBeingPlayed:this.props.currentRoundBeingPlayed,timerRanOut:this.props.timerRanOut}),r.a.createElement("div",{style:Object(u.a)(Object(u.a)({},F),{position:"relative"}),className:l},r.a.createElement("span",{style:Object(u.a)(Object(u.a)({},D),{display:i})},1!=t.roundId||o?"":"Click Diver To Start"),r.a.createElement("span",{style:Object(u.a)(Object(u.a)({},D),{display:i,color:"red",top:"0"})},o?"Submit and Dive to recover body":""),r.a.createElement("img",{src:"images/diver2.png",height:"70px",style:Object(u.a)(Object(u.a)({},o?S:w),{display:i,paddingBottom:"20px"}),onClick:function(n){return e.props.onDiverClick(t.roundId)}})),r.a.createElement("div",{style:P},r.a.createElement("div",{style:R},r.a.createElement("button",{disabled:!s,className:"button",style:{backgroundColor:"coral"},tabIndex:t.roundId+"1",onClick:function(n){return e.props.onClick(t.roundId)}},7==t.roundId?"Complete!":"Submit And Dive")),r.a.createElement("div",{style:R},r.a.createElement("button",{disabled:!s,className:"button",style:{backgroundColor:"antiquewhite"},onClick:function(n){return e.props.onClickResurface(t.roundId)}},"Resurface")),r.a.createElement("div",{style:R},r.a.createElement("button",{disabled:!s||5-this.props.oxygenBottlesUsed<1,className:"button",onClick:function(n){return e.props.onClickOxygen(t.roundId)}},"Refill O",r.a.createElement("sub",null,"2")," (+10s)"),r.a.createElement("span",{style:G},5-this.props.oxygenBottlesUsed+"+ bottles remain")))))}}]),n}(r.a.Component);var w={display:"block",margin:"auto",transform:"rotate(0deg)"},S={display:"block",margin:"auto",transform:"rotate(180deg)",filter:"grayscale(1)"},D={position:"absolute",left:"0",right:"0",bottom:"1%"},B={fontFamily:"Arial",margin:"10px",padding:"10px",textAlignLast:"center"},j={backgroundColor:"steelblue",color:"white",fontFamily:"Arial",left:"10px",width:"20px",textAlign:"center"},W={display:"inline-block",width:"100%"},R={padding:"5px"},P={float:"right",width:"33%",textAlign:"center"},F={float:"left",width:"33%"},G={display:"block"},N={display:"none"},A=I,M=n(16),L=n.n(M),U=function(e){Object(i.a)(n,e);var t=Object(c.a)(n);function n(){return Object(l.a)(this,n),t.apply(this,arguments)}return Object(o.a)(n,[{key:"render",value:function(){return r.a.createElement(L.a,{type:"ThreeDots",color:"#00BFFF",height:100,width:100,timeout:0})}}]),n}(r.a.Component),z=function(e){Object(i.a)(n,e);var t=Object(c.a)(n);function n(){return Object(l.a)(this,n),t.apply(this,arguments)}return Object(o.a)(n,[{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"UserName"},r.a.createElement("label",{style:_},"I hereby declare that I, "),r.a.createElement("input",{maxLength:"20",type:"text",tabIndex:"0",onBlur:function(t){return e.props.changeUserName(t.target.value)},placeholder:" ... your name ... "}),r.a.createElement("label",{style:_},"accept the risk in exploring the Deep Sea."),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement("a",{href:"#",style:{color:"aliceblue"}},"Then click anywhere to advance."))}}]),n}(r.a.Component),_={fontFamily:"Phosphate,Futura,Rockwell,Impact",margin:"5px 5px 0px 5px",padding:"5px",fontSize:"larger"},q=z,K=n(9),$=n.n(K),H=(n(58),n(17)),J=function(e){Object(i.a)(n,e);var t=Object(c.a)(n);function n(){var e;return Object(l.a)(this,n),(e=t.call(this)).state={},e}return Object(o.a)(n,[{key:"render",value:function(){if(console.log("ResultsModal"+this.props.showModal),0==this.props.showModal)return"";if(null==this.props.scoreData)return r.a.createElement($.a,{isOpen:this.props.showModal,contentLabel:"Minimal Modal Example",appElement:document.getElementById("root")},r.a.createElement("div",{style:ae},r.a.createElement(U,null)));if(this.props.isDead)return r.a.createElement($.a,{isOpen:this.props.showModal,contentLabel:"Minimal Modal Example",appElement:document.getElementById("root"),style:{content:{color:"red",backgroundImage:"url(/images/Wife.png)",backgroundSize:"cover",backgroundPosition:"center",overflow:"scroll",filter:"drop-shadow(1px 2px 4px darkblue)"}}},r.a.createElement("span",{className:"DeadSpan"},"Not all treasure hunters return home with loot...",r.a.createElement("button",{onClick:this.props.handleReplay,className:"button",value:"Replay"},"Dive Again!")));for(var e,t=[],n=0;n<7;n++){var a=this.props.scoreData.clueScores[n];t.push(r.a.createElement("tr",null,r.a.createElement("td",null,this.props.userGuesses[n]),r.a.createElement("td",null,a.scorePerClue[0]>0?s():l(n,0)),r.a.createElement("td",null,a.scorePerClue[1]>0?s():l(n,1)),r.a.createElement("td",null,a.scorePerClue[2]>0?s():l(n,2)),r.a.createElement("td",null,a.scorePerClue[3]>0?s():l(n,3)),r.a.createElement("td",null,a.scorePerClue[4]>0?s():l(n,4)),r.a.createElement("td",null,a.scorePerClue[5]>0?s():l(n,5)),r.a.createElement("td",null,"N/A")))}return r.a.createElement("div",null,r.a.createElement($.a,{isOpen:this.props.showModal,contentLabel:"Minimal Modal Example",appElement:document.getElementById("root"),style:{content:{color:"darkblue",backgroundColor:"aliceblue",overflow:"scroll",filter:"drop-shadow(1px 2px 4px darkblue)"}}},null!=this.props.scoreData.isPerfectDive&&1==this.props.scoreData.isPerfectDive?r.a.createElement("div",{style:Q},r.a.createElement("span",{style:ne},"Congratulations "),r.a.createElement("span",{style:ee},"It's "),r.a.createElement("span",{style:te},"A "),r.a.createElement("span",{style:Z},"*PERFECT* "),r.a.createElement("span",{style:X},"Dive! ")):"",r.a.createElement("br",null),"You ",null!=this.props.scoreData.foundTreasure&&1==this.props.scoreData.foundTreasure?"succesfully found ":"were searching for "," : ",r.a.createElement("span",{style:V},this.props.scoreData.wordBeingSought),r.a.createElement("br",null),"You consumed oxygen bottles : ",r.a.createElement("span",{style:V},this.props.oxygenBottlesUsed),r.a.createElement("br",null),"Total Score: ",r.a.createElement("span",{style:V},"$",this.props.scoreData.totalScore,"m"),r.a.createElement("br",null),"Top Three Scores for ","'"+this.props.scoreData.wordBeingSought+"'"," :",(e=this.props.scoreData.topThreeScores,console.log("DisplayTopThree: "+e[0].playerName),r.a.createElement("ol",null,r.a.createElement("li",null,null!=e[0]&&void 0!=e[0]?e[0].playerName:"...no-one yet!",r.a.createElement("span",{style:V},null!=e[0]&&void 0!=e[0]?"- $"+e[0].totalPoints+"m":"")),r.a.createElement("li",null,null!=e[1]&&void 0!=e[1]?e[1].playerName:"...no-one yet!",r.a.createElement("span",{style:V},null!=e[1]&&void 0!=e[1]?"- $"+e[1].totalPoints+"m":"")),r.a.createElement("li",null,null!=e[2]&&void 0!=e[2]?e[2].playerName:"...no-one yet!",r.a.createElement("span",{style:V},null!=e[2]&&void 0!=e[2]?"- $"+e[2].totalPoints+"m":"")))),"How you did against all the clues :",r.a.createElement("br",null),r.a.createElement("span",{style:Y}," (hover over e.g 'Clue 2' to be reminded of that clue)"),r.a.createElement("table",null,r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",null),r.a.createElement("th",{"data-tip":"'"+this.props.clues[0].clueText+"'"},"Clue 1"),r.a.createElement("th",{"data-tip":"'"+this.props.clues[1].clueText+"'"},"Clue 2"),r.a.createElement("th",{"data-tip":"'"+this.props.clues[2].clueText+"'"},"Clue 3"),r.a.createElement("th",{"data-tip":"'"+this.props.clues[3].clueText+"'"},"Clue 4"),r.a.createElement("th",{"data-tip":"'"+this.props.clues[4].clueText+"'"},"Clue 5"),r.a.createElement("th",{"data-tip":"'"+this.props.clues[5].clueText+"'"},"Clue 6"),r.a.createElement("th",{"data-tip":"'"+this.props.clues[6].clueText+"'"},"Clue 7"))),r.a.createElement("tbody",null,t)),r.a.createElement("br",null),r.a.createElement("button",{onClick:this.props.handleReplay,className:"button",value:"Replay"},"Dive Again!"),r.a.createElement(H.a,null)));function s(){return r.a.createElement("img",{src:"/images/Coin.png",width:"25px",height:"25px"})}function l(e,t){return console.log("aI: "+e+" cI:"+t),parseInt(t)<=parseInt(e)?r.a.createElement("img",{src:"/images/Skull.jpg",width:"25px",height:"25px"}):(console.log("display N/A for aI: "+e+" cI:"+t),"N/A")}}}]),n}(r.a.Component),Y={fontSize:"smaller"},Q={fontSize:"larger"},V={color:"coral",fontFamily:"Arial",fontSize:"larger",textAlign:"left"},X={color:"red"},Z={color:"violet"},ee={color:"green"},te={color:"orange"},ne={color:"blue"},ae={margin:"0 auto"},re=J,se=function(e){Object(i.a)(n,e);var t=Object(c.a)(n);function n(e){var a;return Object(l.a)(this,n),(a=t.call(this,e)).addressOfService="deepseaword.com",a.SendToScoringService=function(){a.setState({scoreLoading:!0});var e=Array(7).fill(null);e=a.state.clues.clues.map((function(e){return e.significantClueInfo}));var t=new FormData;t.append("GUID",a.state.clues.guid),t.append("userName",a.state.userName),t.append("userGuesses[0]",a.state.userGuesses[0]),t.append("userGuesses[1]",a.state.userGuesses[1]),t.append("userGuesses[2]",a.state.userGuesses[2]),t.append("userGuesses[3]",a.state.userGuesses[3]),t.append("userGuesses[4]",a.state.userGuesses[4]),t.append("userGuesses[5]",a.state.userGuesses[5]),t.append("userGuesses[6]",a.state.userGuesses[6]),t.append("clueInfo[0]",e[0]),t.append("clueInfo[1]",e[1]),t.append("clueInfo[2]",e[2]),t.append("clueInfo[3]",e[3]),t.append("clueInfo[4]",e[4]),t.append("clueInfo[5]",e[5]),t.append("clueInfo[6]",e[6]),t.append("oxygenUsed",a.state.oxygenBottlesUsed),t.append("isDead",null!=a.state.roundTheyWereOnWhenTimerExpired),fetch("http://"+a.addressOfService+"/Entries/SubmitForScoring/",{method:"POST",body:t}).then((function(e){return e.json()})).then((function(e){a.setState({scoreLoading:!1,scoreData:e})}))},a.handleReplay=function(){a.componentDidMount()},a.handleResurfaceClick=function(e){a.setState({resurfaceClicked:!0}),a.setState({showModal:!0}),a.SendToScoringService()},a.handleSubmitAndDiveClick=function(e){null==a.state.initializeTimers[0]?alert("Please click the diver image to start the timer \n  "):null!=a.state.roundTheyWereOnWhenTimerExpired?(a.setState({showModal:!0}),a.SendToScoringService()):a.checkWord(e,a.state.userGuesses[e-1])},a.handleDiverClick=function(e){var t=a.state.initializeTimers.slice();t[e-1]=1,a.setState({initializeTimers:t})},a.handleOxygenClick=function(e){var t=a.state.oxygenBottlesUsed+1;a.setState({oxygenBottlesUsed:t})},a.handleChangeUserGuess=function(e,t){var n=a.state.userGuesses.slice();n[t-1]=e,a.setState({userGuesses:n})},a.handleEnterUserName=function(e){a.setState({userName:e})},a.handleTimerRanOut=function(e){a.setState({roundTheyWereOnWhenTimerExpired:e})},a.state={userGuesses:Array(7).fill(null),currentRound:1,oxygenBottlesUsed:0,initializeTimers:Array(7).fill(null),clues:null,roundTheyWereOnWhenTimerExpired:null,isLoadingPage:!0,wordLookupFeedbackMessages:Array(7).fill(null),userName:"",showModal:!1,dictionaryCheckInProgress:!1,scoreData:null,scoreLoading:!1,resurfaceClicked:!1},a}return Object(o.a)(n,[{key:"updateWordFeedback",value:function(e,t){var n=this.state.wordLookupFeedbackMessages.slice();n[e-1]=t,this.setState({wordLookupFeedbackMessages:n})}},{key:"checkWord",value:function(e,t){var n=this;return console.log(e+" checkWord : "+t),this.updateWordFeedback(e,"Checking dictionary..."),""==t||null==t?(this.updateWordFeedback(e,"Enter word then Submit and Dive"),!1):this.state.dictionaryCheckInProgress?(this.updateWordFeedback(e,"Double-clickers will be left behind!"),!1):(this.setState({dictionaryCheckInProgress:!0}),void fetch("http://"+this.addressOfService+"/Entries/LookupWord?word="+t).then((function(e){return e.json()})).then((function(t){null!=t?(n.updateWordFeedback(e,"Found in dictionary."),n.setState({currentRound:e+1}),e<7?n.handleDiverClick(e+1):(n.setState({showModal:!0}),n.SendToScoringService())):n.updateWordFeedback(e,"NOT found - try another!"),n.setState({dictionaryCheckInProgress:!1})})).catch((function(){n.updateWordFeedback(e,"Apparatus failure. Try again")})))}},{key:"componentDidMount",value:function(){var e=this;this.setState({userGuesses:Array(7).fill(null),currentRound:1,oxygenBottlesUsed:0,initializeTimers:Array(7).fill(null),clues:null,roundTheyWereOnWhenTimerExpired:null,isLoadingPage:!0,wordLookupFeedbackMessages:Array(7).fill(null),showModal:!1,dictionaryCheckInProgress:!1,scoreData:null,scoreLoading:!1,resurfaceClicked:!1}),fetch("http://"+this.addressOfService+"/Entries/GetWordWithClues").then((function(e){return e.json()})).then((function(t){e.setState({clues:t,isLoadingPage:!1})})).catch(console.log)}},{key:"render",value:function(){var e=this.state.clues;return r.a.createElement("div",{className:"background center-screen"},r.a.createElement("div",{className:"TitleBar",style:ce},"DeepSeaWord"),r.a.createElement("div",{style:ie},"by Chris Kerr"),r.a.createElement("div",{className:"GameBoard",style:le},"In every round submit a word that meets that clue and all previous clues. ",r.a.createElement("br",null),"Dont run out of oxygen! If the timer expires so do you! ",r.a.createElement("br",null),"High scores require: speed, valid words, limited oxygen refills and finding that treasure!",this.state.isLoadingPage||""==this.state.userName?r.a.createElement("div",null,r.a.createElement(U,null),r.a.createElement(q,{changeUserName:this.handleEnterUserName})):this.renderClues(e),this.renderScore()))}},{key:"renderScore",value:function(){return console.log("renderScore(scoreData)"),null==this.state.clues?null:r.a.createElement(re,{isDead:null!=this.state.roundTheyWereOnWhenTimerExpired,clues:this.state.clues.clues,scoreData:this.state.scoreData,userGuesses:this.state.userGuesses,oxygenBottlesUsed:this.state.oxygenBottlesUsed,showModal:this.state.showModal,handleReplay:this.handleReplay})}},{key:"renderClues",value:function(e){var t=[];if(null!=e)for(var n=1;n<e.clues.length+1;n++)t.push(this.renderClue(n,e.clues[n-1]));return t}},{key:"renderClue",value:function(e,t){return r.a.createElement(A,{style:oe,clue:t,key:e,userGuess:this.state.userGuesses[e-1],onClick:this.handleSubmitAndDiveClick,onClickResurface:this.handleResurfaceClick,onClickOxygen:this.handleOxygenClick,changeUserGuess:this.handleChangeUserGuess,currentRoundBeingPlayed:this.state.currentRound,initializeTimers:this.state.initializeTimers,onDiverClick:this.handleDiverClick,oxygenBottlesUsed:this.state.oxygenBottlesUsed,timerRanOut:this.handleTimerRanOut,roundTheyWereOnWhenTimerExpired:this.state.roundTheyWereOnWhenTimerExpired,wordLookupFeedbackMessages:this.state.wordLookupFeedbackMessages,resurfaceClicked:this.state.resurfaceClicked})}}]),n}(r.a.Component),le={color:"white",fontFamily:"Arial",fontSize:"13px",padding:"20px",textAlign:"center"},oe={backgroundColor:"lightblue",color:"darkblue",fontFamily:"Arial",fontSize:"12px",padding:"20px",textAlign:"left"},ie={color:"gold",fontFamily:"Cochin",fontSize:"11px",textAlign:"Center",top:"0px"},ce={color:"yellow",fontFamily:"Phosphate,Futura,Rockwell",fontSize:"45px",textAlign:"Center",top:"0px"},ue=se;Object(s.render)(r.a.createElement(ue,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[18,1,2]]]);
//# sourceMappingURL=main.41e23211.chunk.js.map