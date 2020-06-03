import React, { Component } from 'react'

import logo  from '../assets/DROPDEADS.png'
import icon1 from '../assets/github.png'
import icon2 from '../assets/twitter.png'

class Footer extends Component{
    render(){
        return(
            <footer className="bg-footer">
                <div className="inner-footer container row ">
                    <a href="..." alt="..." className="footer-logo col ">
                        <img src={logo} alt="..."/>
                    </a>
                    <p className="text-white col col-5">© 2020 DROPDEADS, Inc. All rights reserved.
                     DROPSTATS and DROPDEADS are trademarks, service marks,
                      and registered trademarks of DROPDEADS, Inc.</p>
                    <div className="col">
                        <a href="https://github.com/CMOISDEAD"><img src={icon1} alt="..." className="social-icon" /></a>
                        <a href="https://github.com/CMOISDEAD"><img src={icon2} alt="..." className="social-icon" /></a>
                    </div>
                </div>
            </footer>
        )
    }
}

export default Footer