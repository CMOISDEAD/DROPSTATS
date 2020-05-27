import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import '../App.css'

import logo  from '../assets/mainIcon.png'
import icon  from '../assets/shield.png'
import PBE  from '../assets/working.png'


class Navbar extends Component{

    render(){
        return(
          <div id="sidebar" className=" active">
            <ul className="">
            <li>
              <Link to="/"><img src={logo} alt="#" className="rounded logo"/></Link>
            </li>
            <li><Link to="/summonerInfo"><img src={icon} alt="31" className="nav-bar-logo"></img></Link></li>
            <li><a href="logo"><img src={PBE} alt="31" className="nav-bar-logo"></img></a></li>
            <li><a href="logo"><img src={PBE} alt="31" className="nav-bar-logo"></img></a></li>
            </ul>
          </div>
      )
    }
}

export default Navbar