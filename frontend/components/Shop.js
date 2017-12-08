import React from 'react'
import {  Text, View } from "react-native";

class Shop extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        // title: navigation.state.params.recipe.name,
    });
    render() {
        return (
            <View>
                <Text>HEY</Text>
            </View>
        );
    }
}

export default Shop;