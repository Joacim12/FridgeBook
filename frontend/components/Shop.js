import React from 'react'
import { StyleSheet, View } from "react-native"

class Shop extends React.Component {
    state = {}

    async componentWillMount() {
    }

    render() {

        return (
            <View style={styles.container}>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'ivory',
    },
});

export default Shop;