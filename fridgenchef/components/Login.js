import React from 'react'
import {Dimensions, Image, Text, View} from "react-native";
import {Button} from "react-native-elements";
import {SecureStore, Facebook} from 'expo';
import {NavigationActions} from 'react-navigation';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

class Login extends React.Component {

    login = async () => {
        this.logIn()
            .then(() => {
                const resetAction = NavigationActions.reset({
                    index: 0,
                    actions: [NavigationActions.navigate({routeName: 'Home'})]
                })
                this.props.navigation.dispatch(resetAction)
            })
    };

    logIn = async () => {
        const {type, token} = await Facebook.logInWithReadPermissionsAsync('571905333150508', {
            permissions: ['public_profile'],
        });
        if (type === 'success') {
            await this.createUser(token)
            await SecureStore.setItemAsync("fbToken", token);
            await this.props.screenProps.fetchFromFacebook();
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
            <View style={{flex: 1, backgroundColor: "#2196F3", alignItems: "center", justifyContent: 'center'}}>
                <Text style={{color: 'white', fontSize: 34, fontFamily: 'fira-bold'}}>Fridge'N'Chef</Text>
                <Image source={require('../assets/splash.png')} style={{width: deviceWidth / 2, height: deviceHeight / 3}}/>
                {/*<Text style={{textAlign: 'center',color:'white'}}>{"\n\n"}Log venligst ind for at bruge denne app{"\n"}</Text>*/}
                <Button
                    onPress={this.login}
                    title="Login med Facebook"
                    icon={{name: 'facebook', type: 'entypo'}}
                    backgroundColor='#3b5998'
                />
            </View>
        );
    }
}

export default Login;