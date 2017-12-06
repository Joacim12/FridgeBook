import React from 'react';
import { Button, Text, TextInput, View, StyleSheet, TouchableOpacity } from "react-native";
import DatePicker from 'react-native-datepicker';
import Autocomplete from 'react-native-autocomplete-input';

class AddComestible extends React.Component {
    state = {
        name: '',
        amount: '',
        date: ''
    };

    static navigationOptions = ({ navigation }) => ({
        headerRight: <Button
            title="hej"
            onPress={() => console.log("clicked")}
        />
    });

    // componentDidMount() {
    //     fetch('https://vetterlain.dk/FridgeBook/api/user/gustav')
    //         .then(response => response.json())
    //         .then(res =>
    //             this.setState({
    //                 username: res.username,
    //                 comestibles: res.comestibles
    //             })
    //         )
    //         .catch(error => console.log("Couldn't fetch user!!!"))
    // };

    render() {
        getIngredients = async () => {
            const ingredients = await (await fetch('https://vetterlain.dk/FridgeBook/api/ingredient')).json();
            const names = ingredients.map(ingredient => ingredient.name);
            return names;
        }

        addComestible = async () => {
            const options = {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({ expiryDate: this.state.date, amount: this.state.amount, ingredient: { name: this.state.name, imagePath: "hejImage" } })
            }

            const res = await fetch('https://vetterlain.dk/FridgeBook/api/comestible', options);
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

        return (
            <View style={{ padding: 10 }}>
                <Text style={{ padding: 10, fontSize: 42 }}>Tilføj ny vare</Text>
                <TextInput
                    style={{ height: 40 }}
                    placeholder="Navn på vare"
                    onChangeText={async (input) => {
                        const names = await getIngredients();
                        const ingredientsContainingInput = names.filter(name => name.toUpperCase().substring(0, input.length) === input.toUpperCase());
                        console.log(ingredientsContainingInput);
                        this.setState({ name: input })
                    }}
                />
                <TextInput
                    style={{ height: 40 }}
                    placeholder="Antal"
                    keyboardType="numeric"
                    onChangeText={(amount) => this.setState({ amount })}
                />
                <DatePicker
                    style={{ width: 200 }}
                    date={this.state.date}
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
                    onDateChange={(date) => { this.setState({ date: date }) }}
                />
                <TouchableOpacity onPress={() => deleteComestible("11")}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Tilføj</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F5FCFF',
        flex: 1,
        paddingTop: 25
    },
    autocompleteContainer: {
        flex: 1,
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0,
        zIndex: 1
    },
    itemText: {
        fontSize: 15,
        margin: 2
    },
    descriptionContainer: {
        // `backgroundColor` needs to be set otherwise the
        // autocomplete input will disappear on text input.
        backgroundColor: '#F5FCFF',
        marginTop: 25
    },
    infoText: {
        textAlign: 'center'
    },
    titleText: {
        fontSize: 18,
        fontWeight: '500',
        marginBottom: 10,
        marginTop: 10,
        textAlign: 'center'
    },
    directorText: {
        color: 'grey',
        fontSize: 12,
        marginBottom: 10,
        textAlign: 'center'
    },
    openingText: {
        textAlign: 'center'
    },
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

export default AddComestible