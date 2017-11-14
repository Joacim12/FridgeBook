import React from 'react'
import {StackNavigator} from 'react-navigation';
import Home from "./components/Home";
import Ingredient from "./components/Ingredient";
import AddIngredient from "./components/AddIngredient";

// let myNewBackgroundColor = 'teal';

const SimpleApp = StackNavigator({
    Home: {screen: Home},
    Ingredient: {screen: Ingredient},
    AddIngredient: {screen: AddIngredient}
}, {
    navigationOptions: {
        title: null,
        headerStyle: {marginTop: 24}
    },
});

export default class App extends React.Component {
    render() {
        console.log("hej")
        return (
            <SimpleApp style={{backgroundColor:'gray'}}/>
        )
    }
}