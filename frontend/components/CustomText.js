import React from 'react';
import {Text, View,StyleSheet} from 'react-native';

class CustomText extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>
                    Recipes
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


export default CustomText