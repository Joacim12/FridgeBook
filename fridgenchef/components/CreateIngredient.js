import React from 'react';
import {TextInput, View, StyleSheet, Alert, Image} from "react-native";
import {Button, Text} from "react-native-elements";
import {ImagePicker} from "expo";
import {NavigationActions} from "react-navigation";

class AddIngredient extends React.Component {
    state = {
        ingredient: {},
        image: {},
        barcode: '',
        res: null,
        imageTaken: false,
    };

    componentDidMount() {
        if (this.props.navigation.state.params !== undefined) {
            this.setState({barcode: this.props.navigation.state.params.barcode})
        }
    };

    goHome = () => {
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({routeName: 'Home'})
            ]
        })
        this.props.navigation.dispatch(resetAction)
    }

    takePicture = async () => {
        try {
            let result = await ImagePicker.launchCameraAsync({
                aspect: [5, 6],
                quality: 0.5
            });
            if (result.cancelled) {
                return;
            }
            this.setState({image: await result, imageTaken: true}, () => {
                this.uploadPicture()
            })
        } catch (err) {
            this.goHome();
            console.warn('couldn\'t start camera')
        }
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

    renderImage = () => {
        return (
            <Image style={{height: 200, width: 200}} source={{uri: this.state.image.uri}}/>
        )
    }

    addIngredient = async () => {
        const ingredient = {
            name: this.state.ingredient.name,
            imagePath: this.state.image.uri.split('/').pop(),
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

        fetch('https:/vetterlain.dk/FridgeBook/api/ingredient', options)
            .then(() => {
                Alert.alert('Oprettelse godkendt', 'Varen er hermed oprettet og kan nu tilføjes til dit køleskab');
                this.goHome();
            })
    }

    render() {
        return (
            <View style={{padding: 10}}>
                <Text style={{fontFamily: 'fira'}}>Denne vare findes ikke i vores system - du bedes venligst oprette den ved at angive et navn, og tage et
                    billede af varen.</Text>
                <TextInput
                    style={{height: 40, fontFamily: 'fira'}}
                    placeholder="Navn på vare"
                    value={this.state.name}
                    onChangeText={text => this.setState({ingredient: {...this.state.ingredient, name: text}})}
                />
                <View style={{alignItems: 'center'}}>
                    {this.state.imageTaken ? this.renderImage() : null}
                    <Text>{"\n"}</Text>
                </View>
                <Button
                    iconRight={{name: 'camera', type: 'entypo'}}
                    buttonStyle={{backgroundColor: "#2196F3"}}
                    fontFamily={'fira'}
                    title="Tag et billede"
                    onPress={this.takePicture}/>
                <Text>{"\n"}</Text>
                <Button buttonStyle={{backgroundColor: "#2196F3"}} onPress={() => {
                    if (this.state.ingredient.name === undefined) {
                        Alert.alert(
                            'Fejl i indtastning',
                            'Indtast venligst navn på den vare du ønsker at oprette'
                        );
                    } else {
                        this.addIngredient();
                    }
                }} title="Opret"
                        fontFamily={'fira'}
                />
                <Text style={{fontFamily: 'fira'}}>{"\nAlle uploads bliver gennemgået, og upassende indhold vil blive fjernet"}</Text>
            </View>
        );
    }
}

export default AddIngredient;