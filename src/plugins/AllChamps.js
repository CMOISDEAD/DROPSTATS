import React, { Component } from 'react'
import '@babel/polyfill'
import '../App.css'

import champions from 'lol-champions'
//import data from '../todos.json'    


class AllChamps extends Component{
    
    constructor(){
        super()
        this.state = {
            champs : '',
            cdnURL : 'http://ddragon.leagueoflegends.com/cdn/',
            lolCurrentV : '10.7.1',
            squareImg: 'http://ddragon.leagueoflegends.com/cdn/10.7.1/img/champion/'
        }
        
    }

    componentDidMount(){
        //console.log(champions)        
    }


    
    render(){
            var champsToShow = champions.map((champions,i) => {
                return(
                        <a href={'champions/'+champions.id} alt={champions.name} key={i} className="bg-main m-2 square-champ">
                            <div className="div-imagen">
                                <div>
                                   <p className="text-white">
                                       MID
                                   </p>
                                </div>
                                <img src={champions.icon.replace('8.11.1', this.state.lolCurrentV)} alt={champions.name} className="m-3 p-0 vanish" key={i}/> 
                            </div>
                            <p key={i} className=" text-center champ-text">{champions.name}</p>                                         
                        </a>
                )
              })

        return(
            <div className="col-md">
                <div className="row">
                    {champsToShow}
                </div>
            </div>
        )

    }
}

export default AllChamps

