import React from 'react'
import { TouchableOpacity, View, Image, Text } from 'react-native'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { actions } from '../redux/action'
import styles from '../styles/styles'


class Slider extends React.Component {
    constructor(props) {
        super(props)
        console.log(props);
        this.state = {
            localImages: [
                require('../img/0.jpg'),
                require("../img/1.jpg"),
                require("../img/2.jpg"),
            ],
        }
    }

    async componentDidMount() {
        let response = await fetch("https://imagesapi.osora.ru/");

        let json = await response.json();

        if (json.length) {
            this.props.setRemote(json)
            this.props.switchSource('remote')
        }
    }

    nextSlide = () => {
        if (this.props.slideId >= 2) {
            this.props.nextSlide(0)
        } else {
            this.props.nextSlide(this.props.slideId + 1)
        }
    }

    prevSlide = () => {
        if (this.props.slideId == 0) {
            this.props.prevSlide(this.images.length - 1)
        } else {
            this.props.prevSlide(this.props.slideId - 1)
        }
        console.log(this.props.slideId);
    }

    switchSource = () => {
        this.props.switchSource(!this.props.remote)
    }

    get images () {
        return !this.props.remote ? this.state.localImages : this.props.remoteImages
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.sliderContainer}>

                    <View style={styles.imageContainer}>
                        {!this.props.remote ?
                            <Image style={styles.image} source={this.state.localImages[this.props.slideId]}></Image> :
                            <Image style={styles.image} source={{ uri: this.props.remoteImages[this.props.slideId] }}></Image>
                        }
                    </View>
                    <View style={styles.sliderButtons}>
                        <TouchableOpacity onPress={this.prevSlide} style={styles.btn}>
                            <Text style={styles.containerText}>Prev Slide</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.nextSlide} style={styles.btn}>
                            <Text style={styles.containerText}>Next Slide</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={this.switchSource}
                >
                    <Text style={styles.containerText}>Switch to {!this.props.remote ? 'local' : 'remote'}</Text>
                </TouchableOpacity>
                {/* <Link to="/"><Text>Back to main</Text></Link> */}
            </View>
        )
    }

}

const mapStateToProps = state => {
    return state
}

const mapDispatchToProps = {
    ...actions
}

export default connect(mapStateToProps, mapDispatchToProps)(Slider)