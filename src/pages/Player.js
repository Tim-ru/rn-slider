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
            this.props.setRemoteAudio(json)
        }


        await TrackPlayer.updateOptions({
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
        TrackPlayer.registerPlaybackService(() => require('../service'));
        TrackPlayer.setupPlayer()
        TrackPlayer.add(this.state.playlist)
        this.capability()
    }

    async componentDidUpdate() {
        if (this.props.remoteAudio.length && !this.state.playlist.length) {

            // преобразовние массива remoteSounds
            let remoteSounds = this.props.remoteAudio.map(url => { return { url } })

            // соединение localSounds и remoteSounds
            this.setState({ playlist: localSounds.concat(remoteSounds) })

            // await TrackPlayer.add(this.state.playlist)
            // console.log(this.state.playlist
        }
    }

    componentWillUnmount() {
        TrackPlayer.stop();
    }

    capability = () => {
        TrackPlayer.addEventListener('remote-previous', this.prevAudio)
        TrackPlayer.addEventListener('remote-play', this.togglePlayback)
        TrackPlayer.addEventListener('remote-pause', this.togglePlayback)
        TrackPlayer.addEventListener('remote-stop', () => TrackPlayer.stop())
        TrackPlayer.addEventListener('remote-next', this.nextAudio)
        TrackPlayer.addEventListener('playback-track-changed', this.updateMetadata);
        TrackPlayer.addEventListener('playback-metadata-received', this.updateMetadata);
    }

    updateMetadata = async (e) => {
        console.log(e)
        // const trackObject = await TrackPlayer.getTrack(currentTrack);
        // console.log(trackObject)
        // if (trackObject.title == '') {
        //     trackObject.title = 'Неизвестно'
        // }
        // if (trackObject.artist == '') {
        //     trackObject.artist = 'Неизвестный'
        // }
        this.setState({ title: e.title, artist: e.artist });
        const currentTrack = await TrackPlayer.getCurrentTrack();
        await TrackPlayer.updateMetadataForTrack(currentTrack, { title: e.title, artist: e.artist });
        //console.log(this.state.playlist);
    }

    togglePlayback = async () => {
        // await this.updateMetadata()
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
            // await this.updateMetadata()
            this.setState({ isPlaying: true })

        } catch (_) { }
    }

    prevAudio = async () => {
        try {
            await TrackPlayer.skipToPrevious();
            await TrackPlayer.play();
            // await this.updateMetadata()
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