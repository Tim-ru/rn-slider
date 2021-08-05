import * as React from 'react'
import { BackHandler, Linking, Text, TouchableOpacity, View } from 'react-native';
import { NativeRouter, Link } from "react-router-native";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { reducer } from './redux/reducer';
import Routes from './routes/routes'
import styles from './styles/styles'
import { registerRootComponent } from 'expo';


const store = createStore(reducer, applyMiddleware(thunk))

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <NativeRouter>
          <View style={styles.main}>
            <View style={styles.header}>
              <View style={styles.headerInner}>

                <View>
                  <Link to="/" underlayColor="#f0f4f7">
                    <Text style={styles.linkStyle}>Home</Text>
                  </Link>
                </View>
                <View>
                  <Link
                    to="/slider"
                    underlayColor="#f0f4f7"
                  >
                    <Text style={styles.linkStyle}>Slider</Text>
                  </Link>
                </View>

                <View>
                  <Link
                    to="/player"
                    underlayColor="#f0f4f7"
                  >
                    <Text style={styles.linkStyle}>Player</Text>
                  </Link>
                </View>

                <TouchableOpacity
                  onPress={() => { Linking.openURL('https://q-digital.org') }}
                >
                  <Text style={styles.containerText}>Browser</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => { BackHandler.exitApp() }}
                >
                  <Text style={styles.containerText}>Exit</Text>
                </TouchableOpacity>

              </View>

              <View style={styles.screen}>
                <Routes style={styles.container} />
              </View>
              
            </View>
          </View>
        </NativeRouter>
      </Provider >
    );
  }
}


registerRootComponent(App);
