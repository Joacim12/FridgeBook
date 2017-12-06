import React from 'react'
import { Button, Text, View } from "react-native";
import { Divider } from "react-native-elements";

class Recipe extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params.ingredient.ingredient.name,
        headerRight: <Button
            title="something"
            onPress={() => console.log("clicked")}
        />
    });
    render() {
        const { recipe } = this.props.navigation.state.params;
        return (
            <View>
                <Text>{ingredient.ingredient.name}</Text>
                <Text>Titel: {ingredient.addedDate}</Text>
                <Text>Bedømmelse: {ingredient.expiryDate}</Text>
                <Text>Tekst: {ingredient.expiryDate}</Text>
                <Text>Ingredienser: {ingredient.expiryDate}</Text>
                <Divider style={{ backgroundColor: 'gray' }} />
            </View>
        );
    }
}

export default Recipe;