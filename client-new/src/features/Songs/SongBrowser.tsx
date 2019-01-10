import React, { Component } from 'react'
import { Grid, Header } from 'semantic-ui-react'

import SongCard from './SongCard'
import { Song } from './types'

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
            <Grid columns="3">
                <Grid.Column>
                    <Header as="h2" inverted>
                        Previous Songs
                    </Header>
                    {previousSongs.map(relatedSong => (
                        <SongCard
                            song={relatedSong}
                            onClick={() => this.setCurrentSong(relatedSong)}
                        />
                    ))}
                </Grid.Column>
                <Grid.Column>
                    <Grid.Row verticalAlign="middle">
                        <SongCard song={currentSong} expanded />
                    </Grid.Row>
                </Grid.Column>
                <Grid.Column textAlign="center">
                    <Header as="h2" inverted>
                        Related Songs
                    </Header>
                    {relatedSongs.map(relatedSong => (
                        <SongCard
                            song={relatedSong}
                            onClick={() => this.setCurrentSong(relatedSong)}
                        />
                    ))}
                </Grid.Column>
            </Grid>
        )
    }
}

export default SongBrowser
