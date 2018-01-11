import React from 'react'
import {ScrollView, View} from "react-native";
import {Button, FormInput, FormLabel, Text} from "react-native-elements";
import Icon from 'react-native-vector-icons/FontAwesome';
import Test from "./Test";
import {Share} from "react-native";

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
            .then(user => {
                    this.heart(user);
                    this.setState({user});
                }
            )
        let recipe = this.state.recipe;
        recipe.icon = "heart-o";
        recipe.color = "gray";
        this.setState({recipe})
    }

    heart = (user) => {
        let recipe = this.state.recipe;
        recipe.icon = "heart-o";
        recipe.color = "gray";
        this.setState({recipe})
        user.favouriteRecipes.forEach(recipe => {
                if (this.state.recipe.id === recipe.id) {
                    this.state.recipe.icon = "heart";
                    this.state.recipe.color = "red";
                }
            }
        )
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
        this.heart(user);
        const res = await fetch('https://vetterlain.dk/FridgeBook/api/user/', options);
        // console.log(res);
    }

    handleCounterChanging = async () => {
        if (this.state.user.favouriteRecipes.length > 0) {
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
        } else {
            this.setState({recipe: {...this.state.recipe, rateCounter: this.state.recipe.rateCounter + 1}}, async () => {
                await this.updateRecipe()
                    .then(this.updateUserFavourites(false));
            });
        }
    }

    onClick = () => {
        Share.share({
            message: 'Checkout FridgeBook on Google play store',
            url: 'https://play.google.com/store/apps/details?id=com.companyName.appname',
            title: 'Wow, did you see that?'
        }, {
            // Android only:
            dialogTitle: 'Share FridgeBook',
            // iOS only:
            excludedActivityTypes: [
                'com.apple.UIKit.activity.PostToTwitter'
            ]
        })
    }

    renderIngredients = () => {
       return this.state.recipe.recipeIngredients.map((ingredient,index) => {
            return (
                <Text key={index}>{ingredient.name}</Text>
            )
        })
    }

    render() {
        // console.log(this.state.recipe)
        return (
            <ScrollView style={{flex: 1, backgroundColor: "white"}}>
                <Test images={this.state.recipe.imagePaths}/>
                <View style={{flexDirection: 'row'}}>
                    <Icon name={this.state.recipe.icon} style={{padding: 10}} size={40} color={this.state.recipe.color} onPress={() => {
                        this.handleCounterChanging()
                            .then(() => this.props.screenProps.getUser());
                    }}/>
                    <Icon name="bullhorn" style={{padding: 10}} size={40} color="gray" onPress={() => {
                        this.onClick();
                    }}/>
                </View>
                <View style={{flex: 1}}>
                    <Text h3 style={{
                        textAlign: 'center',
                        borderBottomColor: 'black',
                        borderBottomWidth: .5,
                        marginLeft: 20,
                        marginRight: 20
                    }}>{this.state.recipe.name}</Text>
                    <Text h4>{"\n"}Ingredienser:</Text>
                    {this.renderIngredients()}
                    <Text h4>Fremgangsmåde:</Text>
                    <Text>{this.state.recipe.text}</Text>
                </View>
            </ScrollView>
        );
    }
}

export default Recipe;