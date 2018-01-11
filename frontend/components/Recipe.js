import React from 'react'
import {View} from "react-native";
import {Button, FormInput, FormLabel, Text} from "react-native-elements";
import Icon from 'react-native-vector-icons/FontAwesome';
import Test from "./Test";

class Recipe extends React.Component {
    static navigationOptions = ({navigation}) => ({
        // headerRight: <Button
        //     title="something"
        //     onPress={() => console.log("clicked")}
        // />
    });

    state = {
        user: {},
        recipe: this.props.navigation.state.params.recipe
    }

    componentWillUnmount() {
        this.props.navigation.state.params.onBack()
    }

    componentDidMount() {
        this.props.screenProps.getUser()
            .then(user => this.setState({user}));
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

        const res = await fetch('https://vetterlain.dk/FridgeBook/api/recipe', options);
        //console.log(res);
    }

    updateUserFavourites = async (hasFavourite) => {
        let user = {...this.state.user};
        if (!hasFavourite) {
            console.log("updateUserFavourites - recipe findes IKKE fav")
            user.favouriteRecipes.push(this.state.recipe);
        } else {
            console.log("updateUserFavourites - recipe findes i fav")
            user.favouriteRecipes = user.favouriteRecipes.filter(recipe => recipe.id !== this.state.recipe.id);
        }
        this.setState({user});

        const options = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "PUT",
            body: JSON.stringify(user)
        }

        const res = await fetch('https://vetterlain.dk/FridgeBook/api/user/', options);
        // console.log(res);
    }

    handleCounterChanging = async () => {
        if (this.state.user.favouriteRecipes.filter(recipe => recipe.id === this.state.recipe.id).length === 0) {
            console.log("change counter - recipe findes IKKE i fav")
            this.setState({recipe: {...this.state.recipe, rateCounter: this.state.recipe.rateCounter + 1}}, async () => {
                await this.updateRecipe()
                    .then(this.updateUserFavourites(false));
            });
        } else {
            console.log("change counter - recipe findes i fav")
            this.setState({recipe: {...this.state.recipe, rateCounter: this.state.recipe.rateCounter - 1}}, async () => {
                await this.updateRecipe()
                    .then(this.updateUserFavourites(true));
            });
        }
    }

    render() {
        return (
            <Test/>
        );
    }
}

export default Recipe;