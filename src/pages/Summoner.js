import React, { Component } from "react";
import "../App.css";
import Footer from "../plugins/Footer";

import logo from '../assets/DROPDEADS.png'

// ranked_emblems
import UNRANKED from '../assets/base-icons/provisional.png'
import IRON from '../assets/ranked-emblems/Emblem_Bronze.png'
import BRONZE from '../assets/ranked-emblems/Emblem_Bronze.png'
import SILVER from '../assets/ranked-emblems/Emblem_Silver.png'
import GOLD from '../assets/ranked-emblems/Emblem_Gold.png'
import PLATINUM from '../assets/ranked-emblems/Emblem_Platinum.png'
import DIAMOND from '../assets/ranked-emblems/Emblem_Diamond.png'
import MASTER from '../assets/ranked-emblems/Emblem_Master.png'
import GRANDMASTER from '../assets/ranked-emblems/Emblem_Grandmaster.png'
import CHALLENGER from '../assets/ranked-emblems/Emblem_Challenger.png'

// mastery assets
import m4 from '../assets/mastery-emotes/m4.png'
import m5 from '../assets/mastery-emotes/m5.png'
import m6 from '../assets/mastery-emotes/m6.png'
import m7 from '../assets/mastery-emotes/m7.png'



import { ritokey } from "../KEY/RIOTAPIKEY.json";
import { data } from "../champlist.json";

