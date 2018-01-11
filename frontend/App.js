import React from 'react'
import {StackNavigator, TabNavigator} from 'react-navigation';
import Home from "./components/Home";
import Comestible from "./components/Comestible";
import AddComestible from "./components/AddComestible";
import Recipes from "./components/Recipes";
import Map from "./components/Map";
import Recipe from "./components/Recipe";
import AddIngredient from "./components/CreateIngredient";
import Test from "./components/Test";

const Start = StackNavigator({
        Home: {
            screen: Home,
            path: '/',
        },
        AddComestible: {
            screen: AddComestible,
            navigationOptions: {
                title: 'Tilføj vare',
                tabBarLabel: 'Varer',
            }
        },
        Comestible: {
            screen: Comestible,

        },
        AddIngredient: {
            screen: AddIngredient,
            navigationOptions: {
                title: 'Opret vare',
                tabBarLabel: 'Varer'
            }
        }
    }
    , {
        navigationOptions: {
            headerStyle: {marginTop: 24}
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
        headerStyle: {marginTop: 24}
    },
});

const MapTab = StackNavigator({
    Map: {
        screen: Map,
        navigationOptions: {
            title: "Map",
            tabBarLabel: "Kort",
        },
    },
}, {
    navigationOptions: {
        headerStyle: {marginTop: 24}
    },
});

const TestTab = StackNavigator({
    Shop: {
        screen: Test,
        navigationOptions: {
            title: "Test",
            tabBarLabel: "Test",
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
    Map: {screen: MapTab},
    Test: {screen: TestTab},
}, {
    tabBarPosition: 'bottom',
    animationEnabled: true,
    indicatorStyle: {backgroundColor: "red"},
    tabBarOptions: {
        activeTintColor: 'white',
        inactiveTintColor: '#D3D3D3',
        style: {
            backgroundColor: '#3b9bff',
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