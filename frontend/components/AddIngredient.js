import React from 'react';
import { TextInput, View, StyleSheet, TouchableOpacity } from "react-native";
import {Button, Text} from "react-native-elements";
import {ImagePicker} from "expo";

class AddIngredient extends React.Component {
    state = {
        ingredient: {},
        ingredients: [],
        image:{},
    };

    componentDidMount() {
        this.getIngredients();
    };

    takePicture = async () => {
        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 4],
            quality:0.1
        });
        if (result.cancelled) {
            return;
        }
        this.setState({image: result},()=>{this.uploadPicture()})
    }

//
    // setImageInState = () => {
    //     this.setState({name: this.state.image.uri.split('/').pop()})
    // }

    uploadPicture = () => {
        console.log("uploading image")
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
        this.setState({ ingredients });
    }

    addIngredient = async () => {
        const ingredient = {
            name: this.state.ingredient.name,
            imagePath: 'fridgebook/' + this.state.image.uri.split('/').pop()
        }
        const options = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(ingredient)
        }

        const res = await fetch('https:/vetterlain.dk/FridgeBook/api/ingredient', options).then(()=>{
            this.props.navigation.goBack();
        });
        console.log(res);
    }

    render() {
        return (
            <View style={{ padding: 10 }}>
                <TextInput
                    style={{ height: 40 }}
                    placeholder="Navn på vare"
                    value={this.state.name}
                    onChangeText={text => this.setState({ ingredient: { ...this.state.ingredient, name: text } })}
                />
                <Button
                    title="TAG ET BILLEDE!!!!!!!!!!!"
                    onPress={this.takePicture}/>
                {/*<Text>{this.state.image?this.state.image.uri.split('/').pop():""}</Text>*/}


                <TouchableOpacity onPress={this.addIngredient}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Tilføj</Text>
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