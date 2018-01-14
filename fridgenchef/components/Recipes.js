import React from 'react'
import {Text, ScrollView, RefreshControl, StyleSheet, View} from 'react-native'
import {Card, Button, Icon, FormInput} from 'react-native-elements'

class Recipes extends React.Component {
    state = {
        user: null,
        recipes: [],
        refreshing: false,
        categories: [],
        searchText: "",
        loading: false
    }

    static navigationOptions = ({navigation}) => ({
        headerTitle:
            <View style={{flexDirection: 'row', marginLeft: 10}}>
                <Icon
                    name='search'
                    size={24}
                    type='MaterialIcons'
                    color="#f0f0f0"
                />
                <FormInput
                    placeholder={"Søg"}
                    underlineColorAndroid={'transparent'}
                    inputStyle={{color: '#f0f0f0'}}
                    onChangeText={(text) => navigation.state.params.search(text)}
                />
            </View>
    });

    componentDidUpdate() {
        if (this.props.screenProps.getSearch() !== '') {
            this.search(this.props.screenProps.getSearch());
        }
    }


    componentWillMount() {
        this.props.navigation.setParams({search: this.search});
        try {
            this.props.screenProps.fetchFromFacebook();
        } catch (err) {
            console.warn(err);
        }
    }

    componentDidMount = async () => {
        if (this.props.screenProps.fbUser !== null) {
            this.setState({
                recipes: await this.fetchRecipes()
            }, () => {
                this.updateUserInState().then(async () => {
                })
            })
            this.fetchCategories();
        }
    }

    search = async (text) => {
        if (text.length > 0) {
            this.setState({recipes: await this.fetchRecipes()})
            this.updateUserInState();
        }
        this.setState({searchText: text}, () => {
        })
        console.log(text);
        this.props.screenProps.setSearch('');
        let recipesContainingInput = [];
        this.state.recipes.forEach(recipe => {
            if (recipe.name.toLowerCase().indexOf(text.toLowerCase()) > -1) {
                recipesContainingInput.push(recipe);
            }
        })
        /**
         * Checks if any recipe contains ingredient
         * i.e: User searchs for 'øko', since recipe with pancakes contains 'Hvedemel' and 'Økologisk hvedemel' is a subcategory of 'Hvedemel',
         * the search will return 'Pandekager' and all other recipes with 'Hvedemel'
         */
        this.state.categories.forEach(category => {
            category.ingredients.forEach(ingredient => {
                if (ingredient.name.toLowerCase().indexOf(text.toLowerCase()) > -1) {
                    this.state.recipes.forEach(recipe => {
                            recipe.recipeIngredients.forEach(ingr => {
                                if (ingr.name.toLowerCase().indexOf(category.name.toLowerCase()) > -1) {
                                    recipesContainingInput.push(recipe);
                                }
                            })
                        }
                    )
                }
            })
        })
        this.setState({recipes: recipesContainingInput}, () => console.log('updated recipes in state: ' + this.state.recipes.length))
        if (text.length === 0) {
            this.setState({recipes: await this.fetchRecipes()})
            this.updateUserInState();
        }
    }


    updateUserInState = async () => {
        let user = this.props.screenProps.getUser()
        this.setState({user: await user}, () => {
            let recipes = this.state.recipes;
            this.state.user.favouriteRecipes.forEach(rec => {
                recipes.forEach(reci => {
                    if (reci.id === rec.id) {
                        reci.color = 'red';
                    } else {
                        reci.color = 'white';
                    }
                })
            })
            this.setState({recipes})
        });
    }

    fetchCategories = async () => {
        fetch('https://vetterlain.dk/FridgeBook/api/category')
            .then(response => response.json())
            .then((categories) => {
                this.setState({categories}, () => console.log('updated categories'))
            })
            .catch(error => console.log("Couldn't fetch recipes!!!", error));
    }


    fetchRecipes = async () => {
        return await (await fetch('https://vetterlain.dk/FridgeBook/api/recipe')).json()
    }


    onRefresh = async () => {
        await this.fetchCategories();
        this.setState({recipes: await this.fetchRecipes(), refreshing: false})
        await this.updateUserInState();
    }

    render() {
        if (this.state.recipes.length === 0) {
            return (
                <ScrollView style={{flex: 1, backgroundColor: 'white'}} refreshControl={
                    <RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh}/>
                }>
                    <Text style={{textAlign: 'center'}}>{"\n"}Fandt ingen resultater :({"\n"} Træk ned for at opdatere..</Text>
                </ScrollView>)
        }
        return (
            <ScrollView style={styles.container}
                        refreshControl={
                            <RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh}/>
                        }>

                {
                    this.state.recipes.map((recipe, index) => (
                        <Card
                            key={index}
                            title={recipe.name}
                            containerStyle={{backgroundColor: "white"}}
                            wrapperStyle={{backgroundColor: "white"}}
                            image={{uri: recipe.imagePaths[0]}}>
                            <Text style={{marginBottom: 10, textAlign: 'center'}}>
                                {recipe.note}
                            </Text>
                            <Button
                                iconRight={{name: 'favorite', color: recipe.color}}
                                backgroundColor='#2196F3'
                                buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                                title={"Se opskrift      " + recipe.rateCounter}
                                onPress={() => this.props.navigation.navigate('Recipe', {
                                    recipe: recipe, onBack: async () => {
                                        this.setState({recipes: await this.fetchRecipes()}), this.updateUserInState();
                                    }
                                })
                                }
                            />
                        </Card>
                    ))
                }
            </ScrollView>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"
    }
});

export default Recipes;