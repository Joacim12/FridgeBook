import React from 'react'
import {StackNavigator, TabNavigator} from 'react-navigation';
import Home from "./components/Home";
import Comestible from "./components/Comestible";
import AddComestible from "./components/AddComestible";
import Recipes from "./components/Recipes";
import Recipe from "./components/Recipe";
import AddIngredient from "./components/CreateIngredient";
import Test from "./components/Test";
import {Ionicons} from "react-native-vector-icons";

const Start = StackNavigator({
        Home: {
            screen: Home,
            path: '/',
        },
        AddComestible: {
            screen: AddComestible,
            navigationOptions: {
                title: 'Tilføj vare',
            }
        },
        Comestible: {
            screen: Comestible,

        },
        AddIngredient: {
            screen: AddIngredient,
            navigationOptions: {
                title: 'Opret vare',
            }
        }
    }
    , {
        navigationOptions: {
            headerTintColor:'#f0f0f0',
            headerStyle: {marginTop: 24, backgroundColor: "#3b9bff"},

            tabBarIcon: () => {
                return <Ionicons
                    name={'ios-home'}
                    size={26}
                    style={{color: '#ffffff'}}
                />
            }
        },
    });


const RecipesTab = StackNavigator({
    Recipes: {
        screen: Recipes,
        navigationOptions: {
            title: 'Opskrifter',
            tabBarLabel: 'Opskrifter'
        },
    },
    Recipe: {
        screen: Recipe,
        navigationOptions: {
            title: 'Opskrift',
            tabBarLabel: 'Opskrifter'
        }
    },
}, {
    navigationOptions: {
        headerTintColor:'#f0f0f0',
        headerStyle: {marginTop: 24, backgroundColor: "#2196F3"},
        tabBarIcon: () => {
            return <Ionicons
                name={'ios-nutrition'}
                size={26}
                style={{color: '#ffc16a'}}
            />
        }
    },
});

const TestTab = StackNavigator({
    Shop: {
        screen: Test,
        navigationOptions: {
            tabBarIcon: () => {
                return <Ionicons
                    name={'ios-home'}
                    size={26}
                    style={{color: 'white'}}
                />

            }
        },
    },
}, {
    navigationOptions: {
        headerStyle: {marginTop: 24}
    },
});

const MyApp = TabNavigator({
    Home: {screen: Start},
    Recipes: {screen: RecipesTab},
    // Test: {screen: TestTab},
}, {
    tabBarPosition: 'bottom',
    animationEnabled: true,
    indicatorStyle: {backgroundColor: "red"},
    tabBarOptions: {
        showIcon: true,
        showLabel: false,
        activeTintColor: 'white',
        inactiveTintColor: '#D3D3D3',
        style: {
            backgroundColor: '#2196F3',
        },
        indicatorStyle: {
            backgroundColor: 'white',
        },
    },
});


export default class App extends React.Component {

    getUser = async () => {
        return await (await fetch('https://vetterlain.dk/FridgeBook/api/user/gustav')).json()
    }

    render() {
        return (
            <MyApp screenProps={{getUser: this.getUser}}/>
        )
    }
}