import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {NativeRouter, Route, Link} from 'react-router-native'
import {Component} from "react/cjs/react.development";

class ListItem extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.title}>{this.props.ingredient.name}</View>
                <View style={styles.cross}>x</View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    title: {
        // justifyContent: 'center',
        // color: 'red',
        // fontSize: 45,
        textAlign: 'left',
    }, cross: {
        justifyContent: 'space-around',
        fontWeight: 'bold',
        textAlign: 'right',
        // color: 'blue'
    },

    container: {
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        justifyContent: 'space-around',
        textAlign: 'left',
        borderBottomColor: '#bbb',
        borderBottomWidth: 1,
        backgroundColor: 'transparent',
    }

})

export default ListItem