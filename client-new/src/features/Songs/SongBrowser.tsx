import React, { Component } from 'react'
import { Grid, Header } from 'semantic-ui-react'

import SongCard from './SongCard'
import { Song } from './types'

import './SongBrowser.css'

type SongBrowserState = {
    currentSong: Song
    relatedSongs: Song[]
    previousSongs: Song[]
}

class SongBrowser extends Component<{}, SongBrowserState> {
    constructor(props) {
        super(props)
        this.state = {
            currentSong: {
                title: 'Self Care',
                artist: 'Mac Miller',
                url: 'https://www.youtube.com/watch?v=SsKT0s5J8ko',
            },
            relatedSongs: [
                {
                    title: 'Dang!',
                    artist: 'Anderson.Paak',
                    url: 'https://www.youtube.com/watch?v=LR3GQfryp9M',
                },
                {
                    title: 'Them Changes',
                    artist: 'Thundercat',
                    url: 'https://www.youtube.com/watch?v=GNCd_ERZvZM',
                },
            ],
            previousSongs: [],
        }
    }

    setCurrentSong(song: Song) {
        this.setState(state => {
            return {
                currentSong: song,
                previousSongs: [...state.previousSongs, state.currentSong],
            }
        })
    }

    render() {
        const { currentSong, relatedSongs, previousSongs } = this.state
        return (
            <div className="songBrowser">
                <div className="songBrows previousSongs">
                    <Header as="h2">Previous Songs</Header>
                    {previousSongs.map(relatedSong => (
                        <SongCard
                            song={relatedSong}
                            onClick={() => this.setCurrentSong(relatedSong)}
                        />
                    ))}
                </div>
                <div className="songBrowser currentSong">
                    <SongCard song={currentSong} expanded={true} />
                </div>
                <div className="songBrowser relatedSongs">
                    <Header as="h2">Related Songs</Header>
                    {relatedSongs.map(relatedSong => (
                        <SongCard
                            song={relatedSong}
                            onClick={() => this.setCurrentSong(relatedSong)}
                        />
                    ))}
                </div>
            </div>
        )
    }
}

export default SongBrowser
