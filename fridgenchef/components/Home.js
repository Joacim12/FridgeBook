import React from 'react'
import {Avatar, Button} from "react-native-elements";
import {RefreshControl, ScrollView, TouchableOpacity, View, ActivityIndicator, FlatList, Text, Image, StyleSheet, Modal} from "react-native";
import AddComestible from "./AddComestible";
import Login from "./Login";
import {NavigationActions} from "react-navigation";
import {Permissions} from "expo";
import Card from "./Card";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

class Home extends React.Component {

    static navigationOptions = ({navigation, screenProps}) => {
        const params = navigation.state.params || {};
        return {
            headerLeft: params.headerLeft,
            headerRight: params.headerRight,
        }
    }

    state = {
        refreshing: false,
        user: {},
        deleteVisible: false,
        barcode: false,
        modalVisible: false,
        refresh: false,
    }

    _setNavigationParams() {
        let headerLeft =
            <View style={{flex: 1, flexDirection: 'row'}}>
                <Image source={require('../assets/icon.png')} style={{width: 25, height: 25, padding: 20, paddingRight: -40}}/>
                <Text style={{paddingTop: 10, fontSize: 18, color: '#f0f0f0', fontFamily: 'fira-bold'}}>Fridge'N'Chef</Text>
            </View>
        let headerRight =
            <View style={{flexDirection: 'row'}}>
                <View style={{paddingTop: 18}}>
                    <Icon
                        name={"sort-variant"}
                        size={24}
                        color="#B8B8B8"
                        onPress={() => {
                            this.openModal()
                        }}
                    />
                </View>
                <Avatar
                    rounded
                    containerStyle={{margin: 15}}
                    source={{uri: this.props.screenProps.fbUser.picture.data.url}}
                    onPress={() => this.props.navigation.navigate('User')}
                />
            </View>

        this.props.navigation.setParams({
            // title,
            headerLeft,
            headerRight,

        });
    }

    openModal() {
        this.setState({modalVisible: true});
    }

    closeModal() {
        this.setState({modalVisible: false});
    }


    sortComestibles = () => {
        let comestibles = this.state.user.comestibles;
        let dateAndComestible = [];
        comestibles.forEach(comestible => {
            let str = comestible.expiryDate.split('/');
            let da = new Date(str[2], str[1], str[0]);
            dateAndComestible.push({"date": da, "comestible": comestible})
        })
        dateAndComestible.sort((a, b) => {
            return a.date - b.date;
        })

        let finalArray = [];
        dateAndComestible.forEach(comestible => {
            finalArray.push(comestible.comestible)
        })

        let user = this.state.user;
        user.comestibles = finalArray;
        this.setState({user})
    }

    sortAlphabetic = () => {
        let sortedComestibles = this.state.user.comestibles;
        sortedComestibles.sort((a, b) => {
            a.sorted = true;
            b.sorted = true;
            return a.ingredient.name.localeCompare(b.ingredient.name)
        })
        let user = this.state.user;
        user.comestibles = sortedComestibles;
        this.setState({user, refresh: !this.state.refresh}, () => this.renderIngredients())
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
            .then(user => this.setState({user}, () => this.sortAlphabetic()));
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
                extraData={this.state.refresh}
                renderItem={this.renderItem}
                keyExtractor={this.keyExtractor}
            />
        )
    }

    keyExtractor = (item, index) => item.id;

    info = (comestible) => {
        this.props.navigation.navigate('Comestible', {comestible: comestible, onBack: this.updateUserInState})
    }

    renderItem = ({item, index}) => {
        return <Card comestible={item} search={this.search} info={this.info} updateUser={this.updateUserInState}/>
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
        if (this.state.user.comestibles.length === 0) {
            return (
                <View style={{flex: 1, backgroundColor: 'white', justifyContent: 'center'}}>
                    <Text style={{textAlign: 'center',fontFamily:'fira'}}>Dit køleskab er tomt!</Text>
                    <Text style={{textAlign: 'center',fontFamily:'fira'}}>Tilføj en vare ved at scanne stregkoden eller indtaste manuelt</Text>
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
                                            // console.log("waiting for permission")
                                        } else if (permission === false) {
                                            // console.log("no permission")
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
                <Modal
                    transparent={true}
                    visible={this.state.modalVisible}
                    animationType={'fade'}
                    onRequestClose={() => this.closeModal()}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.innerContainer}>
                            <View style={{paddingBottom: 35, marginLeft: 120}}>
                                <Icon name={"close"} size={50} color="#fff" onPress={() => this.closeModal()}/>
                            </View>
                            <Button
                                onPress={() => {
                                    this.sortComestibles();
                                    this.closeModal();
                                }
                                }
                                fontFamily={'fira'}
                                buttonStyle={{backgroundColor: "#2196F3"}}
                                title="Sorter efter dato"
                            />
                            <Text>{"\n"}</Text>
                            <Button
                                buttonStyle={{backgroundColor: "#2196F3"}}
                                fontFamily={'fira'}
                                onPress={() => {
                                    this.sortAlphabetic();
                                    this.closeModal();
                                }}
                                title="Sorter alfabetisk"
                            />
                        </View>
                    </View>
                </Modal>
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
                                        // console.log("waiting for permission")
                                    } else if (permission === false) {
                                        // console.log("no permission")
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
    },
    modalContainer: {
        backgroundColor: 'rgba(0,0,0,0.2)',
        flex: 1,
        justifyContent: 'center',
        // backgroundColor: 'grey',
    },
    innerContainer: {
        borderRadius: 1,
        borderColor: 'red',
        alignItems: 'center',
    },
});

export default Home;