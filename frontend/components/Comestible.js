import React from 'react'
import { Button, Text, View } from "react-native";
import { Divider } from "react-native-elements";

class Comestible extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params.comestible.ingredient.name,
        // headerRight: <Button
        //     title="something"
        //     onPress={() => console.log("clicked")}
        // />
    });
    
    render() {
        const { comestible } = this.props.navigation.state.params;
        return (
            <View>
                <Text>{comestible.ingredient.name}</Text>
                <Text>Antal: {comestible.amount}</Text>
                <Text>Tilføjet: {comestible.addedDate}</Text>
                <Text>Udløbsdato: {comestible.expiryDate}</Text>
                <Divider style={{ backgroundColor: 'gray' }} />
                <Text>Opskrifter med denne ingrediens:</Text>
            </View>
        );
    }
}

export default Comestible