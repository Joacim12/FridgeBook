import React from 'react'
import {FormLabel, FormInput, FormValidationMessage, SearchBar} from 'react-native-elements'
import {View} from "react-native";

class AddIngredient extends React.Component {

    state = {
        name: "",
        expiryDate: 0
    }


    handleName = (name) => {
        this.setState({name: name})
    }

    handleDate = (date) => {
        this.setState({expiryDate: date})
    }

    render() {
        return (
            <View>
                <FormLabel>Name</FormLabel>
                <FormInput onChangeText={this.handleName}/>
                <FormLabel>Expires in? (days)</FormLabel>
                <FormInput onChangeText={this.handleDate} keyboardType={'numeric'}/>
            </View>
        );
    }
}

export default AddIngredient