import React from 'react';
import {TextInput, View, StyleSheet, TouchableOpacity, Alert} from "react-native";
import {Button, Text} from "react-native-elements";
import {ImagePicker} from "expo";

class AddIngredient extends React.Component {
    state = {
        ingredient: {},
        ingredients: [],
        image: {},
        barcode: '',
    };

    componentDidMount() {
        this.getIngredients()
            .then(() => {
                if (this.props.navigation.state.params.barcode !== undefined) {
                    this.setState({barcode: this.props.navigation.state.params.barcode})
                }
            })
    };

    takePicture = async () => {
        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 4],
            quality: 0.5
        });
        if (result.cancelled) {
            return;
        }
        this.setState({image: result}, () => {
            this.uploadPicture()
        })
    }

    uploadPicture = () => {
        let localUri = this.state.image.uri;
        let filename = localUri.split('/').pop();
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;
        let formData = new FormData();
        formData.append('file', {uri: localUri, name: filename, type});
        return fetch("https://vetterlain.dk/FridgeBook/api/imageUpload", {
            method: 'POST',
            body: formData,
            header: {
                'content-type': 'multipart/form-data',
            },
        });
    }

    getIngredients = async () => {
        const ingredients = await (await fetch('https://vetterlain.dk/FridgeBook/api/ingredient')).json();
        this.setState({ingredients});
    }

    addIngredient = async () => {
        const ingredient = {
            name: this.state.ingredient.name,
            imagePath: 'fridgebook/' + this.state.image.uri.split('/').pop(),
            barcode: this.state.barcode
        }
        const options = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(ingredient)
        }

        const res = await fetch('https:/vetterlain.dk/FridgeBook/api/ingredient', options)
            .then(() => {
                this.props.navigation.state.params.fetchIngredients()
                    .then(() =>  this.props.navigation.goBack())
            });
        console.log(res);
    }

    render() {
        return (
            <View style={{padding: 10}}>
                <TextInput
                    style={{height: 40}}
                    placeholder="Navn på vare"
                    value={this.state.name}
                    onChangeText={text => this.setState({ingredient: {...this.state.ingredient, name: text}})}
                />
                <Button
                    title="Tag et billede"
                    onPress={this.takePicture}/>
                <Text>{"\n"}</Text>
                <Button onPress={() => {
                    if (this.state.ingredient.name === undefined) {
                        Alert.alert(
                            'Fejl i indtastning',
                            'Indtast venligst navn på den vare du ønsker at oprette'
                        );
                    } else {
                        this.addIngredient();
                    }
                }} title="OK"/>
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

export default AddIngredient;