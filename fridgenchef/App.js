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
import {SecureStore, Font} from 'expo';
import Login from "./components/Login";
import {ActivityIndicator, StatusBar, View} from "react-native";
import Barcode from "./components/Barcode";
import {Icon} from "react-native-elements";


const Start = StackNavigator({
        Home: {
            screen: Home,
            path: '/',
        },
        Login: {
            screen: Login,
            navigationOptions: {
                title: 'Fridge\'N\'Chef',
                gesturesEnabled: false,
                tabBarVisible: false,
                swipeEnabled: false,
                header: null,
            },
        },
        AddComestible: {
            screen: AddComestible,
            navigationOptions: {
                title: 'Tilføj vare',
                tabBarVisible: false,
                swipeEnabled: false,
            }
        },
        Comestible: {
            screen: Comestible,

        },
        AddIngredient: {
            screen: AddIngredient,
            navigationOptions: {
                title: 'Opret vare',
                tabBarVisible: false,
                swipeEnabled: false,
            }
        },
        User: {
            screen: User,
            navigationOptions: {
                title: 'Konto',
                swipeEnabled: false,
                tabBarVisible: false,
            }
        },
        Barcode: {
            screen: Barcode,
            navigationOptions: {
                title: 'Scan stregkode',
                tabBarVisible: false,
                swipeEnabled: false,
            }
        }
    }
    , {
        navigationOptions: {
            headerTintColor: '#f0f0f0',
            headerTitleStyle: {fontFamily: 'fira-bold', fontWeight: '300'},
            headerStyle: {backgroundColor: "#2196F3", height: 45},
            tabBarIcon: () => {
                return <Icon
                    name='home'
                    size={24}
                    type='MaterialIcons'
                    color="#2196F3"
                    iconStyle={{paddingBottom: 23}}
                />
            }
        },
    });


const RecipesTab = StackNavigator({
    Recipes: {
        screen: Recipes,
        // navigationOptions: {
        //     title: 'Opskrifter',
        // },
    },
    Recipe: {
        screen: Recipe,
        navigationOptions: {
            title: 'Opskrift',
            tabBarVisible: false,
            swipeEnabled: false,
            // headerTitleStyle: {
            //     fontFamily: 'fira'
            // }
        }
    },
}, {
    navigationOptions: {
        headerTintColor: '#f0f0f0',
        headerTitleStyle: {fontFamily: 'fira-bold', fontWeight: '300'},
        headerStyle: {backgroundColor: "#2196F3", height: 45},
        tabBarIcon: () => {
            return <Icon
                name='local-dining'
                size={24}
                type='MaterialIcons'
                color="#2196F3"
                iconStyle={{paddingBottom: 23}}
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


const MyApp = TabNavigator({
    Home: {screen: Start},
    Recipes: {screen: RecipesTab},
    // Test: {screen: TestTab},
}, {
    tabBarPosition: 'bottom',
    animationEnabled: true,
    // indicatorStyle: {backgroundColor: "red"},
    tabBarOptions: {
        showIcon: true,
        showLabel: false,
        activeTintColor: 'black',
        inactiveTintColor: '#c6c6c6',
        iconStyle: {
            width: 35,
            height: 40
        },
        style: {
            backgroundColor: 'white',
            height: 40,
        },
        indicatorStyle: {
            height: .1,
            backgroundColor: '#c6c6c6',
        },
    },
});


export default class App extends React.Component {

    state = {
        token: null,
        loading: true,
        fbUser: null,
        search: "",
        fontLoading: true,
    }

    getUser = async () => {
        return await (await fetch('https://vetterlain.dk/FridgeBook/api/user/' + this.state.fbUser.id)).json()
    }

    componentDidMount() {
        Font.loadAsync({
            'fira': require('./assets/fonts/FiraSans-Regular.ttf'),
            'fira-bold': require('./assets/fonts/FiraSans-Bold.ttf'),
        }).then(() => {
            this.setState({fontLoading: false})
        })
    }

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

    setSearch = (text) => {
        this.setState({search: text});
    }

    getSearch = () => {
        return this.state.search;
        // this.setState({search: ''});
        // return text;
    }


    render() {
        StatusBar.setBarStyle('light-content', true);
        if (this.state.loading || this.state.fontLoading) {
            return (
                <View style={{flex: 1, justifyContent: 'center'}}>
                    <ActivityIndicator size={100} color="#2196F3"/>
                </View>
            )
        }
        return (
            <MyApp screenProps={{
                getUser: this.getUser,
                fbUser: this.state.fbUser,
                fetchFromFacebook: this.fetchFromFacebook,
                setSearch: this.setSearch,
                getSearch: this.getSearch,
            }}/>
        )
    }


}