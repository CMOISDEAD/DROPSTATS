import React, { Component } from 'react'

class ChampionPoints extends Component{

    constructor(){
        super()
        this.state = {
            key: '?api_key=RGAPI-8c910b1b-ef25-49b8-860c-5b4476f7ffc1',
            championsMastery: ''          
        }
    }

    

   render(){
       return(
            <div>
                <p>{this.state.championsMastery}</p>
            </div>
       )
   }

}

export default ChampionPoints