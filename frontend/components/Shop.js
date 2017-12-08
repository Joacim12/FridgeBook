import React from 'react'
import {StyleSheet, View} from "react-native"
import { Text} from "react-native-elements";


class Shop extends React.Component {

    state = {
        image: null,
        name: "",
        message: ""
    }




    render() {
        return (
            <View style={styles.container}>
                <Text>HEY</Text>
            </View>
        );
    }
}


const styles = StyleSheet.create
({
    container: {
        flex: 1,
        backgroundColor: 'ivory',
    },
});
export default Shop;