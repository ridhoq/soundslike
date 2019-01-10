import React, { Component } from 'react'
import { Card, Embed } from 'semantic-ui-react'

import { Song } from './types'

type SongCardProps = {
    song: Song
    expanded?: boolean
    onClick?: () => void
}

class SongCard extends Component<SongCardProps> {
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
        const {
            song: { title, artist, url },
            expanded,
            onClick,
        } = this.props

        return (
            <Card centered onClick={onClick}>
                {expanded && (
                    <Card.Content>
                        <Embed
                            id={this.getYoutubeIdFromUrl(url)}
                            aspectRatio="16:9"
                            placeholder={this.getYoutubeThumbnailUrl(url)}
                            source="youtube"
                        />
                    </Card.Content>
                )}
                <Card.Content>
                    <Card.Header>{title}</Card.Header>
                    <Card.Meta>
                        <span>{artist}</span>
                    </Card.Meta>
                </Card.Content>
            </Card>
        )
    }
}

export default SongCard
