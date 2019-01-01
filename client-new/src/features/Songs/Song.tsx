import React, { Component } from 'react'
import { Card, Embed } from 'semantic-ui-react'

type SongProps = {
    title: string
    artist: string
    url: string
}

class Song extends Component<SongProps> {
    getYoutubeIdFromUrl(url: string) {
        // regex from https://stackoverflow.com/a/27728417
        const regex = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/
        const matches = url.match(regex)!
        return matches[1]
    }

    getYoutubeThumbnailUrl(url: string) {
        return `https://img.youtube.com/vi/${this.getYoutubeIdFromUrl(
            url
        )}/hqdefault.jpg`
    }

    render() {
        const { title, artist, url } = this.props
        return (
            <Card>
                <Card.Content>
                    <Embed
                        id={this.getYoutubeIdFromUrl(url)}
                        aspectRatio="16:9"
                        placeholder={this.getYoutubeThumbnailUrl(url)}
                        source="youtube"
                    />
                    <Card.Header>{title}</Card.Header>
                    <Card.Meta>
                        <span>{artist}</span>
                    </Card.Meta>
                </Card.Content>
            </Card>
        )
    }
}

export default Song