class Summoner extends Component {
  constructor() {
    super();
    this.state = {
      key: ritokey,
      summonerid: "",
      summonerName: "",
      summonerLevel: "",
      profileIconId: "",
      img: "",
      ranked:"",
      rankedFlex : "",
      championsMastery1: "",
      championsMastery2: "",
      championsMastery3: "",
      faker: "",
      matchList: "",
      matchInfo: [],
    };
    this.handlerSubmit = this.handlerSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(e) {
    const { value, name } = e.target;
    this.setState({
      [name]: value,
    });
  }

  handlerSubmit(e) {
    e.preventDefault();
    const apiKey = "api_key=" + this.state.key;
    const Summoner = this.state.faker;
    fetch(
      "https://la1.api.riotgames.com/lol/summoner/v4/summoners/by-name/" +
        Summoner +
        "?" +
        apiKey
    )
      .then((response) => {
        return response.json();
      })
      .then((myJson) => {
        const data = myJson;
        const cdnUrl =
          "https://ddragon.leagueoflegends.com/cdn/10.6.1/img/profileicon/";
        const png = ".png";
        this.setState({
          summonerid: data.id,
          summonerName: data.name,
          summonerLevel: data.summonerLevel,
          profileIconId: data.profileIconId,
          img: cdnUrl + data.profileIconId + png,
        });
        //cHAMPSMASTERY DATOS
        fetch(
          "https://la1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/" +
            data.id +
            "?" +
            apiKey
        )
          .then((response) => {
            return response.json();
          })
          .then((response) => {
            this.setState({
              championsMastery1: [
                response[0].championId,
                response[0].championLevel,
                response[0].championPoints,
              ],
              championsMastery2: [
                response[1].championId,
                response[1].championLevel,
                response[1].championPoints,
              ],
              championsMastery3: [
                response[2].championId,
                response[2].championLevel,
                response[2].championPoints,
              ],
            });
          })
          .catch(console.log);
        fetch(`https://la1.api.riotgames.com/lol/league/v4/entries/by-summoner/${data.id}?${apiKey}`)
        .then((response)=>{
          return response.json()
        })
        .then((response)=>{
          this.setState({
            ranked : response,
          })
        })
        .catch(err=>console.log(err))
        //MATCHLIST DATOS
        fetch(
          "https://la1.api.riotgames.com/lol/match/v4/matchlists/by-account/" +
            data.accountId +
            "?endIndex=8&" +
            apiKey
        )
          .then((response) => {
            return response.json();
          })
          .then((response) => {
            this.setState({
              matchList: response,
            });
          })
          .catch((err) => console.log(err));
      })
      .catch(console.log);
  }

  render() {
    let tableInfoToRender;

    if (this.state.matchList) {
      tableInfoToRender = this.state.matchList.matches.map((list, i) => {
        //Ejecuto una funcion para obtener los datos de las partidas
        //const api = "?api_key=";
        // fetch(
        //   "https://la1.api.riotgames.com/lol/match/v4/matches/" +
        //   this.state.matchList.matches[i].gameId +
        //     api +
        //     this.state.key
        // )
        //   .then((response) => {
        //     return response.json();
        //   })
        //   .then((response) => {
        //     console.log(`este es ${i} intento :${response}`)
        //   })
        //   .catch((err) => console.log(err));
        return (
          <tr key={i}>
            <th>
              <a href={"champions/" + data[list.champion].ChampName} alt="...">
                <img
                  src={`http://ddragon.leagueoflegends.com/cdn/10.11.1/img/champion/${
                    data[list.champion].ChampName
                  }.png`}
                  alt={list.champion}
                />
              </a>
            </th>
            <td>
              <p>{list.timestamp}</p>
            </td>
            <td>
              <p>{list.queue}</p>
            </td>
            <td>
              <p>{list.lane}</p>
            </td>
          </tr>
        );
      });
    } else {
      tableInfoToRender = "Loading...";
    }

    let mainChamps;

    if (
      this.state.championsMastery1 &&
      this.state.championsMastery2 &&
      this.state.championsMastery3
    ) {
      let masteryEmote ;
      let masteryEmote2 ;
      let masteryEmote3 ;


      if(this.state.championsMastery1[1] === 7){
        masteryEmote = m7
      }else if(this.state.championsMastery1[1] === 6){
        masteryEmote = m6
      }else if(this.state.championsMastery1[1] === 5){
        masteryEmote = m5
      }else{
        masteryEmote = m4
      }

      if(this.state.championsMastery2[1] === 7){
        masteryEmote2 = m7
      }else if(this.state.championsMastery2[1] === 6){
        masteryEmote2 = m6
      }else if(this.state.championsMastery2[1] === 5){
        masteryEmote2 = m5
      }else{
        masteryEmote2 = m4

      }if(this.state.championsMastery3[1] === 7){
        masteryEmote3 = m7
      }else if(this.state.championsMastery3[1] === 6){
        masteryEmote3 = m6
      }else if(this.state.championsMastery3[1] === 5){
        masteryEmote3 = m5
      }else{
        masteryEmote3 = m4
      }


      mainChamps = (
        <div className="container  row justify-content-center">
          <div className="mastery-points-card col">
            <img
              src={`http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${
                data[this.state.championsMastery1[0]].ChampName
              }_0.jpg`}
              alt={this.state.championsMastery1[0]}
            />
            <div className="another-shit row">
              <div className="mastery-level col">
                <img src={masteryEmote} alt="..." className="mastery-emote1"/>
              </div>
              <div className="mastery-points col">
                <p>{this.state.championsMastery1[2]}</p>
              </div>
            </div>
          </div>

          <div className="mastery-points-card col">
            <img
              src={`http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${
                data[this.state.championsMastery2[0]].ChampName
              }_0.jpg`}
              alt={this.state.championsMastery1[0]}
            />
            <div className="another-shit row">
              <div className="mastery-level col">
                <img src={masteryEmote2} alt="..." className="mastery-emote2"/>
              </div>
              <div className="mastery-points col">
                <p>{this.state.championsMastery2[2]}</p>
              </div>
            </div>
          </div>

          <div className="mastery-points-card col">
            <img
              src={`http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${
                data[this.state.championsMastery3[0]].ChampName
              }_0.jpg`}
              alt={this.state.championsMastery3[0]}
            />
            <div className="another-shit row">
              <div className="mastery-level col">
                <img src={masteryEmote3} alt="..." className="mastery-emote3"/>
              </div>
              <div className="mastery-points col">
                <p>{this.state.championsMastery3[2]}</p>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      mainChamps = <img src={logo} alt="..." className="charge-logo"/>;
    }

    let rankLeague
    if(this.state.ranked[0]){
      let RankToggler
      if(this.state.ranked[0].tier === 'BRONZE'){
        RankToggler = BRONZE
      }else if(this.state.ranked[0].tier === 'SILVER' ){
        RankToggler = SILVER;
      }else if(this.state.ranked[0].tier === 'GOLD' ){
        RankToggler = GOLD;
      }else if(this.state.ranked[0].tier === 'PLATINUM' ){
        RankToggler = PLATINUM ;
      }else if(this.state.ranked[0].tier === 'DIAMOND' ){
        RankToggler = DIAMOND; 
      }else if(this.state.ranked[0].tier === 'MASTER' ){
        RankToggler = MASTER; 
      }else if(this.state.ranked[0].tier === 'GRANDMASTER' ){
        RankToggler = GRANDMASTER; 
      }else if(this.state.ranked[0].tier === 'CHALLENGER' ){
        RankToggler = CHALLENGER;
      }else if(this.state.ranked[0].tier === 'IRON' ){
        RankToggler = IRON;
      }
      var losses =this.state.ranked[0].losses
      var victory = this.state.ranked[0].wins
      var vPercent =  (victory/(victory + losses ))*100
      let rankType = this.state.ranked[0].queueType
      if(rankType){
        if(rankType === 'RANKED_FLEX_SR'){
          rankType = 'Flexible'
        }else if(rankType === 'RANKED_SOLO_5x5'){
          rankType = 'Solo/Duo'
        }else{
          rankType = 'UNRANKED'
        }
      }
      rankLeague = (
        <div className="loqesea row">
          <div className="col">
            <img
              src={RankToggler}
              alt={`${this.state.ranked[0].tier}.`}
              className="emblem-rank"
            />
          </div>
          <div className="col">
            <span className="soloQ">{`Clasificatori ${rankType}`}</span>
            <p className="text-division">{`${this.state.ranked[0].tier} ${this.state.ranked[0].rank}`}</p>
            <p className="text-wandl">
              {`${this.state.ranked[0].leaguePoints}`}{" "}
              <lol>{`/${this.state.ranked[0].wins}W ${this.state.ranked[0].losses}L.`}</lol>
            </p>
            <p className="text-victory-percent">
              Tasa de victoria: {`${Math.trunc(vPercent)}%`}
            </p>
          </div>
        </div>
      );
    }else{
      rankLeague = 'Loading...'
    }


    // FLEX
    let rankLeagueFlex
    if(this.state.ranked[1]){
      let RankTogglerFlex
      if(this.state.ranked[1].tier === 'BRONZE'){
        RankTogglerFlex = BRONZE
      }else if(this.state.ranked[1].tier === 'SILVER' ){
        RankTogglerFlex = SILVER;
      }else if(this.state.ranked[1].tier === 'GOLD' ){
        RankTogglerFlex = GOLD;
      }else if(this.state.ranked[1].tier === 'PLATINUM' ){
        RankTogglerFlex = PLATINUM ;
      }else if(this.state.ranked[1].tier === 'DIAMOND' ){
        RankTogglerFlex = DIAMOND; 
      }else if(this.state.ranked[1].tier === 'MASTER' ){
        RankTogglerFlex = MASTER; 
      }else if(this.state.ranked[1].tier === 'GRANDMASTER' ){
        RankTogglerFlex = GRANDMASTER; 
      }else if(this.state.ranked[1].tier === 'CHALLENGER' ){
        RankTogglerFlex = CHALLENGER;
      }else if(this.state.ranked[1].tier === 'IRON' ){
        RankTogglerFlex = IRON;
      }else{
        rankLeagueFlex = UNRANKED
      }
      
      var losses =this.state.ranked[1].losses
      var victory = this.state.ranked[1].wins
      var vPercent =  (victory/(victory + losses ))*100
      let rankType = this.state.ranked[1].queueType
      if(rankType){
        if(rankType === 'RANKED_FLEX_SR'){
          rankType = 'Flexible'
        }else if(rankType === 'RANKED_SOLO_5x5'){
          rankType = 'Solo/Duo'
        }else{
          rankType = 'UNRANKED'
        }
      }
      rankLeagueFlex = (
        <div className="loqesea row">
          <div className="col">
            <img
              src={RankTogglerFlex}
              alt={`${this.state.ranked[1].tier}.`}
              className="emblem-rank"
            />
          </div>
          <div className="col">
            <span className="soloQ">{`Clasificatori ${rankType}`}</span>
            <p className="text-division">{`${this.state.ranked[1].tier} ${this.state.ranked[1].rank}`}</p>
            <p className="text-wandl">
              {`${this.state.ranked[1].leaguePoints}`}{" "}
              <lol>{`/${this.state.ranked[1].wins}W ${this.state.ranked[1].losses}L.`}</lol>
            </p>
            <p className="text-victory-percent">Tasa de victoria: {`${Math.trunc(vPercent)}%`}</p>
          </div>
        </div>
      );
    }else{
      let rankLeagueFleximg = UNRANKED
      rankLeagueFlex = (
        <div className="loqesea row">
          <div className="col">
            <img
              src={rankLeagueFleximg}
              alt={`...`}
              className="emblem-rank"
            />
          </div>
          <div className="col">
            <span className="soloQ">Clasificatoria 5v5 Flexible</span>
            <p className="text-division">{`UNRANKED`}</p>
          </div>
        </div>
      );
    }

    return (
      <div className="mainchamp">
        <form
          onSubmit={this.handlerSubmit}
          className="summoner-handler container"
        >
          <input
            type="text"
            name="faker"
            className="input-summoner"
            value={this.state.faker}
            onChange={this.handleInputChange}
            placeholder="Summoner Name"
          />
          <button type="submit" className="btn btn-main">
            Enviar
          </button>
        </form>

        <div className="">
          <div className="card container">
            <div className="summonerInfo row">
              <div className="summoner-img-box col">
                <img
                  src={this.state.img}
                  className="float-left summonerimg"
                  alt={this.state.profileIconId}
                />
                <div className="summoner-lvl">
                  <p className="lvl-text">{this.state.summonerLevel}</p>
                </div>
                <h5 className="summonerName p-3">{this.state.summonerName}</h5>
              </div>
              <div className="cajitabb col">{rankLeague}</div>
              <div className="cajitabb col">{rankLeagueFlex}</div>
            </div>
            <div className="champsMateryPoints">
              <div className="card-group">
                <div className="card">{mainChamps}</div>
              </div>
            </div>
          </div>
          <div className="card-body">
            <div className="matchList">
              <table className="table">
                <thead>
                  <tr>
                    <th>Champion</th>
                    <th>Time</th>
                    <th>K/DA</th>
                    <th>Build</th>
                  </tr>
                </thead>
                <tbody>{tableInfoToRender}</tbody>
              </table>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Summoner;
