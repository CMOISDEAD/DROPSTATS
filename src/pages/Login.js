import React, { Component } from 'react'
import {BrowserRouter as Router, Route ,Link} from 'react-router-dom'
import '../css/Login.css'

import logoIcon from '../assets/loginIcon.png'

import App from '../App'
import Summoner from './Summoner'
//import champsR from '../plugins/ChampsR'

class Login extends Component {
    
    constructor(){
        super()
        this.state={
            summonerName : ''
        }
        this.handlerSubmit =  this.handlerSubmit.bind(this)
    }

    handlerSubmit(e){
        const {value} = e.target;
        this.setState({
            summonerName : value
        })
        console.log(this.state.summonerName)
    }
    
    render(){
        return(
            <div className="">
                <div className="sideBar">
                    <div className="container">
                        <div className="row justify-content-around container">
                            <div className="col-sm">
                                <a href="loquesea"><img src={logoIcon} alt="31" className="logoIcon"/></a>
                            </div>
                            
                        </div>
                        <div className="p-2 mt-99">
                            <div className="row">
                                <span className="col-sm h1 titles p-3">sign in</span>
                            </div>
                            <div className="row container">
                                <input type="text" className="col-sm rounded p-3 inputs" placeholder="SummonerName" name="summonerName" onChange={this.handlerSubmit} />
                            </div>
                            <div className="row container mt-3">
                                <p>
                                    <input type="checkbox" className="checkBoxs" id="staySigned"/>
                                    <label htmlFor="staySigned"><span className="textParafase">stay signed in</span></label>
                                </p>
                            </div>
                            <div className="row container">
                                <Router>
                                <button className="buttonLogIn p-4" onClick={console.log(this.state.summonerName)}>
                                    <Link to="/" >Ir</Link>
                                    <Route exact path="/summonerInfo"  component={Summoner} />
                                    <Route exact path="/"  component={App} />
                                    <Route exact path="/login" component={Login} />    
                                </button>  
                                </Router>                     
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login