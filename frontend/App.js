import React from 'react'
import {StackNavigator, TabNavigator} from 'react-navigation';
import Home from "./components/Home";
import Comestible from "./components/Comestible";
import AddComestible from "./components/AddComestible";
import Recipes from "./components/Recipes";
import Shop from "./components/Shop";
import Recipe from "./components/Recipe";
import AddIngredient from "./components/AddIngredient";

const Start = StackNavigator({
    Home: {
        screen: Home,
        path: '/',
        navigationOptions: {
            title: 'Fridgebook',
            tabBarLabel: 'Varer',
        },
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
        navigationOptions: {
            title: 'Ingrediens',
            tabBarLabel: 'Varer',
        }
    },
    AddIngredient:{
        screen:AddIngredient,
        navigationOptions:{
            title:'Opret vare',
            tabBarLabel:'Varer'
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

const Maps = StackNavigator({
    Shop: {
        screen: Shop,
        navigationOptions: {
            title: "Map",
            tabBarLabel: "Shop",
        },
    },
},{
    navigationOptions: {
        headerStyle: {marginTop: 24}
    },
});

const MyApp = TabNavigator({
    Home: {screen: Start},
    Recipes: {screen: RecipesTab},
    Shop: {screen: Maps},
}, {
    tabBarPosition: 'bottom',
    animationEnabled: true,
    indicatorStyle:{backgroundColor:"red"},
    tabBarOptions: {
        activeTintColor:'white',
        inactiveTintColor:'#D3D3D3',
        style:{
            backgroundColor:'#3b9bff',
        },
        indicatorStyle: {
            backgroundColor: 'white',
        },
    },
});


export default class App extends React.Component {
    render() {
        return (
            <MyApp/>
        )
    }
}