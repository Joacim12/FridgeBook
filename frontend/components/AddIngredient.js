import React from 'react';
import { TextInput, View, StyleSheet, TouchableOpacity } from "react-native";
import { Icon, List, ListItem, Text } from "react-native-elements";

class AddIngredient extends React.Component {
    state = {
        ingredient: {},
        ingredients: [],
    };

    componentDidMount() {
        this.getIngredients();
    };


    getIngredients = async () => {
        const ingredients = await (await fetch('https://vetterlain.dk/FridgeBook/api/ingredient')).json();
        this.setState({ ingredients });
    }

    addIngredient = async () => {
        const ingredient = {
            name: this.state.ingredient.name,
            imagePath: this.state.ingredient.imagePath
        }

        // this.state.user.comestibles.push(ingredient);

        const options = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(ingredient)
        }

        const res = await fetch('https:/vetterlain.dk/FridgeBook/api/ingredient', options);
        console.log(res);
    }

    render() {
        return (
            <View style={{ padding: 10 }}>
                <TextInput
                    style={{ height: 40 }}
                    placeholder="Navn på vare"
                    value={this.state.name}
                    onChangeText={text => this.setState({ ingredient: { ...this.state.ingredient, name: text } })}
                />


                <TouchableOpacity onPress={this.addIngredient}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Tilføj</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        margin: 3,
        alignItems: 'center',
        backgroundColor: '#2196F3'
    },
    buttonText: {
        padding: 7,
        fontSize: 18,
        fontWeight: "bold",
        color: 'white'
    }
});

export default AddIngredient;