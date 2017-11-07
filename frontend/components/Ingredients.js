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
                }, () => console.log())
            )
            .catch(error => console.log("Couldn't fetch user!!!"))


    };

    renderItem = () => {
        let wtf = [];
        this.state.comestibles.map(comestible => {
            wtf.push({
                key: comestible.id,
                ingredient: comestible.ingredient
            });
        })
        console.log(wtf);
        return wtf;
    }

    lol() {
        console.log("e")
    }


    render() {


        const list = [
            {
                title: 'Appointments',
                icon: 'av-timer'
            },
            {
                title: 'Trips',
                icon: 'flight-takeoff'
            }, {
                title: 'Appointments',
                icon: 'av-timer'
            },
            {
                title: 'Trips',
                icon: 'flight-takeoff'
            }, {
                title: 'Appointments',
                icon: 'av-timer'
            },
            {
                title: 'Trips',
                icon: 'flight-takeoff'
            }, {
                title: 'Appointments',
                icon: 'av-timer'
            },
            {
                title: 'Trips',
                icon: 'flight-takeoff'
            }, {
                title: 'Appointments',
                icon: 'av-timer'
            },
            {
                title: 'Trips',
                icon: 'flight-takeoff'
            }, {
                title: 'Appointments',
                icon: 'av-timer'
            },

        ]

        return (
            <List>{
                list.map((item, index) => (
                    <ListItem
                        key={index}
                        title={item.title}
                        leftIcon={{name: item.icon}}
                    />
                ))
            }
            </List>
        );
    }
}

const styles = StyleSheet.create({
//     container: {
//         flex: 8,
//     },
})

export default Home