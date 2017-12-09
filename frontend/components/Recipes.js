import React from 'react'
import { Button, Icon, List, ListItem, Text } from "react-native-elements";
import { RefreshControl, ScrollView, TouchableOpacity, View, StyleSheet } from "react-native";

class Recipes extends React.Component {

    state = {
        recipes: [],
        refreshing: false,
    }

    componentDidMount() {
        this.getRecipes();
    };

    getRecipes = () => {
        fetch('https://vetterlain.dk/FridgeBook/api/recipe')
            .then(response => response.json())
            .then(recipes => { this.setState({ recipes }) })
            .catch(error => console.log("Couldn't fetch recipes!!!"));
    }


    onRefresh = () => {
        // Not much happening here! Should probably fetch new data :-)
        this.setState({ refreshing: false })
    }


    render() {
        return (
            <View style={{ flex: 1 }}>
                <ScrollView
                    refreshControl={
                        <RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh} />
                    }>
                    <List>{
                        this.state.recipes.map((recipe, index) => (
                            <ListItem
                                key={index}
                                title={recipe.name}
                                onPress={() => this.props.navigation.navigate('Recipe', { recipe: recipe })}
                            />
                        ))
                    }
                    </List>
                </ScrollView>
            </View>
        );
    }
}

export default Recipes;