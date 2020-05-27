import React, { Component } from 'react'

//import Slider from '../plugins/Slider'
import ChampsR from '../plugins/ChampsR'
import AllChamps from '../plugins/AllChamps'
import Footer from '../plugins/Footer'


class HomePage extends Component{
    render(){
        return(
            <div>
                {/* <header>
                    <Slider />
                </header> */}
                <ChampsR />
                <AllChamps />
                <Footer />
            </div>
        )
    }
}

export default HomePage