import React from 'react'
import {Text, ScrollView, RefreshControl, StyleSheet} from 'react-native'
import {Card, Button} from 'react-native-elements'

class Recipes extends React.Component {
    // static navigationOptions = ({navigation}) => ({
    //     onTransitionEnd: ((t) => {
    //         console.log("transition" + t)
    //     }),
    //     // headerRight: <Button
    //     //     title="something"
    //     //     onPress={() => console.log("clicked")}
    //     // />
    // });

    state = {
        user: {},
        recipes: [],
        refreshing: false,
    }


    componentDidMount() {
        if (this.props.screenProps.fbUser !== null) {
            this.updateUserInState()
        }

    }


    updateUserInState = () => {
        this.props.screenProps.getUser()
            .then(user => this.setState({user}, () => {
                this.fetchRecipes();
            }));
    }

    fetchRecipes = () => {
        fetch('https://vetterlain.dk/FridgeBook/api/recipe')
            .then(response => response.json())
            .then((recipes) => {
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
            })
            .catch(error => console.log("Couldn't fetch recipes!!!", error));
    }

    onRefresh = () => {
        this.fetchRecipes();
        this.setState({refreshing: false})
    }

    render() {
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
                                    recipe: recipe, onBack: this.updateUserInState,
                                    onBack: () => {
                                        this.updateUserInState();
                                        this.fetchRecipes();
                                    }
                                })}
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