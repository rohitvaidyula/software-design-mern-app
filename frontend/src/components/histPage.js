import React from 'react';
import './histPage.css';
import { render } from 'react-dom';
import {Link, BrowserRouter, Route, Router} from 'react-router-dom';
import UserContext from "../context/UserContext";



class hist extends React.Component{
  constructor(props){
    super(props);
    this.state = {items: []};
  }
  componentDidMount(){
    const { UserData } = useContext(UserContext);
    //cID should be UserData.username or userID 
    fetch(`http://localhost:5000/FuelQuoteHistInfo?cID=${UserData.user}`)
      .then(res=>res.json())
      .then(data=>{
        this.setState({
          items: data
        })
      })
      // .then(res=>res.text())
      // .then(res=>this.setState({apiResponse: res}));
  }

  render(){
    
    return(
      <body>
      <header>
      <div className="pageButtons">
      <Link to='/ProfilePage'><button className="profilePage">Profile</button></Link>
      <Link to='/FuelQuotePage'><button className="fuelQuotePage">Fuel Quote Form</button></Link>
        
      </div>
    </header>

    <div className="labels">
      <label className="clientID">
        Client ID
      </label>
      <label className="date">
        Date
      </label>
      <label className="finalPrice">
        Final Price
      </label>
      <label className="quoteID">
        Quote ID
      </label>
    </div>

      <div className="labels">
        <label className="username">{this.state.items.map(item=><p>{item.username}</p>)}</label>
        <label className="date">{this.state.items.map(item=><p>{item.date}</p>)}</label>
        <label className="finalPrice">{this.state.items.map(item=><p>{item.finalPrice}</p>)}</label>
        <label className="quoteID">{this.state.items.map(item=><p>{item.quoteID}</p>)}</label>
      </div>
    
  </body>
    );
  }
}
//using username currently may want clientID
//<label className="clientID">{this.state.items.map(item=><p>{item.clientID}</p>)}</label>


export default hist;
