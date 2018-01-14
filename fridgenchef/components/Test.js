import React from 'react'
import {ScrollView, View} from "react-native";
import {Button, Text} from "react-native-elements";
import {Alert} from "react-native";
import {SecureStore} from 'expo';

class Test extends React.Component {


    state = {
        loading: true,
        token: {}
    }

    componentWillMount = async () => {
        let at1 = await SecureStore.getItemAsync("fbToken");
        this.setState({loading: false, token: at1})
        if (this.state.token !== null) {
            const response = await fetch(
                `https://graph.facebook.com/me?fields=id,name,picture&access_token=${this.state.token}`
            // ,console.log(await response.json())
        )

        }
        // Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
    }


    render() {
        if (this.state.token !== null) {
            return (
                <View>
                    <Text>Hey</Text>
                </View>
            )
        }
        return (
            <ScrollView style={{flex: 1, backgroundColor: "white"}}>
                <Button onPress={logIn} title="Sign in with facebook"/>
            </ScrollView>
        );
    }
}

async function logIn() {
    const {
        type,
        token,
    } = await Expo.Facebook.logInWithReadPermissionsAsync('571905333150508', {
        permissions: ['public_profile'],
    });

    if (type === 'success') {
        SecureStore.setItemAsync("fbToken", token);
        const response = await fetch(
            `https://graph.facebook.com/me?access_token=${token}`
        );
        Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
    }
}

export default Test;