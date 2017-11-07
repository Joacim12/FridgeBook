import React from 'react';
import {FlatList, ListView, ScrollView, StyleSheet, Text, View} from 'react-native';
import {NativeRouter, Route, Link} from 'react-router-native'
import {Header, List, ListItem} from "react-native-elements";

class Home extends React.Component {

    state = {
        username: '',
        comestibles: [],
    }

    componentDidMount() {
        fetch('http://192.168.0.105:8084/FridgeBook/api/user/gustav')
            .then(response => response.json())
            .then(res =>
                this.setState({
                    username: res.username,
                    comestibles: res.comestibles
                })
            )
            .catch(error => console.log("Couldn't fetch user!!!"))
    };

    render() {
        return (
            <List>{
                this.state.comestibles.map((item, index) => (
                    <ListItem
                        key={index}
                        title={item.ingredient.name}
                        leftIcon={{name: 'flight-takeoff'}}
                    />
                ))
            }
            </List>
        );
    }
}

export default Home