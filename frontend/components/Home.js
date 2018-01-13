import React from 'react'
import {Avatar} from "react-native-elements";
import {RefreshControl, ScrollView, TouchableOpacity, View, ActivityIndicator, FlatList, Text} from "react-native";
import AddComestible from "./AddComestible";
import Login from "./Login";
import {NavigationActions} from "react-navigation";
import {Permissions} from "expo";
import Card from "./Card";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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

    keyExtractor = (item, index) => item.id;

    renderItem = ({item, index}) => {
        return <Card comestible={item} search={this.search} updateUser={this.updateUserInState}/>
    }

    search = (name) => {
        this.props.screenProps.setSearch(name);
        this.props.navigation.navigate('Recipes');
    }



    render() {
        if (Object.keys(this.state.user).length === 0) {
            return (
                <View style={{flex: 1, justifyContent: 'center'}}>
                    <ActivityIndicator size={100} color="#2196F3"/>
                </View>
            )
        }
        if(this.state.user.comestibles.length===0){
            return(
                <View style={{flex:1,backgroundColor:'white',justifyContent:'center'}}>
                    <Text style={{textAlign:'center'}}>Her er tomt</Text>
                    <TouchableOpacity
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 70,
                            height: 70,
                            backgroundColor: '#ff5613',
                            borderRadius: 100,
                            position: 'absolute',
                            right: '6%',
                            bottom: '15%',
                            elevation: 5
                        }}
                        onPress={
                            () => {
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
                            }}
                    >
                        <Icon name={"barcode-scan"} size={30} color="#fff"/>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 70,
                            height: 70,
                            backgroundColor: '#ff5613',
                            borderRadius: 100,
                            position: 'absolute',
                            right: '6%',
                            bottom: '2%',
                            elevation: 5
                        }}
                        onPress={() => {
                            this.props.navigation.navigate('AddComestible', {
                                onBack: this.updateUserInState, setBack: () => {
                                }
                            })
                        }}
                    >
                        <Icon name={"plus"} size={30} color="#fff"/>
                    </TouchableOpacity>
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
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 70,
                        height: 70,
                        backgroundColor: '#ff5613',
                        borderRadius: 100,
                        position: 'absolute',
                        right: '6%',
                        bottom: '15%',
                        elevation: 5
                    }}
                    onPress={
                        () => {
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
                        }}
                >
                    <Icon name={"barcode-scan"} size={30} color="#fff"/>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 70,
                        height: 70,
                        backgroundColor: '#ff5613',
                        borderRadius: 100,
                        position: 'absolute',
                        right: '6%',
                        bottom: '2%',
                        elevation: 5
                    }}
                    onPress={() => {
                        this.props.navigation.navigate('AddComestible', {
                            onBack: this.updateUserInState, setBack: () => {
                            }
                        })
                    }}
                >
                    <Icon name={"plus"} size={30} color="#fff"/>
                </TouchableOpacity>

            </View>
        );
    }
}


export default Home;