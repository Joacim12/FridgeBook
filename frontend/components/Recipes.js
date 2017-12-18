import React from 'react'
import { List, ListItem } from "react-native-elements";
import { RefreshControl, ScrollView, View } from "react-native";

class Recipes extends React.Component {
    state = {
        user: {},
        recipes: [],
        refreshing: false,
    }

    componentDidMount() {
        this.updateUserInState();
        this.fetchRecipes();
    }

    updateUserInState = () => {
        this.props.screenProps.getUser()
            .then(user => this.setState({ user }));
    }

    fetchRecipes = () => {
        fetch('https://vetterlain.dk/FridgeBook/api/recipe')
            .then(response => response.json())
            .then(recipes => this.setState({ recipes }))
            .catch(error => console.log("Couldn't fetch recipes!!!", error));
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
                                onPress={() => this.props.navigation.navigate('Recipe',
                                    {
                                        recipe: recipe, onBack: () => {
                                            this.updateUserInState();
                                            this.fetchRecipes();
                                        }
                                    })}
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