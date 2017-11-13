import React from 'react'
import { StackNavigator } from 'react-navigation';
import Home from "./components/Home";
import Ingredient from "./components/Ingredient";


const SimpleApp = StackNavigator({
  Home: { screen: Home },
  Ingredient: { screen: Ingredient },
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