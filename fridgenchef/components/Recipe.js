import React from 'react'
import {ScrollView, View, Text, Share, TouchableOpacity} from "react-native";
import ImageSlider from "./ImageSlider";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

class Recipe extends React.Component {

    state = {
        user: {},
        recipe: this.props.navigation.state.params.recipe,
        categories: [],
        ingredients: [],
    }

    componentWillUnmount() {
        this.props.navigation.state.params.onBack()
    }

    getCategories = async () => {
        let ingredients = [];
        fetch('https://vetterlain.dk/FridgeBook/api/category')
            .then(res => res.json())
            .then(categories => this.setState({categories}, () => {
                this.state.categories.forEach(category => {
                    category.amounts.forEach(amount => {
                        if (amount.recipe.id === this.props.navigation.state.params.recipe.id) {
                            for (let i = 0; i < category.ingredients.length; i++) {
                                ingredients.push({"name": category.name, "amount": category.amounts[i].amount});
                            }
                        }
                    })
                })
            }))
            .then(() => {
                this.setState({ingredients});
            })
    }


    componentDidMount() {
        this.getCategories();
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

        await fetch('https://vetterlain.dk/FridgeBook/api/recipe', options);

    }

    updateUserFavourites = async (hasFavourite) => {
        let user = {...this.state.user};
        if (!hasFavourite) {
            // console.log("updateUserFavourites - recipe findes IKKE fav")
            user.favouriteRecipes.push(this.state.recipe);
        } else {
            // console.log("updateUserFavourites - recipe findes i fav")
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
                // console.log("change counter - recipe findes IKKE i fav")
                this.setState({recipe: {...this.state.recipe, rateCounter: this.state.recipe.rateCounter + 1}}, async () => {
                    await this.updateRecipe()
                        .then(this.updateUserFavourites(false));
                });
            } else {
                // console.log("change counter - recipe findes i fav")
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
            message: 'Checkout Fridge\'N\'Chef on Google Play Store: https://play.google.com/store/apps/details?id=com.fridgenchef',
            // url: 'https://play.google.com/store/apps/details?isd=com.companyName.appname',
            // title: 'Wow, did you see that?'
        }, {
            // Android only:
            dialogTitle: 'Share Fridge\'N\'Chef',
            // iOS only:
            // excludedActivityTypes: [
            //     'com.apple.UIKit.activity.PostToTwitter'
            // ]
        })
    }

    renderIngredients = () => {
        return this.state.ingredients.map((ingredient, index) => {
            return (
                <Text style={{fontFamily: 'fira'}} key={index}>{ingredient.name}: {ingredient.amount}</Text>
            )
        })
    }

    render() {
        return (
            <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
                <ImageSlider handleImagePress={() => this.handleCounterChanging()} images={this.state.recipe.imagePaths}/>
                <View style={{borderBottomWidth: .5, borderBottomColor: 'gray', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={{
                        fontFamily: 'fira-bold',
                        fontSize: 34,
                        textAlign: 'center',
                    }}>{this.state.recipe.name}</Text>
                    <View/>
                    <View style={{flexDirection: 'row',paddingTop:3}}>
                        <TouchableOpacity onPress={() => {
                            this.handleCounterChanging().then(() => this.props.screenProps.getUser());
                        }}>
                            <Icon name={"heart"} size={40} color={this.state.recipe.color}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            this.onClick();
                        }}>
                            <Icon name="share" size={40} color="gray"/>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{padding: 3}}>
                    <Text style={{fontFamily: 'fira-bold', fontSize: 24}}>Ingredienser:</Text>
                    {this.renderIngredients()}
                    <Text style={{fontFamily: 'fira-bold', fontSize: 24}}>Fremgangsmåde:</Text>
                    <Text style={{fontFamily: 'fira'}}>{this.state.recipe.text}</Text>
                </View>
            </ScrollView>
        );
    }
}

export default Recipe;