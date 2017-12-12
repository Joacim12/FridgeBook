import React from 'react'
import { View } from "react-native";
import { Button, FormInput, FormLabel, Text } from "react-native-elements";
import Icon from 'react-native-vector-icons/FontAwesome';

class Recipe extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        // headerRight: <Button
        //     title="something"
        //     onPress={() => console.log("clicked")}
        // />
    });

    state = {
        recipe: this.props.navigation.state.params.recipe,
    }

    updateRecipe = async () => {
        const options = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "PUT",
            body: JSON.stringify(this.state.recipe)
        }

        const res = await fetch('https://vetterlain.dk/FridgeBook/api/recipe/', options);
        console.log(res);
    }

    changeCounter = () => {
        if (true) {
            this.setState({ recipe: { ...this.state.recipe, rateCounter: this.state.recipe.rateCounter + 1 } });
        } else {
            this.setState({ recipe: { ...this.state.recipe, rateCounter: this.state.recipe.rateCounter - 1 } });
        }
    }

    render() {
        return (
            <View>
                <FormLabel>Titel:</FormLabel><FormInput
                    style={{ height: 40 }}
                    value={this.state.recipe.name}
                    onChangeText={text => this.setState({ recipe: { ...this.state.recipe, name: text } })}
                    placeholder="Indtast titel på opskrift..."
                />
                <Icon.Button name="thumbs-up" size={30} onPress={() => {
                    this.changeCounter();
                    console.log(this.state.recipe.rateCounter);
                    this.updateRecipe();
                }}></Icon.Button>
                <Text>Bedømmelse: {this.state.recipe.rateCounter}</Text>
                <FormInput
                    style={{ height: 40 }}
                    value={this.state.recipe.text}
                    onChangeText={text => this.setState({ recipe: { ...this.state.recipe, text: text } })}
                    placeholder="Beskriv din opskrift..."
                />
            </View>
        );
    }
}

export default Recipe;