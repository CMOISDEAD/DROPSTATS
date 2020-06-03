import React, { Component } from "react";
import "../App.css";
import Footer from "../plugins/Footer";

import logo from '../assets/DROPDEADS.png'

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
      championsMastery1: "",
      championsMastery2: "",
      championsMastery3: "",
      faker: "",
      matchList: "",
      matchInfo: [],
    };
    this.handlerSubmit = this.handlerSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    // this.bringData = this.bringData.bind(this);
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
      mainChamps = (
        <div className="container  row justify-content-center">
          <div className="mastery-points-card col">
            <img
              src={`http://ddragon.leagueoflegends.com/cdn/10.11.1/img/champion/${
                data[this.state.championsMastery1[0]].ChampName
              }.png`}
              alt={this.state.championsMastery1[0]}
            />
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
            <img
              src={`http://ddragon.leagueoflegends.com/cdn/10.11.1/img/champion/${
                data[this.state.championsMastery2[0]].ChampName
              }.png`}
              alt={this.state.championsMastery2[0]}
            />
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
            <img
              src={`http://ddragon.leagueoflegends.com/cdn/10.11.1/img/champion/${
                data[this.state.championsMastery3[0]].ChampName
              }.png`}
              alt={this.state.championsMastery3[0]}
            />
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
      );
    } else {
      mainChamps = <img src={logo} alt="..." className="charge-logo"/>;
    }

    let champImageWallpaper
    if(this.state.championsMastery1 &&
      this.state.championsMastery2 &&
      this.state.championsMastery3){
      champImageWallpaper = (
        <img
          src={`http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${
            data[this.state.championsMastery1[0]].ChampName
          }_1.jpg`}
          alt=""
          className="main-champ-wallpaper"
        />
      );
    }else{
      champImageWallpaper = 'Loading...'
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
              <div className="cajitabb col">{champImageWallpaper}</div>
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
