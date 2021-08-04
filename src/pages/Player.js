import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native';
import styles from '../styles/styles'
import TrackPlayer, { Capability, updateMetadataForTrack, TrackMetadata } from "react-native-track-player";
import localSounds from '../snd/sounds'
import { connect } from 'react-redux'
import { actions } from '../redux/action'
import Icon from 'react-native-vector-icons/Ionicons'

class Player extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isPlaying: false,
            audioId: 0,
            playlist: [],
            artist: '',
            title: '',
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

        // преобразовние массива remoteSounds
        let remoteSounds = []
        await this.props.remoteAudio.map((e) => {
            remoteSounds.push({
                url: e,
            })
        })

        // соединение localSounds и remoteSounds
        this.setState({ playlist: localSounds.concat(remoteSounds) })

        TrackPlayer.updateOptions({
            stopWithApp: true,
            alwaysPauseOnInterruption: true,
            capabilities: [
                TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
                TrackPlayer.CAPABILITY_PLAY,
                TrackPlayer.CAPABILITY_PAUSE,
                TrackPlayer.CAPABILITY_STOP,
                TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
            ],
            compactCapabilities: [
                TrackPlayer.CAPABILITY_PLAY,
                TrackPlayer.CAPABILITY_PAUSE,
            ]
        });
        await this.updateMetadata()
        await TrackPlayer.add(this.state.playlist)
        this.capability()
        console.log(this.state.playlist);
    }

    componentWillUnmount() {
        TrackPlayer.stop();
    }

    capability = () => {
        TrackPlayer.addEventListener('remote-previous', () => this.prevAudio())
        TrackPlayer.addEventListener('remote-play', () => this.togglePlayback())
        TrackPlayer.addEventListener('remote-pause', () => this.togglePlayback())
        TrackPlayer.addEventListener('remote-stop', () => TrackPlayer.stop())
        TrackPlayer.addEventListener('remote-next', () => this.nextAudio())
    }

    updateMetadata = async () => {
        TrackPlayer.addEventListener('playback-metadata-received', async (e) => {
        await TrackPlayer.add(this.state.playlist)

            const currentTrack = await TrackPlayer.getCurrentTrack();
            const trackObject = await TrackPlayer.getTrack(currentTrack);

            if (trackObject.title == '') {
                trackObject.title = 'Неизвестно'
            }
            if (trackObject.artist == '') {
                trackObject.artist = 'Неизвестный'
            }
            await TrackPlayer.updateMetadataForTrack(currentTrack, { id: trackObject.id, title: e.title, artist: e.artist });
            this.setState({ id: trackObject.id, title: trackObject.title, artist: trackObject.artist })
        });

    }

    togglePlayback =  async () => {
        await this.updateMetadata()
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
            await TrackPlayer.play();
            await this.updateMetadata()
            this.setState({ isPlaying: true })

        } catch (_) { }
    }

    prevAudio = async () => {
        try {
            await TrackPlayer.skipToPrevious();
            await TrackPlayer.play();
            await this.updateMetadata()
            this.setState({ isPlaying: true })

        } catch (_) { }
    }

    // getTrackName = async (objArray) => {
    //     let result = objArray.map(a => a.title);
    //     console.log(result);
    // }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.screen}>
                    <Text style={styles.trackTitle}>{this.state.artist} - {this.state.title}</Text>

                    <View style={styles.playerButtons}>
                        <TouchableOpacity onPress={this.prevAudio}>
                            <Icon name="play-skip-back-outline" size={40} color="#920" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.togglePlayback}>
                            {this.state.isPlaying === true ?
                                <Icon name="pause-outline" size={40} color="#920" /> :
                                <Icon name="play-outline" size={40} color="#920" />
                            }

                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.nextAudio}>
                            <Icon name="play-skip-forward-outline" size={40} color="#920" />
                        </TouchableOpacity>
                    </View>
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