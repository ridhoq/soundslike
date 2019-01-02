import React, { Component } from 'react'
import Navbar from './Navbar'
import SongBrowser from '../Songs/SongBrowser'

import './App.css'

class App extends Component {
    render() {
        return (
            <div className="App">
                <Navbar />
                <SongBrowser />
            </div>
        )
    }
}

export default App
