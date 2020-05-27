import React, { Component } from 'react'
import '../App.css'

class Summoner extends Component{
    
    constructor(){
        super()
        this.state = {
            summonerName    :  ''   ,
            summonerLevel   :  ''   ,
            profileIconId   :  ''   ,
            img             :  ''   ,
            faker           :  ''
        }
        this.handlerSubmit = this.handlerSubmit.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
    }
    
    handleInputChange(e){
        const {value, name} = e.target;
        console.log(value, name);
        this.setState({
            [name]: value
        });
    }

    handlerSubmit(e){
        e.preventDefault()
        const api =  'RGAPI-9c50b017-4778-476d-8cbe-f8adb5dacc48' 
        const apiKey= '?api_key='+ api
        const Summoner = this.state.faker
        fetch('https://la1.api.riotgames.com/lol/summoner/v4/summoners/by-name/' + Summoner + apiKey )
        .then((response)=>{
            return response.json()
        })
        .then((myJson)=>{
            const data = myJson
            const cdnUrl = 'https://ddragon.leagueoflegends.com/cdn/10.6.1/img/profileicon/'
            const png = '.png'
            this.setState({
                summonerName    :  data.name   ,
                summonerLevel   :  data.summonerLevel   ,
                profileIconId   :  data.profileIconId   ,
                img             : cdnUrl + data.profileIconId + png
            })
            console.log(this.state.img)
        })
        .catch(console.log)
    }

    render(){
        return(
            <div>
                <form onSubmit={this.handlerSubmit} className="card-body form-group">
                    <input
                        type="text"
                        name="faker"
                        className="form-control"
                        value = {this.state.faker}
                        onChange={this.handleInputChange}
                        placeholder="Summoner Name"
                    />
                    <button type="submit" className="btn btn-primary">
                        Enviar
                    </button>
                </form>

                <div className="container">
                    <div className="card" >
                        <div className="summonerInfo">
                        <img src={this.state.img} className="rounded float-left summonerimg" alt={this.state.profileIconId}/>
                            <h5 className="summonerName p-3">{this.state.summonerName}</h5>
                            <p className="summonerLvl">{this.state.summonerLevel}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Summoner