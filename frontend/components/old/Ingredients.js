import React from 'react';
import {FlatList, ListView, ScrollView, StyleSheet, Text, View} from 'react-native';
import {NativeRouter, Route, Link} from 'react-router-native'
import {List, ListItem, SearchBar} from "react-native-elements";

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
            <View>
                <SearchBar
                    placeholder={"Search!"}
                />
                <List>{
                    this.state.comestibles.map((item, index) => (
                        <ListItem
                            key={index}
                            title={item.ingredient.name}
                            leftIcon={{name: 'flight-takeoff'}}
                            onPress={()=>console.log("YOO")}
                        />

                    ))

                }
                </List>

                <Text>HEY</Text>
            </View>
        );
    }
}

export default Home