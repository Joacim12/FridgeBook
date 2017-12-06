import React from 'react'
import { Button, Icon, List, ListItem, Text } from "react-native-elements";
import { RefreshControl, ScrollView, TouchableOpacity, View, StyleSheet } from "react-native";

class Recipes extends React.Component {
    static navigationOptions = {
        title: 'FridgeBook',
    };

    state = {
        recipeNames: [],
        refreshing: false,
    }

    componentDidMount() {
        fetch('https://vetterlain.dk/FridgeBook/api/recipe')
            .then(response => response.json())
            .then(recipes => {
                recipes.forEach(recipe => {
                    this.state.recipeNames.push(recipe.name);
                    console.log(this.state.recipeNames);
                })
            }
            )
            .catch(error => console.log("Couldn't fetch recipes!!!"))
    };


    onRefresh = () => {
        // Not much happening here! Should probably fetch new data :-)
        this.setState({ refreshing: false });
    }


    render() {
        return (
            <View style={{ flex: 1 }}>
                <ScrollView
                    refreshControl={
                        <RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh} />
                    }>
                    <List>{
                        this.state.recipeNames.map((item, index) => (
                            <ListItem
                                key={index}
                                title={item}
                                onPress={() => this.props.navigation.navigate('Recipe', { Recipe: item })}
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