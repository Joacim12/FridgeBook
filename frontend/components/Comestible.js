import React from 'react'
import {ScrollView, View, StyleSheet, Alert, Image, FlatList, KeyboardAvoidingView} from "react-native";
import {Button, FormInput, FormLabel, Text} from "react-native-elements";
import DatePicker from 'react-native-datepicker';
import Dimensions from 'Dimensions';

class Comestible extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: navigation.state.params.comestible.ingredient.name,
        tabBarLabel: 'Varer',
        tabBarVisible: false
    });

    state = {
        comestible: this.props.navigation.state.params.comestible,
        width: 100, height: 100
    }

    updateComestible = async () => {
        const options = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "PUT",
            body: JSON.stringify(this.state.comestible)
        }

        const res = await fetch('https://vetterlain.dk/FridgeBook/api/comestible/', options);
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
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <KeyboardAvoidingView behavior={'position'}>
                <View style={styles.upperContainer}>
                    <Image style={{flex: 1, width: Dimensions.get('window').width, height: Dimensions.get('window').height/2}}
                           source={{uri: "https://vetterlain.dk/images/fridgebook/" + this.state.comestible.ingredient.imagePath}}/>
                    <View style={styles.buttomContainer}>
                        <FormLabel>Mængde:</FormLabel><FormInput
                        style={{height: 40}}
                        value={this.state.comestible.amount}
                        onChangeText={text => this.setState({comestible: {...this.state.comestible, amount: text}})}
                        placeholder="Mængde"
                    />
                        <View style={styles.buttonContainer}>
                            <DatePicker
                                style={{width: 200}}
                                date={this.state.comestible.expiryDate}
                                value={this.state.comestible.expiryDate}
                                mode="date"
                                placeholder="Vælg udløbsdato"
                                format="DD/MM/YYYY"
                                minDate="01-05-2017"
                                maxDate="10-06-2020"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                customStyles={{
                                    dateIcon: {
                                        position: 'absolute',
                                        left: 0,
                                        top: 4,
                                        marginLeft: 0
                                    }
                                }}
                                onDateChange={date => this.setState({comestible: {...this.state.comestible, expiryDate: date}})}
                            />
                        </View>
                        <Text>{"\n"}</Text>
                        <View style={styles.buttonContainer}>
                            <Button title="OK" backgroundColor="#3B9BFF" onPress={() => this.updateComestible()
                                .then(() => this.props.navigation.state.params.onBack())
                                .then(() => this.props.navigation.goBack())}/>
                            <Text>{"\n"}</Text>
                            <Button title="Slet" backgroundColor="#ff0000" onPress={() => {
                                Alert.alert(
                                    'Slet ' + this.state.comestible.ingredient.name,
                                    `Er du sikker på at du vil slette ${this.state.comestible.ingredient.name.toLowerCase()}? Handlingen kan ikke fortrydes`,
                                    [{text: 'Annuller'},
                                        {
                                            text: 'OK', onPress: () => {
                                                this.deleteComestible(this.state.comestible.id)
                                                    .then(() => this.props.navigation.state.params.onBack())
                                                    .then(() => this.props.navigation.goBack())
                                            }
                                        }]
                                );
                            }
                            }
                            />
                        </View>
                    </View>
                </View>
                </KeyboardAvoidingView>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff"
    },
    upperContainer: {
        flex: 1,

    },
    buttomContainer: {
        flex: 1,

    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    }
});

export default Comestible;