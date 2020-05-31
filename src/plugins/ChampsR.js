import React, { Component } from "react";
import "../App.css";

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
        <img
          src={`http://ddragon.leagueoflegends.com/cdn/10.11.1/img/champion/${data[index].ChampName}.png`}
          alt={freeChampionIds}
          className="p-3"
          key={i}
        />
      );
    });

    return (
      <div className="row">
        <div className="col">
          <h3 className="text-center main-color">Champion Rotation</h3>
          {waiting}
        </div>
      </div>
    );
  }
}

export default champsR;
