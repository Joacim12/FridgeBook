import React from 'react'
import { Button, Icon, List, ListItem, Text } from "react-native-elements";
import { RefreshControl, ScrollView, TouchableOpacity, View, StyleSheet } from "react-native";
import AddComestible from "./AddComestible";

class Home extends React.Component {

    state = {
        refreshing: false,
        user: {},
        loading: true
    }

    componentDidMount = () => {
        fetch('https://vetterlain.dk/FridgeBook/api/user/gustav')
            .then(response => response.json())
            .then(user => this.setState({ user: user, loading: false }))
            .catch(error => console.log("Couldn't fetch user!!!"))
    };


    onRefresh = () => {
        // Not much happening here! Should probably fetch new data :-)
        this.setState({ refreshing: false });
    }



    render(navigation) {
        console.log(navigation)
        if (this.state.loading) {
            return (
                <View>
                    <Text>Loading</Text>
                </View>
            )
        }

        return (
            <View style={{ flex: 1, backgroundColor:"#ffffff" }}>
                <ScrollView
                    refreshControl={
                        <RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh} />
                    }>
                    <List>{
                        this.state.user.comestibles.map((comestible, index) => (
                            <ListItem
                                key={index}
                                title={comestible.ingredient.name}
                                leftIcon={{ name: comestible.ingredient.imagePath }}
                                onPress={() => this.props.navigation.navigate('Comestible',{comestible:comestible})}
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
                    onPress={() => this.props.navigation.navigate('AddComestible',{user:this.state.user})}
                >
                    <Icon name={"add"} size={30} color="#fff" />
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

// <View style={{
//     position: 'absolute',
//         left:'70%',
//         top:'100%',
//         right: 0,
//         bottom: 0,
// }}>
// <TouchableOpacity
// style={{
//     borderWidth: 1,
//         borderColor: 'rgba(0,0,0,0.2)',
//         alignItems: 'center',
//         justifyContent: 'center',
//         width: 70,
//         height: 70,
//         backgroundColor: 'red',
//         borderRadius: 100,
//
// }}
// >
// <Icon name={"add"} size={30} color="#fff"/>
//     </TouchableOpacity>

// <Icon
// style={{
//     position: 'absolute',
//         left: '50%',
//         top: '50%',
//         right: 40,
//         bottom: 20,
// }}
// raised
// name='ship'
// type='font-awesome'
// color='#f50'
// size={35}
// onPress={() => console.log('hello')}
//
// />