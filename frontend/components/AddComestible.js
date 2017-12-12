import React from 'react';
import { RefreshControl, TextInput, View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Button, Icon, List, ListItem, Text, FormInput, FormLabel, Avatar } from "react-native-elements";
import DatePicker from 'react-native-datepicker';

class AddComestible extends React.Component {
    state = {
        name: '',
        amount: '',
        expiryDate: '',
        ingredient: '',
        ingredients: null,
        search: false,
        user: this.props.navigation.state.params.user,
    };

    componentDidMount() {
        this.getIngredients()
            .then(() => {
                if (this.props.navigation.state.params.data !== undefined) {
                    let found = false;
                    this.state.ingredients.forEach(ingredient => {
                        if (ingredient.barcode === this.props.navigation.state.params.data) {
                            this.setState({ name: ingredient.name, ingredient })
                            found = true;
                        }
                    })
                    if (!found) {
                        this.props.navigation.navigate('AddIngredient', { barcode: this.props.navigation.state.params.data });
                    }
                }
            })
    };

    getIngredients = async () => {
        const ingredients = await (await fetch('https://vetterlain.dk/FridgeBook/api/ingredient')).json();
        this.setState({ ingredients });
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

        console.log(user);

        const res = await fetch('https:/vetterlain.dk/FridgeBook/api/user', options).then(() => {
            console.log(res);
            this.props.navigation.navigate('Home');
        });
    }

    setSearching = (text) => {
        this.setState({ search: true, name: text })
    }

    pickIngredient = (ingredient) => {
        this.setState({
            search: false,
            name: ingredient.name,
            ingredient: ingredient
        })
    }

    addIngredientNav = () => {
        this.props.navigation.navigate('AddIngredient')
    }

    render() {
        if (this.state.search) {
            let ingredientsContainingInput = this.state.ingredients.filter(ingredient =>
                ingredient.name.toUpperCase().substring(0, this.state.name.length) === this.state.name.toUpperCase()).slice(0, 5);
            return (
                <View style={styles.container}>
                    <FormLabel>Vare</FormLabel>
                    <FormInput
                        value={this.state.name}
                        onChangeText={(text) => {
                            this.setState({ name: text })
                        }}
                        placeholder="Navn på vare"
                    />
                    <List>{
                        ingredientsContainingInput.map((ingredient, index) => (
                            <ListItem
                                key={index}
                                title={ingredient.name}
                                avatar={<Avatar
                                    rounded
                                    source={{ uri: 'https://vetterlain.dk/images/' + ingredient.imagePath }}
                                    title={ingredient.name}
                                />}
                                hideChevron
                                onPress={() => this.pickIngredient(ingredient)}
                            />
                        ))
                    }
                        <ListItem
                            title={"Opret ny vare"}
                            onPress={() => {
                                this.addIngredientNav()
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
                    onChangeText={text => this.setSearching(text)}
                    onFocus={() => this.setState({ search: true })}
                />
                <FormLabel>Mængde</FormLabel>
                <FormInput
                    keyboardType="default"
                    placeholder="Tast antal varer eller mængde..."
                    onChangeText={amount => this.setState({ amount })}
                />
                <Text>{"\n"}</Text>
                <View style={styles.buttonContainer}>
                    <DatePicker
                        style={{ width: 200 }}
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
                            }
                        }}
                        onDateChange={(date) => {
                            this.setState({ expiryDate: date })
                        }}
                    />
                </View>
                <Text>{"\n"}</Text>
                <Button
                    title='OK'
                    onPress={() => {
                        if (this.state.name === '' || this.state.amount === '' || this.state.expiryDate === '') {
                            Alert.alert(
                                'Fejl i indtastning',
                                'Indtast venligst vare, mængde samt udløbsdato for at fortsætte'
                            );
                        } else {
                            this.addComestible();
                        }
                    }}
                    backgroundColor={"#3B9BFF"}
                    //HVAD ER DET HER???
                    onDateChange={date => this.setState({ expiryDate: date })}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff"
    }, buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    }
});

export default AddComestible;