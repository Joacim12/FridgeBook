import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {NativeRouter, Route, Link} from 'react-router-native'

class TopMenu extends React.Component {
    render() {
        return (
            <View style={styles.nav}>
                <Text style={styles.navItem}>FridgeBook</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    nav: {
        backgroundColor: 'powderblue',
        flex:1,

    },navItem:{
        marginTop:"8%",
        fontSize:25,
        justifyContent: 'space-around',
        fontWeight: 'bold',
        textAlign:'center'
    }
})

export default TopMenu