import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native';
import styles from '../styles/styles'
import TrackPlayer, {
    State,
    Event,
    useTrackPlayerProgress,
    usePlaybackState,
    useTrackPlayerEvents
} from "react-native-track-player";
import localSounds from '../snd/sounds'
import { connect } from 'react-redux'
import { actions } from '../redux/action'
import Icon from 'react-native-vector-icons/FontAwesome'

class Player extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isPlaying: false,
            audioId: 0,
            playlist: []
        }
    }

    async componentDidMount() {
        let response = await fetch("https://imagesapi.osora.ru/?isAudio=true");

        let json = await response.json();
        // создание remoteAudio в redux
        if (json.length) {
            await this.props.setRemoteAudio(json)
            this.setState({ playlist: this.props.remoteAudio })
        }
        // преобразовние масиива remoteSounds
        let remoteSounds = []
        this.props.remoteAudio.map((e) => {
            remoteSounds.push({
                id: this.props.remoteAudio.indexOf(e),
                url: e,
                title: `track ${this.props.remoteAudio.indexOf(e)}`
            })
        })

        // соединение localSounds и remoteSounds
        this.setState({ playlist: localSounds.concat(remoteSounds) })
        console.log(this.state.playlist);
    }

    togglePlayback = async () => {
        await TrackPlayer.add(this.state.playlist);
        await TrackPlayer.play();
        if (this.state.isPlaying) {
            await TrackPlayer.pause()
            this.setState({ isPlaying: false })
        } else {
            await TrackPlayer.play()
            this.setState({ isPlaying: true })
        }
    }

    nextAudio = async () => {
        try {
            await TrackPlayer.skipToNext();
        } catch (_) { }
    }

    prevAudio = async () => {
        try {
            await TrackPlayer.skipToPrevious();
        } catch (_) { }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.screen}>

                    <TouchableOpacity onPress={this.togglePlayback}>
                        <Icon name="pause" size={40} color="#920" />
                    </TouchableOpacity>
                    <Text style={{ backgroundColor: '#fff' }}>track 1</Text>
                    <TouchableOpacity onPress={this.nextAudio}>
                        <Text style={styles.containerText}>Next</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.prevAudio}>
                        <Text style={styles.containerText}>Prev</Text>
                    </TouchableOpacity>
                </View>
            </View >
        )
    }
}

const mapStateToProps = state => {
    return state
}

const mapDispatchToProps = {
    ...actions
}

export default connect(mapStateToProps, mapDispatchToProps)(Player)