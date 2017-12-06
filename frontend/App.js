import React from 'react'
import { StackNavigator } from 'react-navigation';
import Home from "./components/Home";
import Comestible from "./components/Comestible";
import AddComestible from "./components/AddComestible";
import Recipes from "./components/Recipes";
import Recipe from "./components/Recipe";

const SimpleApp = StackNavigator({
  Home: { screen: Home },
  Comestible: { screen: Comestible },
  AddComestible: { screen: AddComestible },
  Recipes: { screen: Recipes },
  Recipe: { screen: Recipe },
}, {
    navigationOptions: {
      title: null,
      headerStyle: { marginTop: 24 }
    },
  });

export default class App extends React.Component {
  render() {
    return (
      <SimpleApp />
    )
  }
}