import React from 'react'
import { Button, Text, View, TouchableOpacity, StyleSheet, Alert, TextInput } from "react-native";
import { Divider } from "react-native-elements";
import DatePicker from 'react-native-datepicker';

class Comestible extends React.Component {
    state = {
        comestible: this.props.navigation.state.params.comestible
    }

    static navigationOptions = ({ navigation }) => ({
        tabBarLabel:'home',
    });

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
        console.log(res);
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
        return (
            <View>
                <Text>{this.state.comestible.ingredient.name}</Text>
                <Text>Tilføjet: {this.state.comestible.addedDate}</Text>
                <Text>Antal:</Text><TextInput
                    style={{ height: 40 }}
                    value={this.state.comestible.amount}
                    onChangeText={text => this.setState({ comestible: { ...this.state.comestible, amount: text } })}
                    placeholder="Antal"
                />
                <Text>Udløbsdato:</Text><DatePicker
                    style={{ width: 200 }}
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
                        },
                        dateInput: {
                            marginLeft: 36
                        }
                        // ... You can check the source to find the other keys.
                    }}
                    onDateChange={date => this.setState({ comestible: { ...this.state.comestible, expiryDate: date } })}
                />
                <Divider style={{ backgroundColor: 'gray' }} />
                <Text>Opskrifter med denne vare:</Text>
                <TouchableOpacity onPress={this.updateComestible}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Gem</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    Alert.alert(
                        'Slet ' + this.state.comestible.ingredient.name,
                        `Er du sikker på at du vil slette ${this.state.comestible.ingredient.name.toLowerCase()}? Handlingen kan ikke fortrydes`,
                        [{ text: 'Annullér' },
                        {
                            text: 'OK', onPress: () => {
                                this.deleteComestible(this.state.comestible.id);
                                this.props.navigation.navigate('Home');
                            }
                        }]
                    );
                }
                }>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Slet</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        margin: 3,
        alignItems: 'center',
        backgroundColor: 'red'
    },
    buttonText: {
        padding: 7,
        fontSize: 18,
        fontWeight: "bold",
        color: 'white'
    }
});

export default Comestible;