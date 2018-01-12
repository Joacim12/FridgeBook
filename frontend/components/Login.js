import React from 'react'
import {ScrollView} from "react-native";
import {Button} from "react-native-elements";
import {SecureStore, Facebook} from 'expo';
import {NavigationActions} from 'react-navigation';

class Login extends React.Component {

    login = () => {
        logIn();
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({routeName: 'Home'})
            ]
        })
        this.props.navigation.dispatch(resetAction)
    }

    render() {
        return (
            <ScrollView style={{flex: 1, backgroundColor: "white"}}>
                <Button onPress={() => this.login()} title="Sign in with facebook"/>
            </ScrollView>
        );
    }
}

async function logIn() {
    const {type, token} = await Facebook.logInWithReadPermissionsAsync('571905333150508', {
        permissions: ['public_profile'],
    });
    if (type === 'success') {
        SecureStore.setItemAsync("fbToken", token);
    }
}

export default Login;