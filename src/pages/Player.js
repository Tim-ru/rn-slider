import React from 'react'
import { Text, View } from 'react-native';
import styles from '../styles/styles'


const Player = () => {
    return (
        <View style={styles.container}>
            <View style={styles.screen}>
                <Text style={styles.containerText}>Player</Text>
            </View>
        </View>
    )
}

export default Player