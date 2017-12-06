import React from 'react'
import { Button, Text, View } from "react-native";
import { Divider } from "react-native-elements";

class Recipe extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params.recipe.name,
        // title: navigation.state.params.recipe.ingredient.name,
        // headerRight: <Button
        //     title="something"
        //     onPress={() => console.log("clicked")}
        // />
    });
    render() {
        const { recipe } = this.props.navigation.state.params;
        return (
            <View>
                <Text>Titel: {recipe.name}</Text>
                <Text>Bedømmelse: {recipe.rateCounter}</Text>
                <Text>Tekst: {recipe.text}</Text>                
                <Divider style={{ backgroundColor: 'gray' }} />
            </View>
        );
    }
}

export default Recipe;