import React from 'react';
import {RefreshControl, TextInput, View, StyleSheet, TouchableOpacity} from "react-native";
import {Button, Icon, List, ListItem, Text, FormInput, FormLabel} from "react-native-elements";
import DatePicker from 'react-native-datepicker';

class AddComestible extends React.Component {
    state = {
        name: "",
        amount: '',
        expiryDate: '',
        ingredient: "",
        ingredients: null,
        search: false,
        user: this.props.navigation.state.params.user,
    };


    componentDidMount() {
        this.getIngredients();
    };


    getIngredients = async () => {
        const ingredients = await (await fetch('https://vetterlain.dk/FridgeBook/api/ingredient')).json();
        this.setState({ingredients});
    }

    addComestible = async () => {
        let comestible = {
            expiryDate: this.state.expiryDate,
            amount: this.state.amount,
            ingredient: {
                name: this.state.ingredient.name,
                imagePath: this.state.ingredient.imagePath
            }
        }

        let user = this.state.user;
        user.comestibles.push(comestible);

        const options = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "PUT",
            body: JSON.stringify(user)
        }

        const res = await fetch('https:/vetterlain.dk/FridgeBook/api/user', options);
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

    setSearching = (text) => {
        this.setState({search: true, name: text})
    }

    pickIngredient = (ingredient) => {
        this.setState({
            search: false,
            name: ingredient.name,
            ingredient: ingredient
        })
    }


    render() {
        if (this.state.search) {
            let ingredientsContainingInput = this.state.ingredients.filter(ingredient =>
                ingredient.name.toUpperCase().substring(0, this.state.name.length) === this.state.name.toUpperCase()).slice(0,5);
            return (
                <View style={styles.container}>
                    <FormLabel>Vare</FormLabel>
                    <FormInput
                        value={this.state.name}
                        onChangeText={(text) => {
                            this.setState({name: text})
                        }}
                        placeholder="Navn på vare"
                    />
                    <List>{
                        ingredientsContainingInput.map((ingredient, index) => (
                            <ListItem
                                key={index}
                                title={ingredient.name}
                                hideChevron
                                leftIcon={{name: "assignment-return"}}
                                onPress={() => this.pickIngredient(ingredient)}
                            />
                        ))
                    }
                        <ListItem
                            title={"Opret ny vare"}
                            onPress={() => {
                                console.log("tilføj en vare")
                            }}

                        />
                    </List>
                </View>
            )
        }

        return (
            <View style={styles.container}>
                <FormLabel>Vare</FormLabel>
                <FormInput
                    value={this.state.name}
                    placeholder="Søg efter vare..."
                    onChangeText={(text) => {
                        this.setSearching(text);
                    }}
                />
                <FormLabel>Antal</FormLabel>
                <FormInput
                    keyboardType="numeric"
                    placeholder="Tast antal varer..."
                    onChangeText={(amount) => this.setState({amount})}
                />

                <DatePicker
                    style={{width: 200}}
                    date={this.state.expiryDate}
                    value={this.state.expiryDate}
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
                    onDateChange={(date) => {
                        this.setState({expiryDate: date})
                    }}
                />
                <Button
                    title='Tilføj'
                    onPress={this.addComestible}
                    backgroundColor={"#3B9BFF"}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff"
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