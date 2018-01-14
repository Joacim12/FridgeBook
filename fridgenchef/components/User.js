import React from 'react'
import {View} from "react-native";
import {Button, Text} from "react-native-elements";
import {SecureStore} from 'expo';
import {NavigationActions} from 'react-navigation'


class User extends React.Component {

    logOut = () => {
        SecureStore.deleteItemAsync('fbToken');
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({routeName: 'Login'})
            ]
        })
        this.props.navigation.dispatch(resetAction)
    }

    render() {
        return (
            <View>
                <Text>{"\n"}</Text>
                <Button title={"Log ud"} onPress={() => {
                    this.logOut()
                }}/>
            </View>
        );
    }
}


export default User;