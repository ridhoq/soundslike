import React, { Component } from 'react'
import Navbar from './Navbar'
import Song from '../Songs/Song'

import './App.css'

class App extends Component {
    render() {
        return (
            <div className="App">
                <Navbar />
                <Song
                    title="Dum Surfer"
                    artist="King Krule"
                    url="https://www.youtube.com/watch?v=K5-f1Bnltu8"
                />
            </div>
        )
    }
}

export default App
