import React, { Component } from 'react'
import '../App.css'
import Footer from '../plugins/Footer'

import {ritokey}  from '../KEY/RIOTAPIKEY.json'


class Summoner extends Component{
    
    constructor(){
        super()
        this.state = { 
            key : ritokey,
            summonerid      :  ''   ,
            summonerName    :  ''   ,
            summonerLevel   :  ''   ,
            profileIconId   :  ''   ,
            img             :  ''   ,
            championsMastery1:  ''   ,
            championsMastery2:  ''   ,
            championsMastery3:  ''   ,
            faker           :  ''   ,
            matchList       :  ''   ,
            matchInfo       :  []
        }
        this.handlerSubmit = this.handlerSubmit.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.bringData = this.bringData.bind(this)
    }
    
    handleInputChange(e){
        const {value, name} = e.target;
        this.setState({
            [name]: value
        });
    }

    handlerSubmit(e){
        e.preventDefault()
        const apiKey= 'api_key='+ this.state.key
        const Summoner = this.state.faker
        fetch('https://la1.api.riotgames.com/lol/summoner/v4/summoners/by-name/'+ Summoner + '?' + apiKey )
        .then((response)=>{
            return response.json()
        })
        .then((myJson)=>{
            const data = myJson
            const cdnUrl = 'https://ddragon.leagueoflegends.com/cdn/10.6.1/img/profileicon/'
            const png  = '.png'
            this.setState({
                summonerid      :  data.id     ,
                summonerName    :  data.name   ,
                summonerLevel   :  data.summonerLevel   ,
                profileIconId   :  data.profileIconId   ,
                img             :  cdnUrl + data.profileIconId + png
            })
            //cHAMPSMASTERY DATOS
            fetch('https://la1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/' + data.id + '?' + apiKey)
            .then((response)=>{
                return response.json()
            })
            .then((response)=>{
                console.log(response)
                this.setState({
                  championsMastery1 : [
                    response[0].championId,
                    response[0].championLevel,
                    response[0].championPoints
                  ],
                  championsMastery2 :[
                    response[1].championId,
                    response[1].championLevel,
                    response[1].championPoints
                  ],
                  championsMastery3 :[
                    response[2].championId,
                    response[2].championLevel,
                    response[2].championPoints
                  ],
                })
            })
            .catch(console.log)
            //MATCHLIST DATOS
            fetch('https://la1.api.riotgames.com/lol/match/v4/matchlists/by-account/' + data.accountId + '?endIndex=1&' + apiKey)
            .then((response)=>{
                return response.json()
            })
            .then((response)=>{
                this.setState({
                    matchList : response
                })

            })
            .catch(err => console.log(err))
        })
        .catch(console.log)
    }

    bringData(gameId){
         const api ='?api_key='
         fetch('https://la1.api.riotgames.com/lol/match/v4/matches/' + gameId + api +this.state.key)
         .then((response)=>{
            return response.json()
         })
         .then((response)=>{
             let summonerInMatchInfo = (response)=>{
                 for (let i = 0; i < 10; i++) {
                     return(response.participants[i].participantId,
                         response.participants[i].teamId,
                         response.participants[i].championId,
                         response.participants[i].stats[i].item0,
                         response.participants[i].stats[i].item1,
                         response.participants[i].stats[i].item2,
                         response.participants[i].stats[i].item3,
                         response.participants[i].stats[i].item4,
                         response.participants[i].stats[i].item5,
                         response.participants[i].stats[i].item6) 
                 }
             }

             this.setState({
                 matchInfo : [
                     {//Info general de la partida
                    //  "gameDuration" : response.gameDuration,
                    //  "seasonId" : response.seasonId,
                    //  "gameMode" : response.gameMode,
                     //Info general de Equipo #1
                    //  "teamId" : response.teams[0].teamId,
                    //  "win" : response.teams[0].win,
                    //  "towerKills" : response.teams[0].towerKills,
                    //  "inhibitorKills" : response.teams[0].inhibitorKills,
                     //Info general de Equipo #2
                    //  "teamId2" : response.teams[1].teamId,
                    //  "win2" : response.teams[1].win,
                    //  "towerKills2" : response.teams[1].towerKills,
                    //  "inhibitorKills2"  : response.teams[1].inhibitorKills,
                     //Info de participantes
                     "participantsInfo" : summonerInMatchInfo}
                 ]
             })
         })
         .catch(err => console.error(err))
    }

