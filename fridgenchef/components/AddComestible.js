import React from 'react';
import {RefreshControl, TextInput, View, StyleSheet, TouchableOpacity, Alert, ScrollView, KeyboardAvoidingView} from "react-native";
import {Button, Icon, List, ListItem, Text, FormInput, FormLabel, Avatar} from "react-native-elements";
import DatePicker from 'react-native-datepicker';
import {NavigationActions} from "react-navigation";

class AddComestible extends React.Component {


    state = {
        name: '',
        amount: '',
        expiryDate: '',
        ingredient: '',
        ingredients: null,
        search: false,
        user: {}
    };

    componentDidMount() {
        this.updateUserInState();
        this.fetchIngredients()
            .then(() => {
                if (this.props.navigation.state.params.data !== undefined) {
                    let found = false;
                    this.state.ingredients.forEach(ingredient => {
                        if (ingredient.barcode === this.props.navigation.state.params.data) {
                            this.setState({name: ingredient.name, ingredient})
                            found = true;
                        }
                    })
                    if (!found) {
                        this.navigateIngredient();
                    }
                }
            }).catch(err => {
            console.log(err);
        })
    };

    navigateIngredient = () => {
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({
                    routeName: 'AddIngredient',
                    params: {barcode: this.props.navigation.state.params.data, fetchIngredients: this.fetchIngredients}
                })
            ]
        })
        this.props.navigation.dispatch(resetAction)
    }

    updateUserInState = () => {
        this.props.screenProps.getUser()
            .then(user => this.setState({user}));
    }

    fetchIngredients = async () => {
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
            let ingredientsContainingInput = this.state.ingredients;
            if (this.state.name.length > 0) {
                ingredientsContainingInput = [];
                this.state.ingredients.forEach(ingredient => {
                        if (ingredient.name.toLowerCase().indexOf(this.state.name.toLowerCase()) > -1) {
                            ingredientsContainingInput.push(ingredient);
                        }
                    }
                )
            }
            return (
                <View style={styles.container}>
                    <FormLabel labelStyle={{fontFamily: 'fira', fontWeight: '300'}}>Vare</FormLabel>
                    <FormInput
                        inputStyle={{fontFamily: 'fira', fontWeight: '300'}}
                        value={this.state.name}
                        onChangeText={(text) => {
                            this.setState({name: text})
                        }}
                        placeholder="Navn på vare"
                    />
                    <ScrollView keyboardShouldPersistTaps={'always'}>
                        <List>{
                            ingredientsContainingInput.map((ingredient, index) => (
                                <ListItem
                                    key={index}
                                    fontFamily={'fira'}
                                    title={ingredient.name}
                                    avatar={<Avatar
                                        rounded
                                        source={{uri: 'https://vetterlain.dk/images/fridgebook/thumb/' + ingredient.imagePath}}
                                        title={ingredient.name}
                                    />}
                                    hideChevron
                                    onPress={() => this.pickIngredient(ingredient)}
                                />
                            ))
                        }
                            <ListItem
                                title={"Opret ny vare"}
                                fontFamily={'fira'}
                                onPress={() => this.navigateIngredient()}
                            />
                        </List>
                    </ScrollView>
                </View>
            )
        }

        return (
            <View style={styles.container}>
                <FormLabel labelStyle={{fontFamily: 'fira', fontWeight: '300'}}>Vare</FormLabel>
                <FormInput
                    inputStyle={{fontFamily: 'fira', fontWeight: '300'}}
                    value={this.state.name}
                    placeholder="Søg efter vare..."
                    onChangeText={text => this.setSearching(text)}
                    onFocus={() => this.setState({search: true})}
                />
                <FormLabel labelStyle={{fontFamily: 'fira', fontWeight: '300'}}>Mængde</FormLabel>
                <FormInput
                    inputStyle={{fontFamily: 'fira', fontWeight: '300'}}
                    keyboardType="default"
                    placeholder="Fx 5 tomater, 250g smør eller 1 liter mælk"
                    onChangeText={amount => this.setState({amount})}
                />
                <Text>{"\n"}</Text>
                <View style={styles.buttonContainer}>
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
                            }
                        }}
                        onDateChange={(date) => {
                            this.setState({expiryDate: date})
                        }}
                    />
                </View>
                <Text>{"\n"}</Text>
                <Button
                    fontFamily={'fira'}
                    title='OK'
                    onPress={() => {
                        if (this.state.name === '' || this.state.amount === '' || this.state.expiryDate === '') {
                            Alert.alert(
                                'Fejl i indtastning',
                                'Indtast venligst vare, mængde samt udløbsdato for at fortsætte'
                            );
                        } else {
                            this.addComestible()
                                .then(() => this.props.screenProps.getUser())
                                .then(() => this.props.navigation.state.params.onBack())
                                .then(() => this.props.navigation.state.params.setBack())
                                .then(() => this.props.navigation.goBack())
                        }
                    }
                    }
                    backgroundColor={"#3B9BFF"}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
    }, buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    }
});

export default AddComestible;