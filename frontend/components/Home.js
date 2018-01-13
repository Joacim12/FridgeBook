import React from 'react'
import {Avatar, Icon} from "react-native-elements";
import {RefreshControl, ScrollView, TouchableOpacity, View, Alert, ActivityIndicator, FlatList, Text} from "react-native";
import AddComestible from "./AddComestible";
import Login from "./Login";
import {NavigationActions} from "react-navigation";
import {Permissions} from "expo";
import Card from "./Card";

const users = [
    {
        name: 'brynn',
        avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg'
    },
]

class Home extends React.Component {

    static navigationOptions = ({navigation, screenProps}) => {
        const params = navigation.state.params || {};
        return {
            title: params.title,
            // headerLeft:  params.headerLeft,
            headerRight: params.headerRight,
        }
    }

    state = {
        refreshing: false,
        user: {},
        deleteVisible: false,
        barcode: false
    }

    _setNavigationParams() {
        let title = 'FridgeBook';
        // let headerLeft  = <Button onPress={console.log("1")} />;

        let headerRight = <Avatar
            rounded
            containerStyle={{margin: 15}}
            source={{uri: this.props.screenProps.fbUser.picture.data.url}}
            onPress={() => this.props.navigation.navigate('User')}
        />;


        this.props.navigation.setParams({
            title,
            // headerLeft,
            headerRight,

        });
    }

    componentWillMount() {
        if (this.props.screenProps.fbUser !== null) {
            this.updateUserInState();
            this._setNavigationParams();
        } else {
            const resetAction = NavigationActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({routeName: 'Login'})
                ]
            })
            this.props.navigation.dispatch(resetAction)
        }
    };

    updateUserInState = () => {
        this.props.screenProps.getUser()
            .then(user => this.setState({user}));
    }

    onRefresh = () => {
        this.props.screenProps.getUser()
            .then(user => this.setState({user, refreshing: false}));
    }

    renderIngredients = () => {
        return (
            <FlatList
                numColumns={2}
                data={this.state.user.comestibles}
                renderItem={this.renderItem}
                keyExtractor={this.keyExtractor}
            />
        )
    }

    keyExtractor = (item,index) => item.id;

    renderItem({item, index}) {
        return <Card comestible={item}/>
    }


    render() {
        if (Object.keys(this.state.user).length === 0) {
            return (
                <View style={{flex: 1, justifyContent: 'center'}}>
                    <ActivityIndicator size={100} color="#0000ff"/>
                </View>
            )
        }
        return (
            <View style={{flex: 1, backgroundColor: "#ffffff"}}>
                <ScrollView
                    refreshControl={
                        <RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh}/>
                    }>
                    {this.renderIngredients()}
                </ScrollView>
                <TouchableOpacity
                    style={{
                        borderWidth: 1,
                        borderColor: 'rgba(0,0,0,0.2)',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 70,
                        height: 70,
                        backgroundColor: '#3b9bff',
                        borderRadius: 100,
                        position: 'absolute',
                        right: '10%',
                        bottom: '5%',
                    }}
                    onPress={() => Alert.alert('Opret vare', 'Vælg en metode til at oprette din vare',
                        [
                            {
                                text: 'Scan stregkode', onPress: () => {
                                    Permissions.askAsync(Permissions.CAMERA)
                                        .then(permission => {
                                            if (permission === null) {
                                                console.log("waiting for permission")
                                            } else if (permission === false) {
                                                console.log("no permission")
                                            } else {
                                                this.props.navigation.navigate('Barcode', {onBack: this.updateUserInState})
                                            }
                                        })
                                },
                            },
                            {
                                text: 'Tast selv',
                                onPress: () => {
                                    console.log("pres")
                                    this.props.navigation.navigate('AddComestible', {
                                        onBack: this.updateUserInState, setBack: () => {
                                        }
                                    })
                                }
                            },
                            {text: 'Annuller'}
                        ]
                    )}
                >
                    <Icon name={"add"} size={30} color="#fff"/>
                </TouchableOpacity>
            </View>
        );
    }
}


export default Home;