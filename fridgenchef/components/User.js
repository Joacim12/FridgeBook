import React from 'react'
import {Image, View} from "react-native";
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
            <View style={{justifyContent: 'center'}}>
                {/*<Image source={{uri: this.props.screenProps.fbUser.picture.data.url}} style={{padding: 10, width: 80, height: 80}}/>*/}
                <Text style={{fontFamily: 'fira', textAlign: 'center', padding: 10}}>
                    Hej {this.props.screenProps.fbUser.name + '!\n'}
                    Har du noget ris/ros, eller noget andet? Send en mail til info@vetterlain.dk
                </Text>
                <Button title={"Log ud"} icon={{name: 'exit-to-app', type: 'MaterialIcons'}} fontFamily={'fira'} buttonStyle={{backgroundColor: "#2196F3"}}
                        onPress={() => {
                            this.logOut()
                        }}/>
            </View>
        );
    }
}


export default User;