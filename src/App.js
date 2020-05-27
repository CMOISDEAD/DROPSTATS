import React, { Component } from 'react'
//import axios from 'axios'
import './App.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'

//import Login from './pages/Login'
import Navbar from './plugins/Navbar'
import Summoner from './pages/Summoner'
import HomePage from './pages/HomePage'



class App extends Component{
  render(){
    return(

      <Router>
      <div>
        <Navbar/>
          <div className="article">
            <Route exact path="/summonerInfo"  component={Summoner} />
            <Route exact path="/"  component={HomePage} />
            {/* <Route exact path="/login" component={Login} /> */}
          </div>         
        </div>
      </Router>
    )
  }
}

export default App;
