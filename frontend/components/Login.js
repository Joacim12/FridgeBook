import React from 'react'
import {ScrollView} from "react-native";
import {Button} from "react-native-elements";
import {SecureStore, Facebook} from 'expo';
import {NavigationActions} from 'react-navigation';

class Login extends React.Component {

    login = async () => {
        this.logIn()
            .then(() => {
                const resetAction = NavigationActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({routeName: 'Home'})
                    ]
                })
                this.props.navigation.dispatch(resetAction)
            })
    };

    logIn = async () => {
        const {type, token} = await Facebook.logInWithReadPermissionsAsync('571905333150508', {
            permissions: ['public_profile'],
        });
        if (type === 'success') {
            await SecureStore.setItemAsync("fbToken", token);
            this.createUser(token)
        }
    }

    createUser = async (token) => {
        const response = await fetch(`https://graph.facebook.com/me?fields=id,name,picture&access_token=${token}`);
        response.json()
            .then((res) => {
                let dbUser = {};
                dbUser.username = res.id + "";
                dbUser.pin = 1234;
                const options = {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    method: "POST",
                    body: JSON.stringify(dbUser)
                }
                fetch('https:/vetterlain.dk/FridgeBook/api/user', options)
            })
    }

    render() {
        return (
            <ScrollView style={{flex: 1, backgroundColor: "white"}}>
                <Button onPress={() => this.login()} title="Sign in with facebook"/>
            </ScrollView>
        );
    }
}

export default Login;