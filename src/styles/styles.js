import { StyleSheet } from "react-native";
import { Dimensions } from 'react-native';

const DW = Dimensions.get('window').width;

const styles = StyleSheet.create({
    main: {
        backgroundColor: "#9DC7B7",
        color: "white",
        display: 'flex',
        flex: 1
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        flexDirection: 'column-reverse'
    },
    headerInner: {
        backgroundColor: 'red',
        display: 'flex',
        justifyContent: 'space-around',
        flexDirection: 'row',
        alignItems: 'center',
        
    },
    linkStyle: {
        color: '#37DDE0',
        fontSize: 20,
        paddingVertical: 10,
        textDecorationLine: "underline"
    },
    container: {
        backgroundColor: "#1F1F1E",
        width: DW,
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerText: {
        color: '#37DDE0',
        fontSize: 20
    },
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
    },
    image: {
        width: 250,
        height: 200,
        backgroundColor: "rgb(22,22,22)",
    },
    sliderContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
    btn: {
        padding: 4,
        fontSize: 20,
        textTransform: 'uppercase',
        borderWidth: 2,
        borderColor:'rgb(246, 83, 83)',
        margin: 10,
        fontSize: 18
    },
    sliderButtons: {
        flexDirection: 'row'
    }
});

export default styles
