import React from 'react'
import {Button, Text, View} from "react-native";
import {Divider} from "react-native-elements";

class Ingredient extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: navigation.state.params.ingredient.ingredient.name,
        headerRight: <Button
            title="something"
            onPress={()=>console.log("clicked")}
        />
    });
    render() {
        const { ingredient } = this.props.navigation.state.params;
        return (
            <View>
                <Text>{ingredient.ingredient.name}</Text>
                <Text>Added: {ingredient.addedDate}</Text>
                <Text>ExpiryDate: {ingredient.expiryDate}</Text>
                <Divider style={{ backgroundColor: 'gray' }} />
                <Text>Opskrifter med denne ingrediens:</Text>
            </View>
        );
    }
}

export default Ingredient