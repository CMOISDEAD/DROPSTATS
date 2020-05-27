import React, { Component } from 'react'
import '../App.css'

const imageHeader = 'https://mocah.org/uploads/posts/318045-Mordekaiser-New-Splash-Art-LoL-4K.jpg'
const upImageHeader = 'https://playparty.cat/wp-content/uploads/2019/02/logo-lol.png'

class Slider extends Component {

    render() {
        return (
            <div className="header-section">
                <div className="image-header">
                    <div className="up-image">
                        <img src={upImageHeader} alt="..." className=""/>
                    </div>
                    <img src={imageHeader} alt="..." className="img-header"/>
                    
                </div>
                <div className="container paragraph">
                    <p className="text-muted">Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                        Tempora saepe quasi praesentium recusandae ex, fuga quam eius ut harum sunt 
                        repellendus temporibus magni veniam velit,
                        voluptate asperiores dignissimos quibusdam reprehenderit?
                    </p>
                </div>
            </div>
        )
    }
}

export default Slider