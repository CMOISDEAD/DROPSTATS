import React, { Component } from "react";
import "../App.css";

import newChamp from "../assets/Volibear.jpg"

import { data } from "../champlist.json";
import { ritokey } from "../KEY/RIOTAPIKEY.json";

class champsR extends Component {
  constructor() {
    super();
    this.state = {
      key: ritokey,
      freeChampionIds: [],
      freeChampionsNames: [],
      realCNames: [],
      champsJson: [],
      img: [],
    };
  }

  componentDidMount(e) {
    const api = this.state.key;
    const apiKey = "?api_key=" + api;
    fetch(
      "https://la1.api.riotgames.com/lol/platform/v3/champion-rotations" +
        apiKey
    )
      .then((response) => {
        return response.json();
      })
      .then((myJson) => {
        const data = myJson;
        this.setState({
          freeChampionIds: data.freeChampionIds,
        });
      })
      .catch(console.log);
  }

  render() {
    var waiting = this.state.freeChampionIds.map((freeChampionIds, i) => {
      var index = this.state.freeChampionIds[i]
      return (
        <a href={"champions/" + data[index].ChampName}>
          <img
            src={`http://ddragon.leagueoflegends.com/cdn/10.11.1/img/champion/${data[index].ChampName}.png`}
            alt={freeChampionIds}
            className="champs-rotation vanish"
            key={i}
          />
        </a>
      );
    });

    return (
      <div className="row">
        <div className="col ">
          <div className="paragraf-box new-champ-art">
            <h3 className="text-center main-color textTest">Most Recent New Champ</h3>
            <div className="story-box">
              <p className="champ-title">Volibear</p>
              <p className="champ-slogan">The relentless of storm</p>
            </div>
            <img src={newChamp} alt=""/>
          </div>
        </div>
        <div className="col ">
          <h3 className="text-center main-color">Champion Rotation</h3>
          {waiting}
        </div>
      </div>
    );
  }
}

export default champsR;
