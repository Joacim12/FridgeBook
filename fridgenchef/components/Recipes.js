import React from 'react'
import {Text, ScrollView, RefreshControl, StyleSheet, View, Modal} from 'react-native'
import {Card, Button, Icon, FormInput} from 'react-native-elements'

// import navIcon from 'react-native-vector-icons/MaterialCommunityIcons';

class Recipes extends React.Component {
    state = {
        user: null,
        recipes: [],
        refreshing: false,
        categories: [],
        searchText: "",
        loading: false,
        modalVisible: false,
    }

    static navigationOptions = ({navigation, screenProps}) => {
        const params = navigation.state.params || {};
        return {
            headerTitle: params.headerTitle,
            // headerRight: params.headerRight,
        }
    }

    _setNavigationParams() {
        let headerTitle =
            <View style={{flex: 1, flexDirection: 'row', marginLeft: 10}}>
                <Icon
                    name='search'
                    size={24}
                    type='MaterialIcons'
                    color="#f0f0f0"
                />
                <FormInput
                    placeholder={"Søg"}
                    underlineColorAndroid={'transparent'}
                    inputStyle={{color: '#f0f0f0', fontFamily: 'fira'}}
                    onChangeText={(text) => this.search(text)}
                />
            </View>
        let headerRight =
            <View style={{flex: 1, flexDirection: 'row', paddingRight: 10}}>
                <Icon
                    name="sort"
                    type='MaterialIcons'
                    size={24}
                    color="#f0f0f0"
                    onPress={() => {
                        this.openModal()
                    }}
                />
            </View>

        this.props.navigation.setParams({
            headerTitle,
            // headerRight,
        });
    }

    sortRecipes = () => {
        let userCategories = [];
        this.state.user.comestibles.forEach(comestible => {
            this.state.categories.forEach(category => {
                category.ingredients.forEach(ingredient => {
                    if (ingredient.name === comestible.ingredient.name) {
                        userCategories.push(category.name)
                    }
                })
            })
        })

        let recipes = this.state.recipes;

        let userReceps = []

        recipes.forEach(rec => {
            this.state.categories.forEach(cat => {
                userCategories.forEach(uCat => {
                    if (uCat === cat.name && cat.amounts[0].id === rec.id) {
                        userReceps.push(rec);
                    }
                })
            })
        })

        //
        // let sortedArr = [];
        // userCategories.forEach(cat => {
        //     recipes.forEach(rec => {
        //         rec.forEach()
        //         if (cat === rec.name) {
        //             sortedArr.push(com);
        //         }
        //     })
        // })


        // let user = this.state.user;
        // user.comestibles = sortedArr;
        this.setState({recipes: userReceps})
        // console.log(userCategories)
    }

    openModal() {
        this.setState({modalVisible: true});
    }

    closeModal() {
        this.setState({modalVisible: false});
    }

    componentDidUpdate() {
        if (this.props.screenProps.getSearch() !== '') {
            this.search(this.props.screenProps.getSearch());
        }
    }


    componentWillMount() {
        this.props.navigation.setParams({search: this.search});
        try {
            this.props.screenProps.fetchFromFacebook();
            this._setNavigationParams();
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
                if (ingredient.name === text) {
                    category.amounts.forEach(amount => {
                        recipesContainingInput.push(amount.recipe)
                    })
                }
            })
        })


        // this.state.categories.forEach(category => {
        //     category.ingredients.forEach(ingredient => {
        //         if (ingredient.name.toLowerCase().indexOf(text.toLowerCase()) > -1) {
        //             this.state.recipes.forEach(recipe => {
        //                     if (recipe.recipeIngredients !== undefined) {
        //                         recipe.recipeIngredients.forEach(ingr => {
        //                             if (ingr.name.toLowerCase().indexOf(category.name.toLowerCase()) > -1) {
        //                                 recipesContainingInput.push(recipe);
        //                             }
        //                         })
        //                     }
        //                 }
        //             )
        //         }
        //     })
        // })
        this.setState({recipes: recipesContainingInput})
        if (text.length === 0) {
            this.setState({recipes: await this.fetchRecipes()})
            this.updateUserInState();
        }
    }


    updateUserInState = async () => {
        let user = this.props.screenProps.getUser()
        this.setState({user: await user}, () => {
            let recipes = this.state.recipes;
            recipes.forEach(reci => {
                this.state.user.favouriteRecipes.forEach(rec => {
                    if (reci.id === rec.id) {
                        reci.color = 'red';
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
                this.setState({categories})
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
                    <Text style={{textAlign: 'center', fontFamily: 'fira'}}>{"\n"}Fandt ingen resultater :({"\n"} Stryg ned for at opdatere..</Text>
                </ScrollView>)
        }
        return (
            <ScrollView style={styles.container}
                        refreshControl={
                            <RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh}/>
                        }>
                <Modal
                    transparent={true}
                    visible={this.state.modalVisible}
                    animationType={'fade'}
                    onRequestClose={() => this.closeModal()}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.innerContainer}>
                            <View style={{paddingBottom: 35, marginLeft: 120}}>
                                <Icon name={"close"} size={50} color="#000000" onPress={() => this.closeModal()}/>
                            </View>
                            <Text>Vis kun opskrifter hvor du har minimum 1 ingrediens</Text>
                            <Button
                                buttonStyle={{backgroundColor: "#2196F3"}}
                                onPress={() => {
                                    this.sortRecipes();
                                    this.closeModal();
                                }}
                                title="Søg"
                            />
                        </View>
                    </View>
                </Modal>

                {
                    this.state.recipes.map((recipe, index) => (
                        <Card
                            key={index}
                            title={recipe.name}
                            titleStyle={{fontFamily: 'fira-bold', fontWeight: '300'}}
                            containerStyle={{backgroundColor: "white"}}
                            wrapperStyle={{backgroundColor: "white"}}
                            // fontFamily={'fira'}
                            // fontWeight={'300'}

                            image={{uri: recipe.imagePaths[0]}}>

                            <Text style={{marginBottom: 10, textAlign: 'center', fontFamily: 'fira'}}>
                                {recipe.note}
                            </Text>
                            <Button
                                iconRight={{name: 'favorite', color: recipe.color}}
                                backgroundColor='#2196F3'
                                fontFamily={'fira'}
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
    },
    modalContainer: {
        backgroundColor: 'rgba(255,255,255,0.8)',
        flex: 1,
        justifyContent: 'center',
        // backgroundColor: 'grey',
    },
    innerContainer: {
        alignItems: 'center',
    },
});

export default Recipes;