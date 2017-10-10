import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {NativeRouter, Route, Link} from 'react-router-native'

class Home extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>
                    Home
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
       container: {
        flex:8,
        backgroundColor: 'skyblue'
    },
})

export default Home