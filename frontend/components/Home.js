import React from 'react'
import {Avatar, Icon, List, ListItem, Text} from "react-native-elements";
import {RefreshControl, ScrollView, TouchableOpacity, View, StyleSheet, Image, Alert, ActivityIndicator} from "react-native";
import AddComestible from "./AddComestible";
import {AppLoading, Asset, BarCodeScanner, Permissions} from "expo";
import {getUser, fetchUser} from "../js/UserStore";

class Home extends React.Component {
    //Dette ikon kan bruges til at slette varer (comestibles)
    // <Icon name="delete" size={30} />

    static navigationOptions = ({navigation}) => ({
        title: 'Fridgebook',

    });

    state = {
        refreshing: false,
        user: {},
        deleteVisible: false,
        barcode: false
    }

    componentWillMount() {
        this.updateUserInState();
    };

    updateUserInState = () => {
        this.props.screenProps.getUser()
            .then(user => this.setState({user}));
    }

    onRefresh = () => {
        this.props.screenProps.getUser()
            .then(user => this.setState({user, refreshing: false}));
    }

    handleBarCodeRead = ({type, data}) => {
        this.setState({barcode: false})
        this.props.navigation.navigate('AddComestible', {data: data});
    }

    renderBarcodeScanner = () => {
        Permissions.askAsync(Permissions.CAMERA)
            .then(permission => {
                if (permission === null) {
                    console.log("waiting for permission")
                } else if (permission === false) {
                    console.log("no permission")
                } else {
                    this.setState({barcode: true})
                }
            })
    }

    render() {
        if (Object.keys(this.state.user).length === 0) {
            return (
                <View style={{flex: 1, justifyContent: 'center'}}>
                    <ActivityIndicator size={100} color="#0000ff"/>
                </View>
            )
        }

        if (this.state.barcode) {
            return (
                <View style={{flex: 1}}>
                    <BarCodeScanner
                        onBarCodeRead={this.handleBarCodeRead}
                        style={StyleSheet.absoluteFill}
                    />
                </View>
            )
        }

        return (
            <View style={{flex: 1, backgroundColor: "#ffffff"}}>
                <ScrollView
                    refreshControl={
                        <RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh}/>
                    }>
                    <List>{
                        this.state.user.comestibles.map((comestible, index) => (
                            <ListItem
                                key={index}
                                title={comestible.ingredient.name}
                                badge={{
                                    value: comestible.amount,
                                    textStyle: {color: 'white'},
                                    containerStyle: {marginTop: 0, backgroundColor: '#3b9bff'}
                                }}
                                avatar={<Avatar
                                    rounded
                                    source={{uri: 'https://vetterlain.dk/images/fridgebook/thumb' + comestible.ingredient.imagePath}}
                                    title={comestible.ingredient.name}

                                />}
                                subtitle={<Text> Udløber den: {comestible.expiryDate}</Text>}
                                onPress={() =>
                                    this.props.navigation.navigate('Comestible', {
                                        comestible: comestible,
                                         onBack: this.updateUserInState
                                    })}
                                onLongPress={() => this.setState({deleteVisible: true})}
                            />
                        ))
                    }
                    </List>
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
                            {text: 'Scan stregkode', onPress: () => this.renderBarcodeScanner()},
                            {
                                text: 'Tast selv',
                                onPress: () => this.props.navigation.navigate('AddComestible'),
                                onBack: this.updateUserInState
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