import React from 'react'
import {StackNavigator, TabNavigator} from 'react-navigation';
import Home from "./components/Home";
import User from "./components/User";
import Comestible from "./components/Comestible";
import AddComestible from "./components/AddComestible";
import Recipes from "./components/Recipes";
import Recipe from "./components/Recipe";
import AddIngredient from "./components/CreateIngredient";
import Test from "./components/Test";
import {Ionicons} from "react-native-vector-icons";
import {Font, SecureStore} from 'expo';
import Login from "./components/Login";
import {ActivityIndicator, View} from "react-native";
import Barcode from "./components/Barcode";


const Start = StackNavigator({
        Home: {
            screen: Home,
            path: '/',
        },
        Login: {
            screen: Login,
            navigationOptions: {
                title: 'FridgeBook',
                gesturesEnabled: false,
                tabBarVisible: false,
                swipeEnabled: false,
            },
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
        },
        User: {
            screen: User,
            navigationOptions: {
                title: 'Konto',
            }
        },
        Barcode: {
            screen: Barcode,
            navigationOptions: {
                tabBarVisible: false,
                swipeEnabled: false,
            }
        }
    }
    , {
        navigationOptions: {
            headerTintColor: '#f0f0f0',
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
        headerTintColor: '#f0f0f0',
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

// const TestTab = StackNavigator({
//     Shop: {
//         screen: Login,
//         navigationOptions: {},
//     },
// }, {
//     navigationOptions: {
//         headerStyle: {marginTop: 24}
//     },
// });

// const LoginStack = StackNavigator({
//     LoginScreen: {
//         screen: Login,
//     }
// }, {
//     navigationOptions: {
//         headerStyle: {marginTop: 24}
//     },
// })

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

    state = {
        token: null,
        loading: true,
        fbUser: null
    }

    getUser = async () => {
        return await (await fetch('https://vetterlain.dk/FridgeBook/api/user/' + this.state.fbUser.id)).json()
    }

    // componentDidMount() {
    //     Font.loadAsync({
    //         'open-sans-bold': require('./assets/fonts/FiraSans-Regular.ttf'),
    //     });
    // }

    componentWillMount = async () => {
        this.fetchFromFacebook();
    }

    fetchFromFacebook = async () => {
        let token = await SecureStore.getItemAsync("fbToken");
        this.setState({token: token})
        if (this.state.token !== null) {
            const response = await fetch(`https://graph.facebook.com/me?fields=id,name,picture&access_token=${this.state.token}`);
            this.setState({fbUser: await response.json(), loading: false}, () => {
            })
        } else {
            this.setState({loading: false})
        }
    }


    render() {
        if (this.state.loading) {
            return (
                <View style={{flex: 1, justifyContent: 'center'}}>
                    <ActivityIndicator size={100} color="#2196F3"/>
                </View>
            )
        }
        return (
            <MyApp screenProps={{getUser: this.getUser, fbUser: this.state.fbUser, fetchFromFacebook: this.fetchFromFacebook}}/>
        )
    }

}