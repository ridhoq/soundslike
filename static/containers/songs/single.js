import React, {Component} from "react";

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response
    } else {
        const error = new Error(response.statusText);
        error.response = response;
        throw error
    }
}

export default class SongSingleContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {loading: true};
    }

    componentDidMount() {
        const songId = this.props.match.params.songId;
        fetch(`/api/songs/${songId}`)
            .then(checkStatus)
            .then(function(response) {
                return response.json()
            }).then((song) => {
            this.setState({loading: false, song, found: true})
        }).catch((error) => {
            if (error.response.status === 404) {
                return this.setState({loading: false, found: false})
            }
            this.setState({loading: false, error: true})
        })
    }

    render() {
        const {loading, found=false, error=false, song=null} = this.state;

        if (loading) {
            return <div>
                Loading...
            </div>
        }


        if (error) {
            return <div>
                Something went wrong
            </div>
        }

        if (!found) {
            return <div>
                Not found :(
            </div>
        }

        return <div>
            <pre>{JSON.stringify(song, null, "  ")}</pre>
        </div>
    }
}