    render(){

       let tableInfoToRender;

       if(this.state.matchList){
        // this.bringData(this.state.matchList.matches[0].gameId)
        tableInfoToRender = this.state.matchList.matches.map((list , i)=>{
            //Ejecuto una funcion para obtener los datos de las partidas

            return(
                <tr key={i}>
                    <th ><p>{list.champion}</p></th>
                    <td ><p>{list.timestamp}</p></td>
                    <td ><p>{list.queue}</p></td>
                    <td ><p>{list.lane}</p></td>
                </tr>
            )
        }) 
       }else{
        tableInfoToRender = 'Loading...'
       }


    

        return(
            <div>
                <form onSubmit={this.handlerSubmit} className="summoner-handler container">
                    <input
                        type="text"
                        name="faker"
                        className="input-summoner"
                        value = {this.state.faker}
                        onChange={this.handleInputChange}
                        placeholder="Summoner Name"
                    />
                    <button type="submit" className="btn btn-main">
                        Enviar
                    </button>
                </form>

                <div className="">
                    <div className="card container" >
                        <div className="summonerInfo">
                            <div className="summoner-img-box">
                                <img src={this.state.img} className="float-left summonerimg" alt={this.state.profileIconId}/>
                                <div className="summoner-lvl">
                                    <p className="lvl-text">{this.state.summonerLevel}</p>
                                </div>
                            </div>
                            <h5 className="summonerName p-3">{this.state.summonerName}</h5>
                        </div>
                        <div className="champsMateryPoints">
                            <div className="card-group">
                                <div className="card">
                                    <div className="container  row justify-content-center">

                                            <div className="mastery-points-card col">
                                                <img src="http://ddragon.leagueoflegends.com/cdn/10.7.1/img/champion/Swain.png" alt={this.state.championsMastery1[0]}/>
                                                <div className="mastery-level">
                                                    <span>Mastery level</span>
                                                    <p>{this.state.championsMastery1[1]}</p>
                                                </div>
                                                <div className="mastery-points">
                                                    <span>Mastery Points</span>
                                                    <p>{this.state.championsMastery1[2]}</p>
                                                </div>
                                            </div>

                                            <div className="mastery-points-card col">
                                                <img src="http://ddragon.leagueoflegends.com/cdn/10.7.1/img/champion/Swain.png" alt={this.state.championsMastery2[0]}/>
                                                <div className="mastery-level">
                                                    <span>Mastery level</span>
                                                    <p>{this.state.championsMastery2[1]}</p>
                                                </div>
                                                <div className="mastery-points">
                                                    <span>Mastery Points</span>
                                                    <p>{this.state.championsMastery2[2]}</p>
                                                </div>
                                            </div>

                                            <div className="mastery-points-card col">
                                                <img src="http://ddragon.leagueoflegends.com/cdn/10.7.1/img/champion/Swain.png" alt={this.state.championsMastery3[0]}/>
                                                <div className="mastery-level">
                                                    <span>Mastery level</span>
                                                    <p>{this.state.championsMastery3[1]}</p>
                                                </div>
                                                <div className="mastery-points">
                                                    <span>Mastery Points</span>
                                                    <p>{this.state.championsMastery3[2]}</p>
                                                </div>
                                            </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
                        <div className="card-body">
                            <div className="matchList">
                                
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th >Champion</th>
                                        <th >Time</th>
                                        <th >K/DA</th>
                                        <th >Build</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tableInfoToRender}
                                </tbody>

                            </table>

                            </div>
                        </div>
                    </div>
                    <Footer/>
                </div>
        )
    }
}

export default Summoner