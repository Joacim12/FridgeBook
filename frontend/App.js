import React from 'react'
import {Text, View,} from 'react-native'
import {NativeRouter, Route} from 'react-router-native'
import BottomMenu from "./components/BottomMenu";
import TopMenu from "./components/TopMenu";
import Home from "./components/Ingredients";
import Recipes from "./components/Recipes";
import {Header} from "react-native-elements";


export default class App extends React.Component {
    render() {
        return (
            <NativeRouter>
                {/*<View style={{flex:1}}>*/}
                <View>
                    <Header
                        backgroundColor={'black'}
                        leftComponent={{ icon: 'menu', color: '#fff' }}
                        centerComponent={{ text: 'FridgeBook', style: { color: '#fff' } }}
                        rightComponent={{ icon: 'home', color: '#fff' }}
                    />
                    <Route exact path="/" component={Home}/>
                    <Route path="/recipes" component={Recipes}/>
                    {/*<BottomMenu/>*/}
                </View>
            </NativeRouter>
        );
    }
}
