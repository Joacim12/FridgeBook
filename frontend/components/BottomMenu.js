import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {NativeRouter, Route, Link} from 'react-router-native'

class BottomMenu extends React.Component {
    render() {
        return (
            <View style={styles.nav}>
                <Link to="/" underlayColor='gray' style={styles.navItem}>
                    <Text>Ingredients</Text>
                </Link>
                <Link to="/recipes" underlayColor='gray' style={styles.navItem}>
                    <Text>Recipes</Text>
                </Link>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    navItem: {
        flex: 1,
        alignItems: 'center',
        padding:25

    },
    nav: {
        flex:1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: 'steelblue'
    },
})

export default BottomMenu