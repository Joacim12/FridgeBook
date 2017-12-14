import React from 'react'
import { Avatar, Icon, List, ListItem, Text } from "react-native-elements";
import { RefreshControl, ScrollView, TouchableOpacity, View, StyleSheet, Image, Alert } from "react-native";
import AddComestible from "./AddComestible";
import { AppLoading, Asset, BarCodeScanner, Permissions } from "expo";

class Home extends React.Component {
    //Dette ikon kan bruges til at slette varer (comestibles)
    // <Icon name="delete" size={30} />

    static navigationOptions = ({ navigation }) => (
        {
            title: 'Fridgebook',
            tabBarLabel: 'Varer',
        });

    state = {
        refreshing: false,
        user: {},
        deleteVisible: false,
        barcode: false
    }

    componentWillMount() {
        this.setState({ user: this.props.screenProps.user });
    };

    onRefresh = () => {
        // Not much happening here! Should probably fetch new data :-)
        this.setState({ refreshing: false });
    }

    handleBarCodeRead = ({ type, data }) => {
        this.setState({ barcode: false })
        this.props.navigation.navigate('AddComestible', { data: data });
    }

    renderBarcodeScanner = () => {
        Permissions.askAsync(Permissions.CAMERA)
            .then(permission => {
                if (permission === null) {
                    console.log("waiting for permission")
                } else if (permission === false) {
                    console.log("no permission")
                } else {
                    this.setState({ barcode: true })
                }
            })
    }

    render() {
        if (this.state.barcode) {
            return (
                <View style={{ flex: 1 }}>
                    <BarCodeScanner
                        onBarCodeRead={this.handleBarCodeRead}
                        style={StyleSheet.absoluteFill}
                    />
                </View>
            )
        }

        return (
            <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
                <ScrollView
                    refreshControl={
                        <RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh} />
                    }>
                    <List>{
                        this.state.user.comestibles.map((comestible, index) => (
                            <ListItem
                                key={index}
                                title={comestible.ingredient.name}
                                badge={{
                                    value: comestible.amount,
                                    textStyle: { color: 'white' },
                                    containerStyle: { marginTop: 0, backgroundColor: '#3b9bff' }
                                }}
                                avatar={<Avatar
                                    source={{ uri: 'https://vetterlain.dk/images/' + comestible.ingredient.imagePath }}
                                    title={comestible.ingredient.name}
                                />}
                                subtitle={<Text> Udløber den: {comestible.expiryDate}</Text>}
                                onPress={() =>
                                    this.props.navigation.navigate('Comestible', {
                                        comestible: comestible,
                                        onBack: () => this.setState({ user: this.props.screenProps.user })
                                    })}
                                onLongPress={() => this.setState({ deleteVisible: true })}
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
                            { text: 'Scan stregkode', onPress: () => this.renderBarcodeScanner() },
                            {
                                text: 'Tast selv',
                                onPress: () => this.props.navigation.navigate('AddComestible', { onBack: () => this.setState({ user: this.props.screenProps.user }) })
                            },
                            { text: 'Annuller' },
                        ]
                    )}
                // onPress={() => this.props.navigation.navigate('AddComestible', { user: this.state.user })}
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