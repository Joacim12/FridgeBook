import React from 'react'
import {Text, View,} from 'react-native'
import {NativeRouter, Route} from 'react-router-native'
import BottomMenu from "./components/BottomMenu";
import TopMenu from "./components/TopMenu";
import Home from "./components/Home";
import Recipes from "./components/Recipes";


export default class App extends React.Component {
    render() {
        return (
            <NativeRouter>
                <View style={{flex:1}}>
                    <TopMenu/>
                    <Route exact path="/" component={Home}/>
                    <Route path="/recipes" component={Recipes}/>
                    <BottomMenu/>
                </View>
            </NativeRouter>
        );
    }
}
