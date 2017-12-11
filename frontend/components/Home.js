import React from 'react'
import {Avatar, Icon, List, ListItem, Text} from "react-native-elements";
import {RefreshControl, ScrollView, TouchableOpacity, View, StyleSheet, Image} from "react-native";
import AddComestible from "./AddComestible";
import {AppLoading, Asset} from "expo";

class Home extends React.Component {
    static navigationOptions = {
        //Dette ikon kan bruges til at slette varer (comestibles)
        // <Icon name="delete" size={30} />
    };

    state = {
        refreshing: false,
        user: {},
        loading: true,
        deleteVisible: false
    }

    componentDidMount() {
        this.getUser();
    };


    getUser = async () => {
        const user = await (await fetch('https://vetterlain.dk/FridgeBook/api/user/gustav')).json();
        this.setState({user, loading: false});
    }


    onRefresh = () => {
        // Not much happening here! Should probably fetch new data :-)
        this.setState({refreshing: false});
    }

    deleteComestible = async (id) => {
        const options = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "DELETE"
        }

        const res = await fetch('https://vetterlain.dk/FridgeBook/api/comestible/' + id, options);
        console.log(res);
    }


    render() {
        if (this.state.loading) {
            return (
                <View>
                    <Text>Loading</Text>
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
                                    source={{uri: 'https://vetterlain.dk/images/' + comestible.ingredient.imagePath}}
                                    title={comestible.ingredient.name}
                                />}
                                subtitle={<Text> Udløber den: {comestible.expiryDate}</Text>}
                                onPress={() => this.props.navigation.navigate('Comestible', {comestible: comestible})}
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
                    onPress={() => this.props.navigation.navigate('AddComestible', {user: this.state.user})}
                >
                    <Icon name={"add"} size={30} color="#fff"/>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        margin: 3,
        alignItems: 'center',
        backgroundColor: '#2196F3'
    },
    buttonText: {
        padding: 7,
        fontSize: 18,
        fontWeight: "bold",
        color: 'white'
    }
});

export default Home;