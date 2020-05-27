import React, { Component } from 'react'
import '../App.css'

import data from '../champlist.json'
import {ritokey}  from '../KEY/RIOTAPIKEY.json'

class  champsR  extends Component{
    
    constructor(){
        super()
        this.state = {
            "key": ritokey ,
            "freeChampionIds": [],
            "freeChampionsNames": [],
            "realCNames"     :      [],
            "champsJson"     : [],
            "img"            : []
        }
    }

    componentDidMount(e){
        const api =  this.state.key
        const apiKey= '?api_key='+ api
        fetch('https://la1.api.riotgames.com/lol/platform/v3/champion-rotations' + apiKey )
        .then((response)=>{
            return response.json()
        })
        .then((myJson)=>{
            const data = myJson
            this.setState({
                "freeChampionIds": data.freeChampionIds
            })
        })
        .catch(console.log)

// Peticion De Datos Del Champ.
         fetch('http://ddragon.leagueoflegends.com/cdn/10.7.1/data/en_US/champion.json')
         .then((response)=>{
             return response.json()
         })
         .then((response)=>{
            //console.log(response)
            const myvar = response.data
            const Namess = []
            for (var key in myvar) {
                Namess.push(myvar[key])             
                //const found = Namess.find(key => key === 22);
    
                console.log(Namess); 
            }
   

            // this.setState({
            //     freeChampionsNames : Namess
            // })
            //console.log(Namess)
         })
         .catch(console.log)
        



            
    }

        
    render() {

            var waiting = this.state.freeChampionIds.map((freeChampionIds,i) => {                  
            return(
                <img src={`${this.state.realCNames[i]}`} alt={freeChampionIds} className="p-3" key={i}/>
            )
            })

        return(
            <div className="row">
                <div className="col">
                    <h3 className="text-center main-color">Champion Rotation</h3>
                    {waiting}
                </div>
            </div>
        )
    }
}

export default champsR