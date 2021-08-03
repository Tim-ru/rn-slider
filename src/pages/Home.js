import React from 'react'
import { Text, View } from 'react-native';
import styles from '../styles/styles'



const Home = () => {
    return (
        <View style={styles.container}>
            <View style={styles.screen}>
                <Text style={styles.containerText}>Home</Text>
            </View>
        </View>
    )
}

export default Home